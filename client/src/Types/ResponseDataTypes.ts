export type planType = 'free' | 'pro' | 'enterprise';

export interface User {
    _id: string,
    email: string,
    name: string,
    plan: planType
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