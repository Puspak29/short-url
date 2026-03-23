export const checkAuth = async () => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch('/api/auth/check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Check Auth Response:', data);
        if(response.ok) {
            return {
                isAuth: true,
                user: data.data.user,
                dashboardData: data.data.dashboardData
            }
        }
        return {
            isAuth: false,
            user: null,
            dashboardData: {
                stats: {
                    activeLinks: 0,
                    customLinks: 0,
                    totalClicks: 0,
                    totalLinks: 0
                },
                lastFiveLinks: []
            }
        }
    }
    catch(error) {
        return {
            isAuth: false,
            user: null,
            dashboardData: {
                stats: {
                    activeLinks: 0,
                    customLinks: 0,
                    totalClicks: 0,
                    totalLinks: 0
                },
                lastFiveLinks: []
            }
        }
    }
}