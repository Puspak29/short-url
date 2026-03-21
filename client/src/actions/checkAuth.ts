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
        if(response.ok) {
            return {
                isAuth: true,
                user: data.data.user
            }
        }
        return {
            isAuth: false,
            user: null
        }
    }
    catch(error) {
        return {
            isAuth: false,
            user: null
        }
    }
}