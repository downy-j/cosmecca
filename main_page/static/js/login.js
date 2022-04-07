/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

$(function () {

    let btn_login = $('#btn_login');
    btn_login.on('click', function(){
        runLogin();
    })
});

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function pressEnterKey(){
    if(window.event.keyCode === 13) {
        runLogin();
    }
}

function checkValidInputData(params){
    let valid_result = true;
    if(isEmpty(params.password) || !validatePassword(params.password)){
        valid_result = false;
    } else if(isEmpty(params.id)){
        valid_result = false;
    }
    return valid_result;
}

function getLoginParams(){
    let id = $('#account_id').val();
    let password = $('#password').val();
    return {
        id: id,
        password: password
    }
}

function runLogin(){
    let params = getLoginParams();
    if(checkValidInputData(params)){
        startLoader();
        $.postCsrf(API.login,
            {
                id: params.id,
                password: cryptoEncrypt(params.password)
            },
            function (success, status) {
                stopLoader();
                if (status === 200) {
                    goLocationLink('/prod-search');
                }
            },
            function (error, status) {
                stopLoader();
                console.error(error);
                alert('입력하신 정보가 유효하지 않습니다.\n아이디, 비밀번호를 다시 입력해주세요.');
            })
    } else {
        alert('아이디, 비밀번호를 입력해주세요.');
    }
    
}


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */