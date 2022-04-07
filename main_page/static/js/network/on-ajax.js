//Post Type Ajax
$.postCsrf = function (to, message, succ_callback, err_callback) {
    $.ajax({
        type: 'post',
        url: to,
        data: JSON.stringify(message),
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
        },
        error: function (error, status) {
            err_callback(error, error.status)
        },
        success: function (success, status, xhr) {
            succ_callback(success, xhr.status)
        },
    });
}
//Get Type Ajax
$.getCsrf = function (to, message, succ_callback, err_callback) {
    $.ajax({
        type: 'get',
        url: to,
        data: message,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
        },
        error: function (error, status) {
            err_callback(error, error.status)
        },
        success: function (success, status, xhr) {
            succ_callback(success, xhr.status)
        },
    });
}

