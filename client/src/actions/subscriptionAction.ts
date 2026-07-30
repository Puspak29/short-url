export const createOrder = async (plan: 'pro' | 'enterprise') => {
    try {
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch('/api/subscription/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ plan })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export const verifyOrder = async (orderId: string, paymentId: string, signature: string) => {
    try {
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch('/api/subscription/verify-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ orderId, paymentId, signature })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export const cancelSubscription = async () => {
    try {
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch('/api/subscription/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};
