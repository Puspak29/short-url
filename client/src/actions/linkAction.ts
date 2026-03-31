export const getLinks = async(pageNum: number) => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch(`/api/url?page=${pageNum}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        // console.log('Get Links Response:', data);
        return data;
    }
    catch(error){
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}

export const createShortLink = async (inputUrl: string, isCustom: boolean, customShortCode?: string) => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch('/api/url/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inputUrl, isCustom, customShortCode })
        });
        const data = await response.json();
        return data;
    }
    catch(error){
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}

export const toggleLinkStatus = async (linkId: string) => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch(`/api/url/${linkId}/toggle`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }); 
        const data = await response.json();
        return data;
    }
    catch(error){
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}

export const deleteLink = async (linkId: string) => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch(`/api/url/${linkId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(error){
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}
