const Click = require("../../models/click");

exports.generateUrlStats = async (urlFilter, plan) => {
    const stats = {};
    // total clicks
    const totalClicks = await Click.countDocuments({ url: urlFilter });
    stats.totalClicks = totalClicks;

    // unique visitors
    const uniqueVisitors = await Click.distinct('ip', { url: urlFilter });
    stats.uniqueVisitors = uniqueVisitors.length;

    // country stats
    const countryStats = await Click.aggregate([
        { $match: { url: urlFilter }},
        { $group: { _id: '$country', clicks: { $sum: 1 }, visitors: { $addToSet: '$ip' }}},
        { $project: { country: '$_id', clicks: 1, uniqueVisitors: { $size: '$visitors' }}},
        { $sort: { uniqueVisitors: -1 }}
    ]);
    stats.globalReach = countryStats.length;

    // for pro and enterprise users
    if(plan === 'pro' || plan === 'enterprise'){
        // top country
        let topCountry = null;
        if(countryStats.length > 0){
            const top = countryStats[0];

            topCountry = {
                country: top.country,
                clicks: top.clicks,
                percentage: Number(((top.uniqueVisitors / stats.uniqueVisitors) * 100).toFixed(2))
            }
        }
        stats.topCountry = topCountry;

        // country distribution
        const countryDistribution  = countryStats.map(c => ({
            country: c.country,
            percentage: Number(((c.uniqueVisitors / stats.uniqueVisitors) * 100).toFixed(2)),
            clicks: c.clicks
        }));
        stats.countryDistribution = countryDistribution;

        // device stats
        const deviceStats = await Click.aggregate([
            { $match: { url: urlFilter }},
            { $group: { _id: '$device', count: { $sum: 1 }}},
        ]);
        stats.deviceStats = deviceStats;
    }

    // for enterprise users
    if(plan === 'enterprise'){
        // browser stats
        const browserStats = await Click.aggregate([
            { $match: { url: urlFilter }},
            { $group: { _id: '$browser', count: { $sum: 1 }}},
        ]);
        stats.browserStats = browserStats;

        // os stats
        const osStats =await Click.aggregate([
            { $match: { url: urlFilter }},
            { $group: { _id: '$os', count: { $sum: 1 }}}
        ]);
        stats.osStats = osStats;

        // referrer stats
        const referrerStats = await Click.aggregate([
            { $match: { url: urlFilter }},
            { $group: { _id: '$referrer', count: { $sum: 1 }}},
        ]);
        stats.referrerStats = referrerStats;

        // daily clicks for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dailyClicks = await Click.aggregate([
            { $match: { url: urlFilter, createdAt: { $gte: thirtyDaysAgo }}},
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }}, clicks: { $sum: 1 }}},
            { $sort: { _id: 1 }}
        ]);
        stats.dailyClicks = dailyClicks;
    }

    return stats;
}