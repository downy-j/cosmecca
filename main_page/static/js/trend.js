/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */



$(function () {

    $('form').on('submit', (e) => {
        e.preventDefault();
    })

    initView();

    $('input[name=keyword_blog]').on("keyup", function (key) {
        if (key.keyCode == 13) {
            fetchNaverBlog(1);
        }
    })

    $('input[name=keyword_youtube]').on("keyup", function (key) {
        if (key.keyCode == 13) {
            fetchYoutubeSearch(null , 1);
        }
    })

    $('input[name=keyword_instargram]').on("keyup", function (key) {
        if (key.keyCode == 13) {
            fetchInstagramSearch();
        }
    })

    $('input[name=relkeyword]').on("keyup", function (key) {
        if (key.keyCode == 13) {
            fetchNaverKeyword();
        }
    })
    $('.search_results').css('display', 'none');

});

function initView() {
    //탭
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

    let relatedBtn = $('.relatedBtn');
    let relatedModal = $('.related_s_w');

    relatedBtn.click(function () {
        relatedModal.addClass('active');
        $('tbody#relkeyword_tbody').empty();
        $('body').css("overflow", "hidden");
        
    });

    //연관 검색어 모달 - 테이블 스크롤이 생길 시 td width값 변경
    let changeTr03 = $('.list01 table.related_s_w_t tbody tr');
    let changeTd03 = $('.list01 table.related_s_w_t tbody td:nth-of-type(4)');

    if (changeTr03.length > 10) {
        changeTd03.css({ width: '164px' });
    } else {
        changeTd03.css({ width: '181px' });
    }


    fetchNaverTrendType(null, 1)
}

function changePeriodYear(_this){
    if(Number($(_this).val()) < 2021){
        alert('2021년부터 조회가 가능합니다.');
    }
}

function changeCategory_1() {
    let category_id = $('.filter_area select#category_1 option:selected').val();
    fetchNaverTrendType(category_id, 2);
}

let trendData = '';
let ResData = '';
let NewProdData = '';
let ChartData = '';
let top20_cur_idx = 0;
let top20_total_cnt = 0;
let m_top20_cur_idx = 0;
let m_top20_total_cnt = 0;
let new_top20_cur_idx = 0;
let new_top20_total_cnt = 0;

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function runRelKeyword(_this){
    let keyword = $(_this).text().replace(/[0-9]/g, '');
    $('tbody#relkeyword_tbody').empty();
    $('.relatedBtn').trigger('click');
    $('.search_input input[name=relkeyword]').val(keyword);
    $('.search_input input[type=submit]').trigger('click');
}

