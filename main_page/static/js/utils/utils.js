/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

let progressQue = [];

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function startLoader() {
    if(progressQue.length === 0) $('.loading').addClass('active');
    progressQue.push(progressQue.length);
}

function stopLoader() {
    if(progressQue.length > 0) progressQue.splice(0, 1);
    if(progressQue.length === 0) $('.loading').removeClass('active');
}

function converNumberWithComma(num){
    if(isEmpty(num)){
        return 0;
    }
    if(!Number.isInteger(num)){
        num = num.toString().replace(/[^0-9]/g, '')
    }
    
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function goLocationLink(link) {
    if (link.indexOf('?') != -1) {
        window.location.href = link + '&rm=' + (Math.random().toString(36).substr(2, 11));
    } else {
        window.location.href = link + '?rm=' + (Math.random().toString(36).substr(2, 11));
    }
}

function issets(...data){
    if (typeof data !== undefined && data != null && data.length > 0) {
        let is_success = true;
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] === undefined || data[i] == null || data[i] === '') {
                is_success = false;
            }
        }
        return is_success;
    } else {
        return false;
    }
}

function validatePassword(_data){
    let pass_reg = /^(?=.*?[#?!@$%^&*-]).{8,}$/
    return pass_reg.test(_data);
}

function isEmpty(v) {
    return (null === v || typeof v === 'undefined' || (JSON.stringify(v) === '{}' || JSON.stringify(v) === '[]') || v === 0  || v.toString().trim().length === 0);
}

function deleteCookie (name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

function getLastDayOfMonth(month){
    let big = [1,3,5,7,8,10,12];
    let small = [4,6,9,11];
    return big.indexOf(Number(month)) >= 0 ? 31 : (small.indexOf(Number(month)) >= 0 ? 30 : 28);
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */