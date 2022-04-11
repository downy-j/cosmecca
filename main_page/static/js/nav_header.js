$(function () { 
    initNavHeadView();
})

function logout(){
    storage.clear();
    deleteCookie('login-id');
    goLocationLink('/');
}

function initNavHeadView(){
    let el_nav = $('li[name=nav-head]');
    let navIdx = getIndexOfNavHead();
    
    for(let i = 0; i < el_nav.length; i++){
        if(i === navIdx){
            el_nav.eq(i).addClass('on');
        } else {
            el_nav.eq(i).removeClass('on');
        }
    }
}

function getIndexOfNavHead() {
    let curPath = getPath();
    if(curPath.trim().length < 1) {
        return 0
    }

    return menuAll.findIndex((m) => {
        return m.find((m2) => {
            return curPath === m2;
        })
    })
}

function getPath(path_num = 1) {
    let pathArray = window.location.pathname.split('/');
    if (pathArray.length > 1) {
        if (path_num !== 1) {
            return pathArray[path_num];
        } else {
            return pathArray[1];
        }
    }
    return null;
}

const menuAll = [
    ['prod-search', 'prod-detail'],
    ['trend-analysis'],
    ['market']
]