function fetchNaverTrendType(p, type) {
    startLoader();
    $.getCsrf(API.naver_type, { category_id: p },
        function (success, status) {
            if (status === 200) {
                drawCategorySelect(success, type);
            }
            stopLoader();
        },
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}


function getParamsNaverTrend(pageNo) {
    let cate_1_name= $('.filter_area select#category_1 option:selected').text();
    let cate_1_id = $('.filter_area select#category_1 option:selected').val();
    let cate_2_name = $('.filter_area select#category_2 option:selected').text();
    let cate_2_id= $('.filter_area select#category_2 option:selected').val();
    let age = $('.filter_area select#age option:selected').val();
    let gender = $('.filter_area select#gender option:selected').val();

    let period = $('.period li.active').text();
    let s_year = $('.from select#year option:selected').val();
    let s_month = $('.from select#month option:selected').val();
    let e_year = $('.to select#year option:selected').val();
    let e_month = $('.to select#month option:selected').val();

    let params = {
        cate_1_name: cate_1_name,
        cate_1_id: cate_1_id,
        cate_2_name: cate_2_name,
        cate_2_id: cate_2_id,
        gender_type: gender,
        age: age,
        period: getDateFilter(period),
        filter_type: getDateFilter(period, 'day')
    }

    if (s_year !== '년도' && s_month !== '월' && e_year !== '년도' && e_month !== '월') {
        params.start_date = s_year + '-' + s_month +'-01';
        params.end_date = e_year + '-' + e_month +'-'+getLastDayOfMonth(e_month);
        params.period = 'direct'
    }

    return params;
}

function fetchPopKeywordTrend(){
    let params = getParamsNaverTrend();
    params.type = 'P'
    startLoader();
    $.getCsrf(API.naver_trend, params,
        function (success, status) {
            if (status === 200) {
                ResData = success;
                drawMainCategoryPopularKeyword(ResData.middleCategoryTop20List.recordset.length);
                drawMiddleCategoryPopularKeyword(ResData.middleCategoryTop20List.recordset.length);
            }
            stopLoader();
        },
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

function fetchNaverTrend(pageNo) {
    let params = getParamsNaverTrend(pageNo);
    if(params.category_name !== 'All'){
        params.type = 'T'
        $.getCsrf(API.naver_trend, params,
            function (success, status) {
                if (status === 200) {
                    ChartData = success;
                    drawChartSubCategoryLine(success);
                }
            },
            function (error, status) {
                console.error(error);
                drawChartSubCategoryLine(null);
            }
        )
    }
}

function fetchNaverKeyword(){
    startLoader();
    let keyword = $('.search_input input[name=relkeyword]').val()
    $.getCsrf(API.naver_keyword, {keyword: keyword},
        function (success, status) {
            if (status === 200) {
                drawRelKeyword(success.keywordList);
            }
            stopLoader();
        },
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

function fetchNewProdTop(){ //신규등록제품 top20
    let params = getParamsNaverTrend();
    params.type = 'P'
    if(params.cate_1_id!=='All'){
        startLoader();
        $.getCsrf(API.naver_prod_top, params,
            function (success, status) {
                if (status === 200) {
                    let data = [];
                    for(let item in success){
                        if(success.hasOwnProperty(item)){
                            data.push({[item] : success[item]});
                        }
                    }
                    NewProdData = data;
                    let strDate = Object.keys(data[0])[0];
                    let edDate = Object.keys(data[data.length-1])[0];

                    $('#new_prod_date_range').empty();
                    $('#new_prod_date_range').text(strDate.slice(0, 4) +'-'+strDate.slice(4, 6)+'~'+edDate.slice(0, 4) +'-'+edDate.slice(4, 6));
                    drawSubCategoryNewProd(NewProdData.length);
                }
                stopLoader();
            },
            function (error, status) {
                stopLoader();
                console.error(error);
            }
        )
    }else{
        $('.view_date.new_top_20').find('p').empty();
        $('.new_top20').find('tbody').empty();
    }
    
}

function getNaverData(){
    $('.search_results').css('display', 'block');
    fetchPopKeywordTrend();
    fetchNaverTrend();
    fetchNewProdTop();
  
}

function exportData(_type){ //엑셀다운로드

    let params = getParamsNaverTrend();
    let period = params.period;
    let prev = [];
    let header = [];
    let values = [];
       
    if(_type === 'Main'){ //대분류
        prev = ['제품분석 > 화장품/미용월간검색어', '조회기간:'+period]
        header = ResData.categoryTop20List.recordset.map((item)=>{
            return item.PERIOD.slice(0, 4) +'년 '+item.PERIOD.slice(4, 6) + '월';           
        });
        header.unshift('no');        
        values = makeResDataForExportingCSV(ResData.categoryTop20List.recordset);
        exportDataToCSVFile(header, values, prev, '화장품/미용_월간검색어');
    } else if(_type === 'Middle' && params.cate_1_id!=='ALL'){ //중분류
        prev = ['제품분석 > '+params.cate_1_name+'_월간검색어', params.cate_1_name,'조회기간:'+period]
        header = ResData.middleCategoryTop20List.recordset.map((item)=>{
            return item.PERIOD.slice(0, 4) +'년 '+item.PERIOD.slice(4, 6) + '월';           
        });
        header.unshift('no');        
        values = makeResDataForExportingCSV(ResData.middleCategoryTop20List.recordset);
        exportDataToCSVFile(header, values, prev, params.cate_1_name+'_월간검색어');

    } else if(_type === 'New'){ //신규등록제품
        let fileName = '';
        if(params.cate_1_id !== 'All' ){
            if(params.cate_1_id!=='All' && params.cate_2_id!=='All'){ //중-소분류 선택
                prev = ['제품분석 > '+params.cate_1_name+' > '+params.cate_2_name+'_월간검색어', params.cate_1_name+' : '+params.cate_2_name,'조회기간: '+period]
                fileName = params.cate_1_name+'_'+params.cate_2_name+'_월간검색어'
            }else if(params.cate_1_id!=='All'&&params.cate_2_id==='All'){ //중분류만 선택
                prev = ['제품분석 > '+params.cate_1_name+'_월간검색어', params.cate_1_name,'조회기간: '+period]
                fileName = params.cate_1_name+'_월간검색어'
            }
            header = NewProdData.map((item)=>{               
                return  Object.keys(item)[0].slice(0, 4) +'년 '+ Object.keys(item)[0].slice(4, 6) + '월';           
            });            
            header.unshift('no');        
            values = makeNewProdDataForExportingCSV(NewProdData);
            exportDataToCSVFile(header, values, prev, fileName);
        }     
    } else if(_type === 'Click') { //클릭통계 
  
        let fileName = '';
        if(params.cate_1_id !== 'All' ){
            if(params.cate_1_id!=='All' && params.cate_2_id!=='All'){ //중-소분류 선택
                prev = ['트렌드분석 > 클릭량추이', params.cate_1_name+' : '+params.cate_2_name,'조회기간: '+params.period, '성별: '+params.gender_type, '연령별: '+params.age]
                fileName = params.cate_1_name+'_'+params.cate_2_name+'_월간클릭량'
                header = ['날짜/월간', `스킨케어(${params.cate_1_name}/${params.cate_2_name})클릭량`] 
            }else if(params.cate_1_id!=='All'&&params.cate_2_id==='All'){ //중분류만 선택
                prev = ['트렌드분석 > 클릭량추이', params.cate_1_name,'조회기간: '+params.period, '성별: '+params.gender_type, '연령별: '+params.age]
                fileName = params.cate_1_name+'_월간클릭량'
                header = ['날짜/월간', `스킨케어(${params.cate_1_name})클릭량`]   
            }   
            values = makeChartDataForExportingCSV();
            exportDataToCSVFile(header, values, prev, fileName);
        }     

    }  
  
}


function makeResDataForExportingCSV(data){

    let retValue = [];
    for(let i=1; i<21;i++){ //세로 20줄
        let temp = [];
        temp.push(i);
        for(let j=0; j<data.length; j++){ //가로 가변길이 j는 월
            let item = data[j][i]
            temp.push(item);
        }
        retValue.push(temp); //20번 push
    }

    return retValue;
}


function makeNewProdDataForExportingCSV(data){

    let retValue = [];
    for(let i=1; i<21;i++){ //세로 20줄
        let temp = [];
        temp.push(i); //no
        for(let j=0; j<data.length; j++){ //가로 가변길이 j는 월
           
            let item = data[j][Object.keys(data[j])[0]][i-1];
            temp.push(item && item.prod_nm? item.prod_nm.replace(/,/g,' '):null);
        }
        retValue.push(temp); //20번 push
    }

    return retValue;

}
function makeChartDataForExportingCSV(){

    let retValue = []

    if(ChartData.results.length<2){ //중분류만 선택
        
        for(let i in ChartData.results[0].data){
            retValue.push([ChartData.results[0].data[i].period, ChartData.results[0].data[i].ratio]); 
        }

    }else{  //소분류 선택

        for(let i in ChartData.results[1].data){
            retValue.push([ChartData.results[1].data[i].period, ChartData.results[1].data[i].ratio]); 
        }

    }

    return retValue;
}



//네이버 블로그
async function fetchNaverBlog(pageNo = 1, limit = 10) {
    let keyword = $('input[name=keyword_blog]');
    limit = $('select[name=limit_blog]').val()
    if (keyword.val()) {
        startLoader();
        let params = {
            keyword: keyword.val(),
            current_page: pageNo,
            limit_count: limit
        }
        $.getCsrf(API.naver_blog, params,
            function (success, status) {
                if (status == 200) {
                    let tbody_naver_blog = $('tbody[id=naver_blog_list]');
                    tbody_naver_blog.empty();
                    let start = success.start;
                    for (let i = 0; i < success.items.length; i++) {
                        let data = success.items[i];
                        let tr = '<tr>'
                            + '<td title="04">' + Number(((start-1)*10)+i+1) + '</td>'
                            + '<td class="left" title="제목">' + data.title + '</td>'
                            + '<td class="left" title="내용">' + data.description + '</td>'
                            + '<td title="작성자">' + data.bloggername + '</td>'
                            + '<td title="2021. 12. 25. 21:10">' + data.postdate + '</td>'
                            + '<td><button onclick="window.open(\'' + data.link + '\')">바로가기</button></td>'
                            + '</tr>';
                        tbody_naver_blog.append(tr);
                    }

                    drawPager(pageNo, success.total, 5, $('div[id=naver_blog_pager]'), this.fetchNaverBlog);
                } else {
                    alert('잠시후 다시 시도해주세요')
                }
                stopLoader();
            },
            function (error, status) {
                stopLoader();
                console.error(error);
            });
    } else {
        alert('검색어를 입력해주세요')
        keyword.focus();
    }

}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function drawCategorySelect(_data, type) {
    let el_cate = (type === 1 ? $('select[id=category_1]').empty() : $('select[id=category_2]').empty());
    el_cate.append((type === 1 ? '<option value="All">화장품 카테고리 중분류</option>' : '<option value="All">소분류</option>'));
    _data.forEach((v) => {
        el_cate.append('<option value="' + v.category_id + '">' + (type === 1 ? (v.PART_GROUP_NAME === '남성' ? '남성 화장품': v.PART_GROUP_NAME) : v.PART_SUB_NAME) + '</option>')
    })
}

function drawMainCategoryPopularKeyword(idx) {
    if(typeof idx !== 'undefined') top20_cur_idx = idx -1;
    top20_total_cnt = ResData.categoryTop20List.recordset.length;
    let data = ResData.categoryTop20List.recordset;
    let el = $('.search_word.top_20 ul').empty();
    for(k in data[top20_cur_idx]){
        if(k !== 'CATEGORY_ID' && k !== 'PERIOD'){
            let element = (Number(k) < 11) ? el[0] : el[1]
            $(element).append('<li><p title="" onclick="runRelKeyword(this)"><span>'+k+'</span>'+data[top20_cur_idx][k]+'</p></li>')
        } else if(k === 'PERIOD'){
            let date = data[top20_cur_idx][k].slice(0, 4) +'년 '+data[top20_cur_idx][k].slice(4, 6) + '월';
            $('.view_date.top_20').find('p').text(date);
        }
    }
}

function drawMiddleCategoryPopularKeyword(idx) {
    if(typeof idx !== 'undefined') m_top20_cur_idx = idx -1;
    m_top20_total_cnt = ResData.middleCategoryTop20List.recordset.length;
    let data = ResData.middleCategoryTop20List.recordset;
    let el = $('.search_word.m_top_20 ul').empty();
    for(k in data[m_top20_cur_idx]){
        if(k !== 'CATEGORY_ID' && k !== 'PERIOD'){
            let element = (Number(k) < 11) ? el[0] : el[1]
            $(element).append('<li><p title="" onclick="runRelKeyword(this)"><span>'+k+'</span>'+data[m_top20_cur_idx][k]+'</p></li>')
        } else if(k === 'PERIOD'){
            let date = data[m_top20_cur_idx][k].slice(0, 4) +'년 '+data[m_top20_cur_idx][k].slice(4, 6) + '월';
            $('.view_date.m_top_20').find('p').text(date);
        }
    }
    let el_m_category = $('.filter_area select#category_1 option:selected');
    let el_s_category = $('.filter_area select#category_2 option:selected');
    $($('strong#m_category_selected')[0]).text('중분류('+el_m_category.text()+')')
    $($('strong#m_category_selected')[1]).text(el_m_category.text()+(el_s_category.val() === 'All' ? '':' / '+el_s_category.text()))
    $($('strong#m_category_selected')[2]).text(el_m_category.text()+(el_s_category.val() === 'All' ? '':' / '+el_s_category.text()))
}

function drawSubCategoryNewProd(idx) { //신규제품 top20
    if(typeof idx !== 'undefined') new_top20_cur_idx = idx -1
    
    new_top20_total_cnt = NewProdData.length;
    let dateNumber = Object.keys(NewProdData[new_top20_cur_idx])[0] //yymmdd
    let date = dateNumber.slice(0, 4) +'년 '+dateNumber.slice(4, 6) + '월';
    $('.view_date.new_top_20').find('p').text(date);

    let list = NewProdData[new_top20_cur_idx][dateNumber];

    if ($(list.length < 1)) {
        $('.new_top20').find('tbody').empty();
        for (let i = 0; i < 20; i++){
            let element = $('.new_top20').find('tbody')
            $(element).append(`<tr><td>${pad(i+1)}</td><td class="left" onclick="runRelKeyword(this)">${list[i]&&list[i].prod_nm ? list[i].prod_nm : "-"}</td><td>${list[i]&&list[i].brand_nm ? list[i].brand_nm : "-"}</td><td>${list[i]&&list[i].prod_rank ? list[i].prod_rank : "-"}</td><td>${list[i]&&list[i].review_cnt ? list[i].review_cnt : "-"}</td><td>${list[i]&&list[i].reg_cnt ? list[i].reg_cnt : "-"}</td></tr>`) 
        }
    }
}

function drawChartSubCategoryLine(_data) {
    let el_m_category = $('.filter_area select#category_1 option:selected');
    let el_s_category = $('.filter_area select#category_2 option:selected');
    let title = el_m_category.text()+(el_s_category.val() === 'All' ? '':' / '+el_s_category.text());

    $('.chart_area07').empty();
    $($('.chart_area07')).append('<canvas id="clicks-line"></canvas>');

    if(_data !== null){
        trendData = _data;

        let data = _data.results[0].data;
        let labels = [], obj = [];
        if(data.length > 0){
            data.forEach((d) => {
                labels.push(d.period);
                obj.push(d.ratio);
            })
        }

        drawLineChart(labels, ('#clicks-line'), {data: obj, title: title})
        drawDateStartEnd();
    }else{
        
        drawLineChart([], ('#clicks-line'), {data: [], title: title})
    }
}

function drawRelKeyword(_data){

    let el_rel_tbody = $('tbody#relkeyword_tbody').empty();
    if( _data.length > 0){
        for(let i =0; i<_data.length; i++){
            let el_rel = '<tr style="display: inline-flex">'
            el_rel += '<td title="no">'+(i+1)+'</td>'
            el_rel += '<td class="left" title="relkeyword">'+_data[i].relKeyword+'</td>'
            el_rel += '<td title="pc">'+converNumberWithComma(_data[i].monthlyPcQcCnt)+'</td>'
            el_rel += '<td title="mobile">'+converNumberWithComma(_data[i].monthlyMobileQcCnt)+'</td>'
            el_rel += '</tr>'
    
            el_rel_tbody.append(el_rel);
        }
    }
    
}

function drawDateStartEnd(){
    Array.from($('.date_range.info')).forEach(e => {
        $(e).text(trendData.startDate +' ~ '+ trendData.endDate);
    })
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function clickTop20Prev(){
    top20_cur_idx = top20_cur_idx === 0 ?  (top20_total_cnt-1):top20_cur_idx-1;
    drawMainCategoryPopularKeyword();
}

function clickTop20Next(){
    top20_cur_idx = top20_cur_idx === (top20_total_cnt-1) ?  0 : top20_cur_idx+1;
    drawMainCategoryPopularKeyword();
}

function clickMidTop20Prev(){
    m_top20_cur_idx = m_top20_cur_idx === 0 ?  (m_top20_total_cnt-1):m_top20_cur_idx-1;
    drawMiddleCategoryPopularKeyword();
}

function clickMidTop20Next(){
    m_top20_cur_idx = m_top20_cur_idx === (m_top20_total_cnt-1) ?  0 : m_top20_cur_idx+1;
    drawMiddleCategoryPopularKeyword();
}

function clickNewTop20Prev(){
    new_top20_cur_idx = new_top20_cur_idx === 0 ?  (new_top20_total_cnt-1):new_top20_cur_idx-1;
    drawSubCategoryNewProd();
    
}

function clickNewTop20Next(){
    new_top20_cur_idx = new_top20_cur_idx === (new_top20_total_cnt-1) ?  0 : new_top20_cur_idx+1;
    drawSubCategoryNewProd();
}

function getDateFilter(filterType, type) {

    if (filterType == '1개월') {
        return (type==='day')? 30: '1month'
    } else if (filterType == '3개월') {
        return (type==='day')? 90: '3month'
    } else if (filterType == '1년') {
        return (type==='day')? 365: '1year'
    }

    return (type==='day')? 365: "All";
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function fetchInstagramSearch() {
    let keyword = $('input[name=keyword_instargram]');

    if (keyword.val()) {
        startLoader();
        let params = {
            keyword: keyword.val()
        }
        $.getCsrf(API.instagram_hashtag, params,
            function (success, status) {
                if (status == 200) {
                    let instagram_list = $('div[id=instagram_list]');
                    $('div[id=instagram_list]').children().remove();
                    let instagram_data = success;
                    if (instagram_data != null && Array.isArray(instagram_data)) {
                        for (let i = 0; i < instagram_data.length; i++) {
                            let image_name = instagram_data[i].image_name;
                            let shortcode = instagram_data[i].shortcode;
                           let div_hashtag = '<div class="box">' +
                                '<a href="'+ 'https://www.instagram.com/p/' + shortcode +'" target="_blank">' +
                                '<div class="img_wrap">' +
                                '<img src="'+ image_name + '" alt="유튜브 썸네일" onerror="this.src=\'img/no-img.svg\'"/>' +
                                '</div>' +
                                '</a>' +
                                '</div>';

                            instagram_list.append(div_hashtag);
                        }
                    }
                    
                } else {
                    alert('잠시후 다시 시도해주세요')
                }
                stopLoader();
            },
            function (error, status) {
                stopLoader();
                console.error(error);
                alert(JSON.parse(error.responseText).message + '\n\n 잠시후 다시 시도해주세요')
            });
    } else {
        alert('검색어를 입력해주세요')
        keyword.focus();
    }

}

function fetchYoutubeSearch(pageToken = null, pageNo = 1) {
    let keyword = $('input[name=keyword_youtube]');

    if (!keyword.val()) {
        alert('검색어를 입력해주세요');
        keyword.focus();
        return;
    }

    let params = {
        keyword: keyword.val(),
        page_token: pageToken
    }
    stopLoader();
    $.getCsrf(API.youtube_search_list, params,
        function (success, status) {

            $('.youtube_wrap').children().remove();

            $.each(success.items, function (i, item) {

                var thumbnail = item.snippet.thumbnails.medium.url; // 썸네일 이미지
                var channelTitle = item.snippet.channelTitle;//채널 타이틀
                var publishTime = item.snippet.publishTime;//채널 등록시간

                publishTime = moment(publishTime).format('YYYY.MM.DD')

                var title = item.snippet.title;//비디오 타이틀
                var videoId = item.id.videoId;
                var html = '<div class="box">';
                html += '<a href="' + "https://www.youtube.com/watch?v=" + videoId + '" target="_blank">';
                html += '<div class="img_wrap">';
                html += '<img src="' + thumbnail + '" alt="유튜브 썸네일" onerror="this.src=\'img/no-img.svg\'">';
                html += '</div>';
                html += '<div class="info">';
                html += '<h3 class="title ellipsis" title="' + title + '">' + title + '</h3>';
                html += '<div class="f_b_c">';
                html += '<p class="youtuber" title="' + channelTitle + '">' + channelTitle + '</p>';
                html += '<p class="update">' + publishTime + '</p>';
                html += '</div>';
                html += '</div>';
                html += '</a>';
                html += '</div>';

                $('.youtube_wrap').append(html);
            });

            drawpagerForUT(pageNo, success.pageInfo.totalResults, success.pageInfo.resultsPerPage, $('.pager.youtube'), this.fetchYoutubeSearch, success);
            stopLoader();
        },
        function (error, status) {
            stopLoader();
            console.error(error);
        });
}

