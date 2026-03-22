const URL = require('../../models/url');

exports.getDashboardStats = async (userId, plan) => {
     const statsResult = await URL.aggregate([
    {
      $match: {
        user: userId
      }
    },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: "$clicks" },
        activeLinks: {
          $sum: { $cond: ["$isActive", 1, 0] }
        },
        customLinks: {
          $sum: { $cond: ["$isCustom", 1, 0] }
        },
        totalLinks: { $sum: 1 }
      }
    }
  ]);

  const stats = statsResult[0] || {
    totalClicks: 0,
    activeLinks: 0,
    customLinks: 0,
    totalLinks: 0
  };

  let selectedFields = "shortUrl originalUrl isCustom createdAt";
  if (plan === "pro" || plan === "enterprise") {
    selectedFields += " clicks";
  }

  const lastFiveLinks = await URL.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .select(selectedFields);

    return {
        stats,
        lastFiveLinks
    }
}