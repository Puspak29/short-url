export const getLinks = async(pageNum: number) => {
    try{
        const token = localStorage.getItem('shorturltoken');
        const response = await fetch(`/api/url/get?page=${pageNum}`, {
            method: 'GET',
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