export type planType = 'free' | 'pro' | 'enterprise';

export interface User {
    id: string,
    email: string,
    name: string,
    plan: planType
}

export interface Link {
    id: string,
    originalUrl: string,
    shortUrl: string,
    createdAt: string,
    clicks: number
}