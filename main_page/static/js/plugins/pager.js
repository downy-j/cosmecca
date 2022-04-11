/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const pprev = '<span class="p_pre" onclick="clickPrev($curpage)"></span>';
const prev = '<span class="pre" onclick="clickPrev($curpage)"></span>';
const cur_page = '<a href="javascript:callPagerfunction($index)" class="current">$index</a>';
const _page = '<a href="javascript:callPagerfunction($index)">$index</a>';
const next = '<span class="next" onclick="clickNext($curpage)"></span>';
const nnext = '<span class="n_next" onclick="clickNext($curpage)"></span>';

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

let currentPage;
let total_page;
let cur_group;
let total_group;
let per_page = 10;      /* page 당 리스트 수 */
let per_group = 5;      /* 한 화면에 보여지는 페이지 수 */
let start_page;
let end_page;
let callPagerfunction = () => {}

function drawpagerForUT(curPage, tCount, maxline, el_pager, method, _data){

    callPagerfunction = method;
    let pagerArea = el_pager.empty(); 
    let page =  typeof _data.prevPageToken === 'undefined' ? '' : '<span class="pre" onclick="clickUT(\''+_data.prevPageToken+'\', '+(curPage - 1)+')"></span>';
    page += '<a href="#" class="current">'+curPage+'</a>'
    page += typeof _data.nextPageToken === 'undefined' ? '' : '<span class="next" onclick="clickUT(\''+_data.nextPageToken+'\', '+(curPage + 1)+')"></span>';

    pagerArea.append(page);
}

const clickUT = (token, pageNo) => {
    callPagerfunction(token, pageNo);
};

function darwpagerForPoReview(curPage, tCount, maxline, el_pager, method){
    let currentPage;
    let total_page;
    let cur_group;
    let total_group;
    let per_page = 10;      /* page 당 리스트 수 */
    let per_group = 5;      /* 한 화면에 보여지는 페이지 수 */
    let start_page;
    let end_page;

    per_page = maxline;
    currentPage = curPage;
    total_page = Math.ceil(tCount / per_page);
    cur_group = Math.ceil(curPage / per_group);
    total_group = Math.ceil(total_page / per_group);
    start_page = ((cur_group -1) * per_group) + 1
    end_page = (cur_group * per_group) > total_page ? total_page : (cur_group * per_group);
  
    let pagerArea = el_pager.empty(); 
    let page = '<span class="p_pre" onclick="fetchSearchProdReviewGood($curpage)"></span>'.replace('$curpage', 1);
    page += '<span class="pre" onclick="fetchSearchProdReviewGood($curpage)"></span>'.replace('$curpage', (start_page - per_group));
    for(let i = start_page; i <= end_page; i++){
        if(curPage == i){
            page += '<a href="javascript:fetchSearchProdReviewGood($index)" class="current">$index</a>'.replaceAll('$index', i);
        } else {
            page += '<a href="javascript:fetchSearchProdReviewGood($index)">$index</a>'.replaceAll('$index', i);
        }
    }
    page += '<span class="next" onclick="fetchSearchProdReviewGood($curpage)"></span>'.replace('$curpage', (end_page + 1));
    page += '<span class="n_next" onclick="fetchSearchProdReviewGood($curpage)"></span>'.replace('$curpage', total_page);
    pagerArea.append(page);
}

function drawpagerForNeReview(curPage, tCount, maxline, el_pager, method){
    let currentPage;
    let total_page;
    let cur_group;
    let total_group;
    let per_page = 10;      /* page 당 리스트 수 */
    let per_group = 5;      /* 한 화면에 보여지는 페이지 수 */
    let start_page;
    let end_page;

    per_page = maxline;
    currentPage = curPage;
    total_page = Math.ceil(tCount / per_page);
    cur_group = Math.ceil(curPage / per_group);
    total_group = Math.ceil(total_page / per_group);
    start_page = ((cur_group -1) * per_group) + 1
    end_page = (cur_group * per_group) > total_page ? total_page : (cur_group * per_group);
  
    let pagerArea = el_pager.empty(); 
    let page = '<span class="p_pre" onclick="fetchSearchProdReviewBad($curpage)"></span>'.replace('$curpage',1);
    page += '<span class="pre" onclick="fetchSearchProdReviewBad($curpage)"></span>'.replace('$curpage', (start_page - per_group));
    for(let i = start_page; i <= end_page; i++){
        if(curPage == i){
            page += '<a href="javascript:fetchSearchProdReviewBad($index)" class="current">$index</a>'.replaceAll('$index', i);
        } else {
            page += '<a href="javascript:fetchSearchProdReviewBad($index)">$index</a>'.replaceAll('$index', i);
        }
    }
    page += '<span class="next" onclick="fetchSearchProdReviewBad($curpage)"></span>'.replace('$curpage', (end_page + 1));
    page += '<span class="n_next" onclick="fetchSearchProdReviewBad($curpage)"></span>'.replace('$curpage', total_page);

    pagerArea.append(page);
}

