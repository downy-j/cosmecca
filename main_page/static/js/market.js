/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

$(function () { 
    initView();
});

let isMCateAll = false;

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function initSearchlist(type){
    $('.k_input').empty();
    AddKeyword(type);
}

function initView(){

    fetchMfgListTop20();

    //토글 클릭시 숨김 보임
    let $slidetoggle =$('.slidetoggle');
    let categoryCheck = $('.category_item');
    
    $slidetoggle.click(function(){
        $(this).next(categoryCheck).slideToggle();
        $(this).css({borderRadius: "4px"})
        
        if ($(this).find('img').attr('src') == 'img/arrow-down.svg') {
            $(this).find('img').attr('src', 'img/arrow-up.svg')
            $(this).css({ borderRadius: "4px 4px 0 0" })
        }else{
            $(this).find('img').attr('src', 'img/arrow-down.svg')
        }
    });

    initSearchlist();
    initCategory();
    $('.search_results').css('display', 'none');
}

function initCategory(){

    $('.category_item .all_check.mc input[type=checkbox]').click(function () {

        let small_category = $(this).parent().next().children().find('p').attr('m-category');

        if($('.all_check.mc input[type=checkbox]:checked').length > 0){
            $('.small_categories .category_item').css('display', 'block');
            $('.small_categories .pattern01').css('display', 'none');
        }else{
            $('.slidetoggle.sub').trigger('click');
            $('.small_categories .'+small_category).css('display', 'none');
            $('.small_categories .pattern01').css('display', 'block');
        }

        if($(this).is(':checked')){
            $('.small_categories .'+small_category).css('display', 'block')
            $('.small_categories .'+small_category + ' input[type=checkbox]').prop('checked', $('.small_categories .all_check input#s_all_check').is(':checked'));
        } else {
            $('.small_categories .'+small_category).css('display', 'none')
            $('.small_categories .'+small_category + ' input[type=checkbox]').prop('checked', false);
        }

        if(!isMCateAll){
            let m_all_cnt = $('.all_check.mc input[type=checkbox]').length;
            let m_cheked_cnt = $('.all_check.mc input[type=checkbox]:checked').length;
            if(m_all_cnt === m_cheked_cnt){
                $('.all_check input#m_all_check').prop('checked', true);
            } else {
                $('.all_check input#m_all_check').prop('checked', false);
            }
        }
    });

    // 하위 전체 선택
    $('.che_wrap.lower input[type=checkbox]').click(function (){
        Array.from($($(this).parent().next().children())).forEach((e) => {
            $($(e).find('input[type=checkbox]')).prop('checked', $('.che_wrap.lower input[type=checkbox]').is(':checked'));
        })
    })

    // 소분류 선택
    $('.medium_categories input[type=checkbox]').click(function () {
        let small_category = $(this).closest('.category_item').siblings('.slidetoggle').find('p.tt').attr('m-category');
        let checked_cnt = $(this).closest('.category_item').find('input[type=checkbox]:checked').length
        let checked_all_cnt = $(this).closest('.medium_categories').find('input[type=checkbox]:checked').length
        if(checked_all_cnt > 0){
            $('.small_categories .category_item').css('display', 'block');
            $('.small_categories .pattern01').css('display', 'none');
        }else{
            $('.slidetoggle.sub').trigger('click');
            $('.small_categories .'+small_category).css('display', 'none');
            $('.small_categories .pattern01').css('display', 'block');
        }
        if($(this).is(':checked') || checked_cnt > 0){
            $('.small_categories .'+small_category).css('display', 'block')
            $('.small_categories .'+small_category + ' input[type=checkbox]').prop('checked', $('.small_categories .all_check input#s_all_check').is(':checked'));
        } else {
            if(checked_all_cnt === 0) $('.small_categories .pattern01').css('display', 'block');$('.small_categories .'+small_category).css('display', 'none')
            $('.small_categories .'+small_category + ' input[type=checkbox]').prop('checked', false);
        }
    })

    // 세부분류 항목 선택
    $('.small_categories .category_item input[type=checkbox]').click(function () {
        let sub_all_cnt = $('.small_categories .category_item input[type=checkbox]').length;
        let sub_checked_cnt = $('.small_categories .category_item input[type=checkbox]:checked').length;
        if(sub_all_cnt === sub_checked_cnt){
            $('.small_categories .all_check input#s_all_check').prop('checked', true);
        }else{
            $('.small_categories .all_check input#s_all_check').prop('checked', false);
        }
    })
}


