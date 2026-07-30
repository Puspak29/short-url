export type planType = 'free' | 'pro' | 'enterprise';

export interface User {
    _id: string,
    email: string,
    name: string,
    plan: planType,
    monthlyUrlCount: number,
    subscriptionStatus?: string
}

export interface Link {
    _id: string | null;
    originalUrl: string,
    shortUrl: string,
    createdAt: string,
    clicks?: number,
    isActive?: boolean,
    isCustom?: boolean
}

export interface Stats {
    totalClicks: number;
    uniqueVisitors: number;
    globalReach: number;
    topCountry?: {
        country: string;
        clicks: number;
        percentage: number;
    } | null;
    countryDistribution?: {
        country: string;
        percentage: number;
        clicks: number;
        }[];
    deviceStats?: any[];
    browserStats?: any[];
    osStats?: any[];
    referrerStats?: any[];
    dailyClicks?: any[];
}