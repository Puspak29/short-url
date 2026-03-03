exports.normalizeAndValidateUrl = (inputUrl) => {
    if(!inputUrl || typeof inputUrl !== 'string' || inputUrl.length === 0){
        return null;
    }
    let url = inputUrl.trim();
    if(!/^https?:\/\//i.test(url)){
        url = `https://${url}`;
    }

    return url;
}