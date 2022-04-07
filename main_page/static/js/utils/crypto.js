
/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function cryptoEncrypt(text) {
    let ENCRYPTION_KEY = 'cosmeca'.repeat(2);
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(text), ENCRYPTION_KEY).toString();
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    return encData
}

function cryptoDecrypt (encrypted) {
    let ENCRYPTION_KEY = 'cosmeca'.repeat(2);
    let decData = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes)
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */