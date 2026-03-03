const { customAlphabet } = require('nanoid');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const shortCodeRegex = new RegExp(`^[${alphabet}]+$`);

exports.generateShortCode = (length = 6) => {
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
}

exports.validateShortCode = (code) => {
    if(!code || typeof code !== 'string' || code.length === 0){
        return false;
    }
    return shortCodeRegex.test(code);
}