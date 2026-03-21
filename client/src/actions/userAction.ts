
interface UserInfo {
    email: string,
    password: string
}

export const userLogin = async (userInfo: UserInfo) => {
    try{
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        if(data.success && data.data.token) {
            localStorage.setItem('shorturltoken', data.data.token);
        }
        return data;
    }
    catch (error) {
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export const userSignup = async (userInfo: UserInfo & { fullName: string }) => {
    try{
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();
        if(data.success && data.data.token) {
            localStorage.setItem('shorturltoken', data.data.token);
        }
        return data;
    }
    catch (error) {
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}