function clickMCategoryAllcheck(_this){
    isMCateAll = true;
    // 화장품/미용 전체
    Array.from($('.all_check.mc input[type=checkbox]')).forEach((e) => {
        if($(_this).is(":checked")){
            if(!$(e).is(":checked")){
                $(e).prop(':checked', $(_this).is(":checked"));
                $(e).trigger('click');  
            }
        }else{
            $(e).prop(':checked', $(_this).is(":checked"));
            $(e).trigger('click');  
        }
    })
    isMCateAll = false;
}

function clickSubAllcheck(_this){
    if($(_this).is(':checked')){
        initSearchlist('F')
        $('.small_categories input[type=checkbox]').prop('checked', true)
    }else{
        initSearchlist('')
        $('.small_categories input[type=checkbox]').prop('checked', false)
    }
}


function changeSearchCondition(_this){
    if($(_this).val() == 'F'){
        $('.small_categories .all_check input#s_all_check').attr('disabled', true);
    }else{
        $('.small_categories .all_check input#s_all_check').attr('disabled', false);
    }
}

let productStatus='';

function checkPeriodAll(_this){
    if($(_this).is(':checked')){
        $('select.year.start').val('All').change();
        $('select.month.start').val('All').change();
        $('select.year.end').val('All').change();
        $('select.month.end').val('All').change();
    }
}

function checkYear(_this){
    if(_this==='year'){
        $('select.month.start').attr('disabled', true);
        $('select.month.end').attr('disabled', true);
    }else{
        $('select.month.start').attr('disabled', false);
        $('select.month.end').attr('disabled', false);
    }
}