function drawpagerForStopword(curPage, tCount, maxline, el_pager, method){
    let currentPage;
    let total_page;
    let cur_group;
    let total_group;
    let per_page = 10;      /* page 당 리스트 수 */
    let per_group = 5;      /* 한 화면에 보여지는 페이지 수 */
    let start_page;
    let end_page;

    per_page = maxline;
    currentPage = curPage;
    total_page = Math.ceil(tCount / per_page);
    cur_group = Math.ceil(curPage / per_group);
    total_group = Math.ceil(total_page / per_group);
    start_page = ((cur_group -1) * per_group) + 1
    end_page = (cur_group * per_group) > total_page ? total_page : (cur_group * per_group);
  
    let pagerArea = el_pager.empty(); 
    let page = '<span class="p_pre" onclick="fetchStopword($curpage)"></span>'.replace('$curpage',1);
    page += '<span class="pre" onclick="fetchStopword($curpage)"></span>'.replace('$curpage', (start_page - per_group));
    for(let i = start_page; i <= end_page; i++){
        if(curPage == i){
            page += '<a href="javascript:fetchStopword($index)" class="current">$index</a>'.replaceAll('$index', i);
        } else {
            page += '<a href="javascript:fetchStopword($index)">$index</a>'.replaceAll('$index', i);
        }
    }
    page += '<span class="next" onclick="fetchStopword($curpage)"></span>'.replace('$curpage', (end_page + 1));
    page += '<span class="n_next" onclick="fetchStopword($curpage)"></span>'.replace('$curpage', total_page);

    pagerArea.append(page);
}

function drawpagerForChangingMfgNm(curPage, tCount, maxline, el_pager, method){
    let currentPage;
    let total_page;
    let cur_group;
    let total_group;
    let per_page = 10;      /* page 당 리스트 수 */
    let per_group = 5;      /* 한 화면에 보여지는 페이지 수 */
    let start_page;
    let end_page;

    per_page = maxline;
    currentPage = curPage;
    total_page = Math.ceil(tCount / per_page);
    cur_group = Math.ceil(curPage / per_group);
    total_group = Math.ceil(total_page / per_group);
    start_page = ((cur_group -1) * per_group) + 1
    end_page = (cur_group * per_group) > total_page ? total_page : (cur_group * per_group);
  
    let pagerArea = el_pager.empty(); 
    let page = '<span class="p_pre" onclick="fetchMfgNmChangeHistory($curpage)"></span>'.replace('$curpage',1);
    page += '<span class="pre" onclick="fetchMfgNmChangeHistory($curpage)"></span>'.replace('$curpage', (start_page - per_group));
    for(let i = start_page; i <= end_page; i++){
        if(curPage == i){
            page += '<a href="javascript:fetchMfgNmChangeHistory($index)" class="current">$index</a>'.replaceAll('$index', i);
        } else {
            page += '<a href="javascript:fetchMfgNmChangeHistory($index)">$index</a>'.replaceAll('$index', i);
        }
    }
    page += '<span class="next" onclick="fetchMfgNmChangeHistory($curpage)"></span>'.replace('$curpage', (end_page + 1));
    page += '<span class="n_next" onclick="fetchMfgNmChangeHistory($curpage)"></span>'.replace('$curpage', total_page);

    pagerArea.append(page);
}

function drawPager(curPage, tCount, maxline, el_pager, method){

    per_page = maxline;
    currentPage = curPage;
    total_page = Math.ceil(tCount / per_page);
    cur_group = Math.ceil(curPage / per_group);
    total_group = Math.ceil(total_page / per_group);
    start_page = ((cur_group -1) * per_group) + 1
    end_page = (cur_group * per_group) > total_page ? total_page : (cur_group * per_group);

    callPagerfunction = method;
    let pagerArea = el_pager.empty(); 
    let page = pprev.replace('$curpage', '\'pp\'');
    page += prev.replace('$curpage', curPage);
    for(let i = start_page; i <= end_page; i++){
        if(curPage === i){
            page += cur_page.replaceAll('$index', i);
        } else {
            page += _page.replaceAll('$index', i);
        }
    }
    page += next.replace('$curpage', curPage);
    page += nnext.replace('$curpage', '\'nn\'');

    pagerArea.append(page);
}

const clickPrev = (selected_page) => {
    if(selected_page === 'pp'){
        if(cur_group > 1){
            callPagerfunction(1);
        }
    } else {
        if(currentPage !== 1){
            callPagerfunction(start_page - per_group);
        }
    }
}

const clickNext = (selected_page) => {
    if(selected_page === 'nn'){
        if(cur_group < total_group){
            callPagerfunction(total_page);
        }
    } else {
        if(currentPage !== total_page){
            callPagerfunction(end_page + 1);
        }
    }
}


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */