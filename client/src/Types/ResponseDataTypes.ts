export type planType = 'free' | 'pro' | 'enterprise';

export interface User {
    id: string,
    email: string,
    name: string,
    plan: planType
}