function changeGraphSelect(_type){
    if(_type === 1) drawProductStatusTable();
    if(_type === 2) drawTopMFGTable();
    if(_type === 3) drawTopVendorTable();
    if(_type === 4) drawRegProductStatusTable();
    if(_type === 5) drawRegProductSubCategoryTable();
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */



function fetchMarketInfo(){
    
    startLoader();
    let params = getMarketParams();
    $.postCsrf(API.market, params,
        function (success, status) {
            $('.search_results').css('display', 'block');
            if(status === 200){
                //상품등록현황
                productStatus = success[0];
                drawProductStatusTable(success[0])
                //상위Top5제조사
                drawTopMFGTable(success[1]);
                //상위Top5고객사
                drawTopVendorTable(success[3]);
                //중분류 상품등록현황
                drawRegProductStatusTable(success[5]);

                if(params.sub_category.length > 0 && success[6].labels.length > 0){
                    $('#sub_cagetory_chart').css('display', 'block');
                    //세부분류 상품등록현황
                    drawRegProductSubCategoryTable(success[6]);
                }else{
                    $('#sub_cagetory_chart').css('display', 'none');
                }
            }
            stopLoader();
        }, 
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

function fetchMfgListTop20(){
    startLoader();
    $.getCsrf(API.get_mfg_top20, {type: 'T20'},
        function (success, status) {
            if(status === 200){
                drawSelectOption(success);
            }
            stopLoader();
        }, 
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}


function getSelectedMfgList(){
    return (Array.from($('select#m_select')[0].options).filter(option =>{
        if(option.selected === true){
            return option.value
        } 
    })).map(option => {
        return option.value
    })
}

function getSelectedVendorList(){
    return (Array.from($('select#c_select')[0].options).filter(option =>{
        if(option.selected === true){
            return option.value
        } 
    })).map(option => {
        return option.value
    })
}

function getMarketParams(){
    let period = $('select#period option:selected').val();
    let period_all_check = $('.che_wrap.period_all input[type=checkbox]').is(':checked');
    let s_year = $('select.year.start option:selected').val();
    let s_month = $('select.month.start option:selected').val();
    let e_year = $('select.year.end option:selected').val();
    let e_month = $('select.month.end option:selected').val();

    // 제조사
    let mfg_selected = getSelectedMfgList();

    // 고객사
    let vendor_selected = getSelectedVendorList();

    // 화장품/미용 전체
    let m_all_check = $('#m_all_check input[type=checkbox]').is(':checked');

    // 체크된 중분류
    let m_checked = [];
    Array.from($($('.category_item .all_check input[type=checkbox]:checked')).parent().next().find('p')).forEach((e) => {
        m_checked.push($(e).text());
    })


    let s_category = [];

    // 스킨케어
    let s_skin = $('.all_check input#tt_all_check01').is(':checked');
    let s_skin_all = $('.category_item input#skin_all').is(':checked');
    let s_skin_selected = [];
    Array.from($('.lower_category.skin input[type=checkbox]:checked')).forEach((e) => {
        s_skin_selected.push($(e).parent().find('p').text());
    })
    if(s_skin_selected.length > 0) s_category.push(s_skin_selected);

    // 클렌징
    let s_cleansing_selected = [];
    Array.from($('.lower_category.cleansing input[type=checkbox]:checked')).forEach((e) => {
        s_cleansing_selected.push($(e).parent().find('p').text());
    })
    if(s_cleansing_selected.length > 0) s_category.push(s_cleansing_selected);

    // 마스크/팩
    let s_maskpack_selected = [];
    Array.from($('.lower_category.maskpack input[type=checkbox]:checked')).forEach((e) => {
        s_maskpack_selected.push($(e).parent().find('p').text());
    })
    if(s_maskpack_selected.length > 0) s_category.push(s_maskpack_selected);

    // 선케어
    let s_suncare_selected = [];
    Array.from($('.lower_category.suncare input[type=checkbox]:checked')).forEach((e) => {
        s_suncare_selected.push($(e).parent().find('p').text());
    })
    if(s_suncare_selected.length > 0) s_category.push(s_suncare_selected);

    // 헤어케어
    let s_hair_selected = [];
    Array.from($('.lower_category.hair input[type=checkbox]:checked')).forEach((e) => {
        s_hair_selected.push($(e).parent().find('p').text());
    })
    if(s_hair_selected.length > 0) s_category.push(s_hair_selected);

    // 바디케어
    let s_body_selected = [];
    Array.from($('.lower_category.body input[type=checkbox]:checked')).forEach((e) => {
        s_body_selected.push($(e).parent().find('p').text());
    })
    if(s_body_selected.length > 0) s_category.push(s_body_selected);

    // 남성류
    let s_man_selected = [];
    Array.from($('.lower_category.man input[type=checkbox]:checked')).forEach((e) => {
        s_man_selected.push($(e).parent().find('p').text());
    })
    if(s_man_selected.length > 0) s_category.push(s_man_selected);

    // 메이크업(페이스)
    let s_face_selected = [];
    Array.from($('.lower_category.face input[type=checkbox]:checked')).forEach((e) => {
        s_face_selected.push($(e).parent().find('p').text());
    })
    if(s_face_selected.length > 0) s_category.push(s_face_selected);

    // 메이크업(아이)
    let s_eyes_selected = [];
    Array.from($('.lower_category.eyes input[type=checkbox]:checked')).forEach((e) => {
        s_eyes_selected.push($(e).parent().find('p').text());
    })
    if(s_eyes_selected.length > 0) s_category.push(s_eyes_selected);

    // 메이크업(립)
    let s_lips_selected = [];
    Array.from($('.lower_category.lips input[type=checkbox]:checked')).forEach((e) => {
        s_lips_selected.push($(e).parent().find('p').text());
    })
    if(s_lips_selected.length > 0) s_category.push(s_lips_selected);

    // 동물용의약품
    let s_animals_selected = [];
    Array.from($('.lower_category.animals input[type=checkbox]:checked')).forEach((e) => {
        s_animals_selected.push($(e).parent().find('p').text());
    })
    if(s_animals_selected.length > 0) s_category.push(s_animals_selected);

    //하위분류전체
    let s_all_check = $('.che_wrap.lower input[type=checkbox]:checked').length > 0;    

    //세부분류
    let sub_all_check = $('.small_categories .all_check input#s_all_check').is(':checked');
    let sub_category = [];
    let el_sub_category = $('.small_categories input[type=checkbox]:checked');
    for(let i = 0; i < el_sub_category.length; i++){
        let sub_value = $('.small_categories input[type=checkbox]:checked')[i].value
        if(sub_value.trim().length > 0 && sub_value !== 'on'){
            if(sub_value.indexOf('/') > 0) {
                sub_value.split('/').forEach((v) => {
                    sub_category.push(v)
                })
            } else {
                sub_category.push(sub_value);
            }
        }
    }

    //검색어
    let search = [];
    let search_required = $('.input_wrap input[type=checkbox]');
    let seach_type = $('select#seach_condition option:selected');
    let search_word = $('.input_wrap input[name=keyword]');
    for(let i=0; i<search_required.length; i++){
        if($(search_word[i]).val().trim().length > 0){
            search.push({
                required: $(search_required[i]).is(':checked'),
                type: $(seach_type[i]).val(),
                keyword: $(search_word[i]).val()
            })
        }
    }


    let params = {
        dateType: period,
        period_all_check: period_all_check,
        dateStart: s_year === 'All' ? s_year : s_year + '-' + s_month +'-01',
        dateEnd: e_year === 'All' ? e_year : e_year + '-' + e_month + '-' + getLastDayOfMonth(e_month),
        mfg_nm_list: mfg_selected.length > 0 ? mfg_selected : 'All',
        brand_nm_list: vendor_selected.length > 0 ? vendor_selected : 'All',
        m_category: m_checked,          //체크된 중분류
        s_category: s_category,         //체크된 하위분류
        m_all_check: m_all_check,       //화장품/미용 전체
        s_all_check: s_all_check,       //하위분류전체
        sub_all_check: sub_all_check,   //세부분류 전체
        sub_category: sub_category,     //체크된 세부 항목
        search_list: search             // 검색어
    }

    return params;
}

function exportData(_type){ //엑셀다운로드

    let params = getMarketParams();
    let prev = [];
    let header = [];
    let fileName = "";
    let data;
       
    if(_type === 'MainProductStatus'){ //화장품 전체시장 상품 등록 현황               
        data = JSON.parse(storage.get('data_1_download'));
        prev = ['시장분석 > 화장품 전체 시장', '조회기간:'+params.dateStart==='All'?'All':params.dateStart+"~"+params.dateEnd, '제조사: '+params.brand_nm_list, '분류: 화장품/미용 전체']
        fileName = '화장품/미용_등록현황';     
    } else if(_type === 'top5mfg'){
        data = JSON.parse(storage.get('data_2_download'));
        prev = ['시장분석 > 화장품/미용 > 상위제조사별 제품등록수', '조회기간:'+params.dateStart==='All'?'All':params.dateStart+"~"+params.dateEnd, '제조사: '+params.brand_nm_list, '분류: 화장품/미용']
        fileName = '화장품/미용_상위제조사'; 
    }else if(_type === "top5vendor"){
        data = JSON.parse(storage.get('data_3_download'));
        prev = ['시장분석 > 화장품/미용 > 상위고객사별 제품등록수', '조회기간:'+params.dateStart==='All'?'All':params.dateStart+"~"+params.dateEnd, '제조사: '+params.brand_nm_list, '분류: 화장품/미용']
        fileName = '화장품/미용_상위고객사';       
    }else if(_type === "regProductCategory"){      
        data = JSON.parse(storage.get('data_4_download'));        
        prev = ['시장분석 > 중분류 전체시장', '조회기간:'+params.dateStart==='All'?'All':params.dateStart+"~"+params.dateEnd, '제조사: '+params.brand_nm_list, `분류: 모든 중분류`]
        fileName = '중분류시장_현황';
    }else if(_type === "regProductSubCategory"){
        data = JSON.parse(storage.get('data_5_download'));        

        params.m_category = params.m_category? ('중분류: '+params.m_category).replace(/,/g, " "):"";        
        params.s_category = params.s_category? ('소분류: '+params.s_category).replace(/,/g, " "):"";
        params.sub_category = params.sub_category? ('세부분류: '+params.sub_category).replace(/,/g, " "):"";        
        
        prev = ['시장분석 > 중_소_세부분류시장', '조회기간:'+params.dateStart==='All'?'All':params.dateStart+"~"+params.dateEnd, params.m_category, params.s_category, params.sub_category]
       
        fileName = params.m_category.length>0 && params.s_category.length>0? '중_소_세부분류시장_현황'
            : params.m_category.length>0 && params.s_category.length===0? '중_세부분류시장_현황' : '소_세부분류시장_현황';
   
    }

        /* 기간별 등록수 테이블 */
        if(data.total.length>1) { //선택한 카테고리 존재
            header = ['기간별 등록수'];
            for(let i=0; i<data.total.length-1;i++){
                header.push(data.l_list[i]);
            }           
        }else{
            header = ['기간별 등록수', '화장품/미용 전체']            
        }        
        let values1 = makeMainProductStatusDataForExportingCSV(data, 'amount');
        let table1 = {header, values1}

        /* 기간별 등록량 테이블 */
        if(data.total.length>1) { //선택한 카테고리 존재
            header = ['기간별 등록률'];
            for(let i=0; i<data.total.length-1;i++){
                header.push(data.l_list[i]);
            }           
        }else{
            header = ['기간별 등록률', '화장품/미용 전체']            
        }        
        let values2 = makeMainProductStatusDataForExportingCSV(data, 'percent');
        let table2 = {header, values2}    

        exportTwoTableDataToCSVFile(table1, table2, prev, fileName);
  }

function makeMainProductStatusDataForExportingCSV(data, data_type){

    let retValue = [];
    if(data_type==='amount'){
        for(let i=0; i<data.label.length;i++){ 
            let temp = [];
            temp.push(data.label[i]+'월')
            if(data.total.length>1){ //선택한 카테고리가 있을 때
                for(let j=0; j<data.total.length-1; j++){
                    temp.push(data.value[j][i]);    
                }
                retValue.push(temp); 
            }else{  //전체카테고리
                for(let j=0; j<data.value.length; j++){
                    temp.push(data.value[j][i]);    
                }
                retValue.push(temp); 
            }
        }
    }else{
        for(let i=0; i<data.label.length;i++){ 
            let temp = [];
            temp.push(data.label[i]+'월')
            if(data.total.length>1){ //선택한 카테고리가 있을 때
                for(let j=0; j<data.total.length-1; j++){
                    temp.push(`${Number((data.value[j][i]/data.total[j])*100).toFixed(2)}%`);    
                }
                retValue.push(temp); 
            }else{  //전체카테고리
                for(let j=0; j<data.value.length; j++){
                    temp.push(`${Number((data.value[j][i]/data.total[0])*100).toFixed(2)}%`);    
                }
                retValue.push(temp); 
            }            
        }
    }    
    return retValue;
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function drawSelectOption(_data){

    let mfg = _data.mfg;
    let vendor = _data.vendor;

    let el_factory = $('select[id=m_select]').empty();
    let el_vendor = $('select[id=c_select]').empty();
    el_factory.append('<select class="w-240"  multiple="multiple" value="All" placeholder="제조사 선택" id="m_select">')
    el_vendor.append('<select class="w-240"  multiple="multiple" value="All" placeholder="고객사 선택" id="c_select">')
    for(let i=0; i<mfg.length; i++){
        el_factory.append('<option value="'+mfg[i].mfg_nm+'">' + mfg[i].mfg_nm + '</option>');
        el_vendor.append('<option value="'+vendor[i].vendor_nm+'">' + vendor[i].vendor_nm + '</option>');
    }

    //제조사, 고객사 멀티셀렉터 플러그인
    $('select#m_select').multipleSelect();
    $('select#c_select').multipleSelect();

    $('select#m_select').change(function() {
        if(getSelectedMfgList().length > 0){
            $($('button.ms-choice')[3]).attr('disabled', true)
            initSearchlist('M');
        }else{
            $($('button.ms-choice')[3]).attr('disabled', false)
            initSearchlist('');
        }
    })
    $('select#c_select').change(function() {
        if(getSelectedVendorList().length > 0){
            $($('button.ms-choice')[1]).attr('disabled', true)
            initSearchlist('M');
        }else{
            initSearchlist('');
            $($('button.ms-choice')[1]).attr('disabled', false)
        }
    })
}

function drawProductStatusTable(_data){

    let params = getMarketParams();
    let parseData_1;
    if(typeof _data !== 'undefined'){
        parseData_1 = parseResData(_data);
        storage.set('data_1', JSON.stringify(parseData_1));
    } else {
        parseData_1 = JSON.parse(storage.get('data_1'));
    }

    drawPeriod(parseData_1.label, params);
    $('.chart_wrap.graph_1').empty();
    $('.chart_wrap.graph_1').append('<canvas id="p_registration"></canvas>');

    let graph_type = $('select#graph_1 option:selected').val();
    if(params.m_category.length===0 || params.m_category.length===11){ //전체조회시  
        parseData_1.datasets = parseData_1.dataset_sum;
        parseData_1.datasets[0].label = '화장품/미용';
    } else {
        if((parseData_1.count * (parseData_1.l_list.length -1)) > 60){
            $('select#graph_1').prop('selectedIndex', 2)
            $('select#graph_1').prop('disabled', true);
            graph_type = '누적그래프'
        }else{
            $('select#graph_1').prop('disabled', false)
        }
    }

    if(graph_type === '누적그래프'){
        drawBarChartStack(parseData_1.label, $('#p_registration'), null, parseData_1.datasets);
    }else{
        drawBarchartParallel(parseData_1.label, $('#p_registration'), null, parseData_1.datasets);
    }

    if(params.m_category.length===0 || params.m_category.length===11){ //전체조회시        
        drawTableTotal($('.main-table.reg_status thead'), $('.main-table.reg_status tbody'), parseData_1, 'data_1', graph_type, typeof _data === 'undefined');
    }else{
        drawTable($('.main-table.reg_status thead'), $('.main-table.reg_status tbody'), parseData_1, 'data_1', graph_type, typeof _data === 'undefined');
    }
    
}

function drawPeriod(d, p){
    let period = '';
    if(p.dateStart !== 'All' && p.dateEnd !== 'All'){
        period = p.dateStart.substring(0,7) +' ~ '+ p.dateEnd.substring(0,7);
    }else{
        if(d.length > 0){
            period = d[0].replace(/\//g, '-') + ' ~ ' + d[(d.length -1)].replace(/\//g, '-');
        }
    }
    $('p.date_range').text(period);
}

function drawTopMFGTable(_data){
    let parseData_2;
    if(typeof _data !== 'undefined'){
        parseData_2 = parseResData(_data);
        storage.set('data_2', JSON.stringify(parseData_2));
    } else {
        parseData_2 = JSON.parse(storage.get('data_2'));
    }
    $('.chart_wrap.graph_2').empty();
    $('.chart_wrap.graph_2').append('<canvas id="manufacturing"></canvas>');

    let graph_type = $('select#graph_2 option:selected').val();
    if(graph_type === '누적그래프'){
        drawBarChartStack(parseData_2.label, $('#manufacturing'), null, parseData_2.datasets);
    }else{
        drawBarchartParallel(parseData_2.label, $('#manufacturing'), null, parseData_2.datasets);
    }
    drawTable($('.main-table.top_5_m thead'), $('.main-table.top_5_m tbody'), parseData_2, 'data_2', graph_type);
}

function drawTopVendorTable(_data){
    let parseData_3;
    if(typeof _data !== 'undefined'){
        parseData_3 = parseResData(_data);
        storage.set('data_3', JSON.stringify(parseData_3));
    } else {
        parseData_3 = JSON.parse(storage.get('data_3'));
    }

    $('.chart_wrap.graph_3').empty();
    $('.chart_wrap.graph_3').append('<canvas id="client"></canvas>');

    let graph_type = $('select#graph_3 option:selected').val();
    if(graph_type === '누적그래프'){
        drawBarChartStack(parseData_3.label, $('#client'), null, parseData_3.datasets);
    }else{
        drawBarchartParallel(parseData_3.label, $('#client'), null, parseData_3.datasets);    
    }
    drawTable($('.main-table.top_5_client thead'), $('.main-table.top_5_client tbody'), parseData_3, 'data_3', graph_type);
}

function drawRegProductStatusTable(_data){
    let parseData_4;
    if(typeof _data !== 'undefined'){
        parseData_4 = parseResData(_data);
        storage.set('data_4', JSON.stringify(parseData_4));
    } else {
        parseData_4 = JSON.parse(storage.get('data_4'));
    }
    $('.chart_wrap.graph_4').empty();
    $('.chart_wrap.graph_4').append('<canvas id="market_middle_category"></canvas>');

    let graph_type = $('select#graph_4 option:selected').val();
    if(graph_type === '누적그래프'){
        drawBarChartStack(parseData_4.label, $('#market_middle_category'), null, parseData_4.datasets);
    }else{
        drawBarchartParallel(parseData_4.label, $('#market_middle_category'), null, parseData_4.datasets);    
    }
    drawTable($('.main-table.m_cate_status thead'), $('.main-table.m_cate_status tbody'), parseData_4, 'data_4', graph_type);
}

function drawRegProductSubCategoryTable(_data){
    let parseData;
    if(typeof _data !== 'undefined'){
        parseData = parseResData(_data);
        storage.set('data_5', JSON.stringify(parseData));
    } else {
        parseData = JSON.parse(storage.get('data_5'));
    }

    $('.chart_wrap.graph_5').empty();
    $('.chart_wrap.graph_5').append('<canvas id="detailed_category"></canvas>');

    let graph_type = $('select#graph_5 option:selected').val();
    if(graph_type === '누적그래프'){
        drawBarChartStack(parseData.label, $('#detailed_category'), null, parseData.datasets);
    }else{
        drawBarchartParallel(parseData.label, $('#detailed_category'), null, parseData.datasets);    
    }
    drawTable($('.main-table.sub_category thead'), $('.main-table.sub_category tbody'), parseData, 'data_5', graph_type);
}


function drawTable(el_thead, el_tbody, data, data_type, graph_type){
    
    /* 테이블 데이터 형식 가공 */    
    if(graph_type === '비중그래프'){
        data.l_list.push('전체 평균(총 합)');       
    }else{
        data.l_list.push('총 합');    

    }
    let sumrow=[];
    let sumnum=0;
    for(let i=0; i<data.label.length; i++){ //가로축(년월)
        let total =0;
        for(let j=0; j<data.total.length;j++){ //세로축(카테고리)
            total += data.value[j][i];
        }
        sumnum+=total;
        sumrow.push(total);
    }
    data.total.push(sumnum);
    data.value.push(sumrow);    
    storage.set(`${data_type}_download`, JSON.stringify(data));

    if(graph_type === '비중그래프'){        
        for(let i=0; i<data.total.length; i++){ //세로축(카테고리) 
            for(let j=0; j<data.value[i].length;j++){ //가로축(년월)   
                data.value[i][j] = `${Number((data.value[i][j]/data.total[i])*100).toFixed(2)}%(${data.value[i][j]})` 
            }        
        }
    }else{         
        for(let i=0; i<data.total.length; i++){ //세로축(카테고리) 
            for(let j=0; j<data.value[i].length;j++){ //가로축(년월)               
                data.value[i][j] = `${data.value[i][j]}(${Number((data.value[i][j]/data.total[i])*100).toFixed(2)}%)` 
            }        
        }  
    }
        
    let el_head = el_thead.empty();
    
    let h_el='';
    if(graph_type === '비중그래프'){
        h_el = '<tr><th class="fixed-side first" scope="col">분류</th><th scope="col" class="average">점유율</th>';
    }else{
        h_el = '<tr><th class="fixed-side first" scope="col">분류</th><th scope="col" class="average">전체 등록수</th>'; 
    }
    for(let i=0; i<data.label.length; i++){
        h_el += '<th scope="col">'+data.label[i]+'</th>';
    }
    h_el += '</tr>';
    el_head.append(h_el);
    
    let el_body = el_tbody.empty();
    for(let j=0; j<data.value.length; j++){
        
        let b_el = ''
        if(data.datasets.length === j){            
            if(graph_type === '비중그래프'){               
                b_el = '<tr><th class="fixed-side"><span style="background-color: '+dynamicColors()+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]/data.total[data.total.length-1]? Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%(${data.total[j]})` +'</th>';
            }else{
                b_el = '<tr><th class="fixed-side"><span style="background-color: '+dynamicColors()+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]}(${data.total[j]/data.total[data.total.length-1]?Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%)` +'</th>';
            }
        } else {            
            if(graph_type === '비중그래프'){
                b_el = '<tr><th class="fixed-side"><span style="background-color: '+data.datasets[j].backgroundColor+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]/data.total[data.total.length-1]?Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%(${data.total[j]})` +'</th>';
            }else{
                b_el = '<tr><th class="fixed-side"><span style="background-color: '+data.datasets[j].backgroundColor+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]}(${data.total[j]/data.total[data.total.length-1]?Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%)` +'</th>';
            }
        }

        for(let k=0; k<data.value[j].length; k++){
            b_el += '<td>'+data.value[j][k]+'</td>';
        }
        b_el += '</tr>';
        el_body.append(b_el);
    }
}


function drawTableTotal(el_thead, el_tbody, data, data_type, graph_type){
    /* 테이블 데이터 형식 가공 */
     if(graph_type === '비중그래프'){
        data.l_list.unshift('전체 평균(총 합)');       
    }else{
        data.l_list.unshift('총 합');   
    }
    let sumrow=[];
    let sumnum=0;
    for(let i=0; i<data.label.length; i++){ //가로축(년월)
        let total =0;
        for(let j=0; j<data.total.length;j++){ //세로축(카테고리)
            total += data.value[j][i];
        }
        sumnum+=total;
        sumrow.push(total);
    }
    data.total=[];
    data.total.push(sumnum);
    data.value=[];
    data.value.push(sumrow);   

    storage.set(`${data_type}_download`, JSON.stringify(data));

    if(graph_type === '비중그래프'){
        for(let i=0; i<data.total.length; i++){ //세로축(카테고리) 
            for(let j=0; j<data.value[i].length;j++){ //가로축(년월)
                data.value[i][j] = `${Number((data.value[i][j]/data.total[i])*100).toFixed(2)}%(${data.value[i][j]})` 
            }        
        }  
    }else{
        for(let i=0; i<data.total.length; i++){ //세로축(카테고리) 
            for(let j=0; j<data.value[i].length;j++){ //가로축(년월)
                data.value[i][j] = `${data.value[i][j]}(${Number((data.value[i][j]/data.total[i])*100).toFixed(2)}%)` 
            }        
        }  
    }        

    let el_head = el_thead.empty();
    let h_el = ''
    if(graph_type === '비중그래프'){
        h_el = '<tr><th class="fixed-side first" scope="col">분류</th><th scope="col" class="average">점유율</th>';
    }else{
        h_el = '<tr><th class="fixed-side first" scope="col">분류</th><th scope="col" class="average">전체 등록수</th>';
    }
       
    for(let i=0; i<data.label.length; i++){
        h_el += '<th scope="col">'+data.label[i]+'</th>';
    }
    h_el += '</tr>';
    el_head.append(h_el);

    let el_body = el_tbody.empty();
    for(let j=0; j<data.value.length; j++){
        let  b_el = ''
        if(graph_type === '비중그래프'){
            b_el = '<tr><th class="fixed-side"><span style="background-color: '+dynamicColors()+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]/data.total[data.total.length-1]?Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%(${data.total[j]})` +'</th>';
        }else{
            b_el = '<tr><th class="fixed-side"><span style="background-color: '+dynamicColors()+' "></span>'+data.l_list[j]+'</th><th class="average">'+`${data.total[j]}(${data.total[j]/data.total[data.total.length-1]?Number((data.total[j]/data.total[data.total.length-1])*100).toFixed(2):"0.00"}%)` +'</th>';
        }
     
        for(let k=0; k<data.value[j].length; k++){
            b_el += '<td>'+data.value[j][k]+'</td>';
        }
        b_el += '</tr>';
        el_body.append(b_el);
    }
}


function parseResData(data){

    let l_list = data.labels;
    let d_list = data.list;

    let label = [];
    let value = [];
    let total = [];
    for(let i=0; i<l_list.length; i++){
        total[i] = 0;
        value.push(new Array())
    }

    let count = 0, t_sum = [];
    for(k in d_list){
        label.push(k);
        let _idx = 0, sum = 0;
        for(k2 in d_list[k]){
            total[_idx] += Number(d_list[k][k2]);
            value[_idx].push(d_list[k][k2]);    
            sum += d_list[k][k2];
            _idx++;
        }
        t_sum.push(sum);
        count++;
    }

    let datasets = [], dataset_sum = [];
    for(let i=0; i<l_list.length; i++){
        datasets.push( {
            data: value[i],
            backgroundColor: getCategoryColor(l_list[i]),
            label: l_list[i],
            barPercentage:0.5,
            borderRadius: 2,
        })
    }
    dataset_sum.push({
        data: t_sum,
        backgroundColor: getCategoryColor(l_list[0]),
        label: '',
        barPercentage:0.5,
        borderRadius: 2,
    })

    return {
        label: label,
        datasets: datasets,
        dataset_sum: dataset_sum,
        value: value,
        l_list: l_list,
        total: total,
        count: count
    }
}


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

// 숫자 앞에 0 추가
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

//검색어 추가
function AddKeyword(type) {

    if(typeof type === 'undefined'){
        type = $('.small_categories .all_check input#s_all_check').is(':checked') ? 'F' : '';

        if(getSelectedMfgList().length > 0 || getSelectedVendorList().length >0){
            type = 'M';
        }
        let search_cond = $('select#seach_condition option:selected').val();
        if(typeof search_cond !== 'undefined'){
            if($('select#seach_condition option:selected').val() == 'V'){
                type = 'V';
            } else {
                type = 'M2'
            }
        }
    }
    
    
    let keywordInputArea = $('.k_input');
    let rows = $('.input_wrap').length;
    rows = rows === 0 ? 0 : $($('.input_wrap input[type=checkbox]')[rows-1]).attr('id').split('_')[2];
    rows = Number(rows);
    
    let keywordGroup = '';

        keywordGroup += '<div class="input_wrap add f_a_c">';
        keywordGroup += '<div class="essential_che">';
        keywordGroup += '<input type="checkbox" id="e_check_' + pad(rows+1) + '">';
        keywordGroup += '<label for="e_check_' + pad(rows+1) + '"></label>';
        keywordGroup += '</div>';
        keywordGroup += '<select id="seach_condition" onchange="changeSearchCondition(this)">';
        keywordGroup += '<option value="All selected">검색조건선택</option>';
        
        if(type === 'M'){
            keywordGroup += '<option value="F">기능</option>';    
        } else if(type === 'F'){
            keywordGroup += '<option value="V">고객사</option>';
            keywordGroup += '<option value="M">제조사</option>';
        } else if(type === 'V'){
            keywordGroup += '<option value="F">기능</option>';
            keywordGroup += '<option value="V">고객사</option>';
        } else if(type === 'M2'){
            keywordGroup += '<option value="F">기능</option>';
            keywordGroup += '<option value="M">제조사</option>';
        } else {
            keywordGroup += '<option value="F">기능</option>';  
            keywordGroup += '<option value="V">고객사</option>';
            keywordGroup += '<option value="M">제조사</option>';
        }
        keywordGroup += '</select>';
        if(rows > 0) {
            keywordGroup += '<div class="add_close">';
            keywordGroup += '<input name="keyword" type="text" placeholder="검색어 입력">';
            keywordGroup += '<span onclick="keywordDelete(this);">삭제 버튼</span>';
            keywordGroup += '</div>';
        } else {
            keywordGroup += '<input name="keyword" type="text" placeholder="검색어 입력">';
        }
        keywordGroup += '</div>';
    
    keywordInputArea.append(keywordGroup);

}

 //검색어 추가 삭제
function keywordDelete(e) {
    e.closest('.input_wrap.add').remove();
}

let deleteModal = $('.delete_modal');

function stopWDelete() {
    deleteModal.addClass('active');
}

function stopWModalCancel() {
    deleteModal.removeClass('active');
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */