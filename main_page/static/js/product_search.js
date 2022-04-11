/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

$(function () { 
    $('form').on('submit', (e) => {
        e.preventDefault();
    })
    initView();

    //긍부정 리뷰 - 테이블 스크롤이 생길 시 td width값 변경
    let changeTr03 = $('.list01 table.review_table tbody tr');
    let changeTd03 = $('.list01 table.review_table tbody td:nth-of-type(4)');

    if (changeTr03.length > 10) {
        changeTd03.css({ width: '94px' });
    } else {
        changeTd03.css({ width: '111px' });
    }
});

let prodCurPage = 0;
let ProductList = '';
let ProductListMfg = '';
let curSCategory = '';
let curSubCategory = '';
let selectedProd = '';
let selectedProdMfg = '';
let selectedIdx = 0;
let curPage = 0;
let prodComparison = [];
let ProdChartInfo = '';
let ProdReviewInfo = '';
/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function initView(){

    //토글 클릭시 숨김 보임
    let $slidetoggle =$('.slidetoggle');
    $slidetoggle.click(function(){
        initToggle(this);
    });

    let checkInputAge = $('#age input[type="checkbox"]');
    checkInputAge.click(function () {
        if($(this).val() === 'all'){
            Array.from(checkInputAge).forEach((e) => {
                $(e).prop('checked', false);
            })
            $(checkInputAge[0]).prop('checked', true);
        }else{
            $(checkInputAge[0]).prop('checked', false);
        }
    })

    let checkInputGender = $('#gender input[type="checkbox"]');
    checkInputGender.click(function () {
        if($(this).val() === 'all'){
            Array.from(checkInputGender).forEach((e) => {
                $(e).prop('checked', false);
            })
            $(checkInputGender[0]).prop('checked', true);
        }else{
            $(checkInputGender[0]).prop('checked', false);
        }
    })

    let checkInputSkin = $('#skin input[type="checkbox"]');
    checkInputSkin.click(function () {
        if($(this).val() === 'all'){
            Array.from(checkInputSkin).forEach((e) => {
                $(e).prop('checked', false);
            })
            $(checkInputSkin[0]).prop('checked', true);
        }else{
            $(checkInputSkin[0]).prop('checked', false);
        }
    })

    // 제조사 Select 초기화
    let el_factory = $('select[id=mfg_nm]').empty();
    el_factory.append('<option value="All" selected>전체</option>')
    for(k in FACTORY){
        el_factory.append('<option value="'+FACTORY[k]+'">' + FACTORY[k] + '</option>');
    }


    let targetTr = $('.list01 table tr');
    $(targetTr).each(function(){
        if($(this).hasClass('disabled')){
            $(this).find('.t-check input').attr('disabled', true);
            $(this).find('button').attr('disabled', true);
        }
    })

    initModal();
    initChangeMfgNm();
    initSCategoryRadioBtn();
    initSubCategoryCheckBoxBtn();
    initCatetoryWithGlowpick();
    initAllOptionWithSite();
}

function initTableSorter(){
    $('form').on('submit', (e) => {
        e.preventDefault();
    })

    $('#prod_list_table').removeAttr('role');
    $('#prod_list_table').removeClass('tablesorter-default');
    $('#prod_list_table').tablesorter();

    //테이블 제조사 수정
    let cancelBtn = $(".cancelBtn");
    let manufacturerInput = $("input[name=manufacturer]");
    let manufModify = $(".list01 form");
    cancelBtn.click(function () {
        manufModify.removeClass('on');
        manufacturerInput.val('');
    });
}

function initModal(){
    //버튼 클릭 시 모달
    let managementBtn = $('.m-managementBtn');
    let stopwordBtn = $('.stopwordBtn');
    let mPosition = $('.m_m .list01 form');

    managementBtn.click(function () {
        fetchMfgNmListChanaged();
        fetchMfgNmChangeHistory(1);

        let ManageModal = $('.m_m');
        ManageModal.addClass('active');
        $('body').css("overflow", "hidden");
        mPosition.css({ left: "572px" });
    });

    stopwordBtn.click(function () {
        fetchStopword(1);

        let stopWordModal = $('.stopword');
        stopWordModal.addClass('active');
        $('body').css("overflow", "hidden");
    });
   
    //불용어 관리 모달 - 테이블 스크롤이 생길 시 td width값 변경
    let changeTr02 = $('.list01 table.stopword_table tbody tr');
    let changeTd02 = $('.list01 table.stopword_table tbody td:nth-of-type(5)');

    if (changeTr02.length > 10) {
        changeTd02.css({ width: '76px' });
    } else {
        changeTd02.css({ width: '93px' });
    }
}

function initToggle(e){
    let categoryCheck = $('.category_item');
    $(e).next(categoryCheck).slideToggle();
    $(e).css({borderRadius: "4px"})
    
    if ($(e).find('img').attr('src') == "/main_page/static/image/arrow-down.svg") {
        $(e).find('img').attr('src', '/main_page/static/image/arrow-up.svg')
        $(e).css({ borderRadius: "4px 4px 0 0" })
    }else{
        $(e).find('img').attr('src', "/main_page/static/image/arrow-down.svg")
    }
}

/**
 * 제조사명 수정 초기화
 */
function initChangeMfgNm(){
    //제조사명 관리 모달 - 테이블 스크롤이 생길 시 td width값 변경
    let changeTr01 = $('.list01 table.m-manage tbody tr');
    let changeTd01 = $('.list01 table.m-manage tbody td:nth-of-type(5)');
    
    if (changeTr01.length > 10) {     
        changeTd01.css({ width: '154px' });
    } else {
        changeTd01.css({ width: '171px' });
    }
}

function initAllOptionWithSite(){
    curSCategory = '';
    curSubCategory = '';

    _initTopOption();
    _initMediumCategory();
    _initSubCategory();
    _initSearchlist();
    _initOptionWithGlowpick();
}

function _initSearchlist(){
    $('.k_input').empty();
    AddKeyword();
}

function _initTopOption(){

    let radioInput = $('.medium_categories input[type="radio"]');
    Array.from(radioInput).forEach((e) => {
        $(e).parents('.category_item').siblings().find('p.tt').css({ color: "#25287F" });
        $(e).prop("checked", false);
        $(e).attr("checked", false);
    })

    // $('ul#period li').removeClass('active');
    $('ul#period input[type=text]').val('');
    // $($('ul#period').children().eq(2)).addClass('active');  // 제품검색 등록일 기본 1년으로 -> 4월6일 다시 전체로...
    $('select#mfg_nm').find('option').eq(0).prop('selected', true);
}

function _initMediumCategory(){
    let el_toggle_medium = $('.slidetoggle.medium');
    Array.from(el_toggle_medium).forEach((e) => {
        if($(e).next('.category_item').css('display') !== 'none'){
            initToggle(e);
        }
    })

    if($('.slidetoggle.sub').next().css('display') !== 'none'){
        $('.slidetoggle.sub').trigger('click');
    }
}

function _initOptionWithGlowpick(){
    $('#prod_gubun p').removeClass('active');
    $($('#prod_gubun').children().eq(0)).addClass('active');

    let el_gender = $('#gender input[type=checkbox]');
    Array.from(el_gender).forEach((e) => {
        $(e).prop('checked', false);
    })
    $(el_gender[0]).prop('checked', true);

    let el_age = $('#age input[type=checkbox]');
    Array.from(el_age).forEach((e) => {
        $(e).prop('checked', false);
    })
    $(el_age[0]).prop('checked', true);

    let el_skin = $('#skin input[type=checkbox]');
    Array.from(el_skin).forEach((e) => {
        $(e).prop('checked', false);
    })
    $(el_skin[0]).prop('checked', true);
}

function _initSubCategory(){
    let el_checkboxs = $('.small_categories input[type=checkbox]');
    Array.from(el_checkboxs).forEach((e) => {
        $(e).prop('checked', false);
    })
}

function initAgeTypeSelectGlowpick(){
    let checked_age = $('.checkBox_wrap.glowpick #age input[type=checkbox]:checked');
    let el_age_select = $('select#age_select').empty();
    el_age_select.append('<option value="All">연령 전체</option>');
    Array.from(checked_age).forEach((e) => {
        if($(e).val() === 'all'){
            let unchecked_age = $('.checkBox_wrap.glowpick #age input[type=checkbox]:not(:checked)');
            Array.from(unchecked_age).forEach((e1) => {
                el_age_select.append('<option value="'+$(e1).val()+'">'+$(e1).val()+'대</option>');
            })
        }else{
            el_age_select.append('<option value="'+$(e).val()+'">'+$(e).val()+'대</option>');
        }
    })
}

function initSkinTypeSelectGlowpick(){
    let checked_skin = $('.checkBox_wrap.glowpick #skin input[type=checkbox]:checked');
    let el_skin_select = $('select#skin_select').empty();
    el_skin_select.append('<option value="All">피부타입 전체</option>')
    Array.from(checked_skin).forEach((e) => {
        if($(e).val() === 'all'){
            let unchecked_skin = $('.checkBox_wrap.glowpick #skin input[type=checkbox]:not(:checked)');
            Array.from(unchecked_skin).forEach((e1) => {
                el_skin_select.append('<option value="'+$(e1).val()+'">'+$(e1).val()+'</option>')
            })
        }else{
            el_skin_select.append('<option value="'+$(e).val()+'">'+$(e).val()+'</option>')
        }
    })
}

function initCatetoryWithGlowpick(){
    let inputCheckbox = $('.checkBox_wrap.glowpick input[type=checkbox]');
    inputCheckbox.click(function () {
        initAgeTypeSelectGlowpick();
        initSkinTypeSelectGlowpick();
    })
}

/**
 * 세부분류 클릭 초기화
 */
function initSubCategoryCheckBoxBtn(){
    let el_checkboxs = $('.small_categories input[type=checkbox]');
    el_checkboxs.click(function () {

        if($(this).attr('id') == 'all_check'){
            if($('.medium_categories input[type=radio]:checked').length > 0){
                let m_cate = $('.medium_categories input[type=radio]:checked').attr('id');
                let selected_m_cate;
                if(m_cate.startsWith('face')){
                    selected_m_cate = $('.medium_categories input[type=radio]:checked').parent().parent().parent().parent().find('p.tt').attr('meta-info');
                }else{
                    selected_m_cate = $('.medium_categories input[type=radio]:checked').parent().parent().parent().find('p.tt').attr('meta-info');
                }
                if($('input#all_check').is(':checked')){    
                    $('.small_categories .'+selected_m_cate).find('input[type=checkbox]').prop('checked', true)
                } else {
                    $('.small_categories .'+selected_m_cate).find('input[type=checkbox]').prop('checked', false)
                }
            }
        } else {
            if($(this).is(':checked')){
                let res = Array.from($(this).parent().parent().find('input[type=checkbox]')).filter((e) => {
                    return $(e).is(':checked') === false
                })
                if(res.length === 0) $('input#all_check').prop('checked', true);
            }else{
                $('input#all_check').prop('checked', false);
            }
        }

    })
}

/**
 * 소분류 클릭 초기화
 */
function initSCategoryRadioBtn(){
    
    //라디오 버튼 눌린 타이틀 색 변경
    let radioInput = $('.medium_categories input[type="radio"]');
    radioInput.click(function () { 
        _initSubCategory();
        if(curSCategory === $(this).attr('id')){
            $('input#all_check').attr('disabled', true);

            $('.slidetoggle.sub').trigger('click');
            $('.small_categories .pattern01').css('display', 'block')
            $('.small_categories .common').css('display', 'none');
            
            $(this).parents('.category_item').siblings().find('p.tt').css({ color: "#25287F" });
            $(this).prop("checked", false);
            $(this).attr("checked", false);
            curSCategory = '';
            
        } else {
            
            curSCategory = $(this).attr('id');
            if(curSCategory === 'animals01'){
                $('.slidetoggle.sub').trigger('click');
                $('.small_categories .pattern01').css('display', 'block')
                $('.small_categories .common').css('display', 'none');
            } else {
                $('input#all_check').attr('disabled', false) // 세부분류 체크 활성화

                if($('.slidetoggle.sub').next().css('display') === 'none'){
                    $('.slidetoggle.sub').trigger('click');
                }

                $('.slidetoggle p.tt').css({ color: "#25287F" });
                $(this).parents('.category_item').siblings().find('p.tt').css({ color: "#65AE55" });
                
                $('.small_categories .category_item').css('display', 'block');
                $('.small_categories .common').css('display', 'none');
                let small_category = $(this).parents('.category_item').siblings().find('p.tt').attr('meta-info');

                $('.small_categories .pattern01').css('display', 'none')
                $('.small_categories .'+small_category).css('display', 'block')
            }
        }
    });
}


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function prodCheckboxClick(_this){

    let infoTxt = $('.info_txt');
    let items = $('.items');
    let checkedTr = $(_this).parent('td').parent('tr');
    let checkedTd = checkedTr.find('td');
    let productName = $(_this).parent('td').siblings('.product_name').text();
    let keywordCount = $('.items p').length;

    let position = $(_this).closest('tr').prevAll().length;

    if ($(_this).is(":checked")) {
    
        if (keywordCount > 0) {
            let addIcon = document.createElement('img');
            addIcon.src = "/main_page/static/image/com-icon.svg";
            addIcon.width = 24;
            addIcon.height = 24;
            items.append(addIcon);
        }

        $(_this).attr("checked", true);
        checkedTd.css({ background: "#F4F4F4" });
        infoTxt.hide();
        items.show();

        $itemName = '';
        $itemName += '<p class="item01"  meta-info="'+prodCurPage+'_'+position+'">';
        $itemName += productName + '<span class="close01"></span>';
        $itemName += '</p>'
        items.append($itemName);


        let site_nm = $('select#site_nm option:selected').val();
        let prod = ProductList[position];
        prod.site_nm = site_nm;
        prodComparison.push({page: prodCurPage, position:position, prod: prod})
    } else {
        checkedTd.css({ background: "#FFF" });
        let selected_idx = 0;
        for(let i =0; i<$('p.item01').length; i++){
            if(productName === $($('p.item01')[i]).text()){
                selected_idx = i;
            }
        }

        if(selected_idx === 0){
            $($(items).children()[selected_idx]).remove();
            if($(items).children().length > 1){
                $($(items).children()[selected_idx]).remove();
            }
        } else {
            if($(items).children().length > 1){
                for(let i=$(items).children().length; i>0; i--){
                    if(i >= selected_idx){
                        $($(items).children()[i]).remove();
                    }   
                }
            } else {
                $($(items).children()[selected_idx]).remove();
            }
        }
        
        removeComparisonItem(prodCurPage, position);
    }
    
    redrawCheckboxOnProdList();

    let closeBtn = $('.item01 span.close01');
    closeBtn.click(function () {         
        $(this).parent('p').remove();
        let keywordCount = $('.items p').length; //중복
        if (keywordCount === 1) { 
            items.find('img').remove();
            let comBtn = $('.comparison button');//중복
            comBtn.attr("disabled", true);
        } 

        let meta_info = $(this).parent('p').attr('meta-info');
        removeComparisonItem(meta_info.split('_')[0], meta_info.split('_')[1]);
        redrawCheckboxOnProdList($(this).parent('p').text());
    });
}

function redrawCheckboxOnProdList(p_name){
    let infoTxt = $('.info_txt');
    let items = $('.items');
    let checkBoxInput = $(".t-check").find('input[type="checkBox"]');

    for(let i=0; i<checkBoxInput.length; i++){
        if($(items).children().length > 1){
            if(!$(checkBoxInput[i]).is(':checked')){
                $(checkBoxInput[i]).attr("disabled", true);
            } else {
                $(checkBoxInput[i]).attr("disabled", false);
            }
        }else{
            if($(items).children().length === 0){
                items.hide();
                infoTxt.show();
            }
            if(typeof p_name !== 'undefined'){
                if($(checkBoxInput[i]).parent('td').siblings('.product_name').text() === p_name){
                    $(checkBoxInput[i]).prop('checked', false);
                    $(checkBoxInput[i]).attr("disabled", false);
                    $(checkBoxInput[i]).parent('td').parent('tr').find('td').css({ background: "#FFF" });
                }
            }            
            if($(checkBoxInput[i]).parent().parent().attr('class') === 'disabled'){
                $(checkBoxInput[i]).attr("disabled", true);
            } else {
                $(checkBoxInput[i]).attr("disabled", false);
            }
        }
    }

    if($(items).children().length > 1){
        $('button.b').attr("disabled", false);
    }else{
        $('button.b').attr("disabled", true);
    }
}

function removeComparisonItem(c_page, position){
    prodComparison = prodComparison.filter(p => {
        return (p.page != c_page || p.position != position);
    })
}

function changeProdSelect(){
    fetchProductInfo(1);
}

function changeStopwordSelect(){
    fetchStopword(1);
}

function changeMfgSelect() {
    fetchMfgNmChangeHistory(1);
}
function changeMfgHistoryLimit(){
    fetchMfgNmChangeHistory(1);
}

function changeReviewSelection(type){

    if(type === 'M'){
        let type = $('select#review_type option:selected').val();
        let age = $('select#age_select');
        let skin = $('select#skin_select');    

        if(type === 'age'){
            initAgeTypeSelectGlowpick();
    
            $(age).css('display', 'block');
            $(skin).css('display', 'none');
        } else {
            initSkinTypeSelectGlowpick();
    
            $(age).css('display', 'none');
            $(skin).css('display', 'block');
        }
    }

    fetchSearchProdReview(1);
}

function changeSiteSelection(){

    initAllOptionWithSite();
    $('.items').empty().hide();
    $('.info_txt').show();
    prodComparison = [];
    let site_nm = $('select#site_nm option:selected').val();
    $('.search_results').css('display', 'none');
    if(site_nm === 'G'){
        $('.group.naver').css('display', 'none');
        $('.group.glowpick').css('display', 'flex');
        $('.checkBox_wrap.glowpick').css('display', 'block');
        $('.small_categories').css('display', 'none');
    } else {
        $('.group.glowpick').css('display', 'none');
        $('.checkBox_wrap.glowpick').css('display', 'none');
        $('.group.naver').css('display', 'flex');
        $('.small_categories').css('display', 'block');
    }
}

function dblClickMfgName(_this, type){

    let manufacturerInput = type === 'P' ? $(".list01.prod_list input[name=manufacturer]") : $(".list01.hist input[name=manufacturer]") ;
    let manufModify = type === 'P' ? $(".list01.prod_list form") : $(".list01.hist form");

    manufModify.addClass('on');
    let manufacturerVal = $(_this).text();
    manufacturerInput.val(manufacturerVal);

    let rowldx = $(_this).closest('tr').prevAll().length;
    let top_position = 38 + (rowldx * 38);
    manufModify.css({ top: top_position });

    selectedIdx = rowldx;
    selectedProd = type === 'P' ? ProductList[rowldx] : '';
    selectedProdMfg = type === 'M' ? ProductListMfg[rowldx]: '';
}

function runSearchingProductInfo(){
    
    fetchProductInfo(1);
    fetchSearchProdReview(1);

    if($('select#site_nm option:selected').val() === 'G'){
        fetchProductChartInfo();
        getSearchProdReview(1);
    }
}

function runComparison(){

    storage.set('comparison', JSON.stringify(prodComparison));
    goLocationLink('/comparison');
}


function goProductLink(link){
    if(link !== null){
        window.open(link);
    }
}

function goProductDetail(p){
    let site_nm = $('select#site_nm option:selected').val();
    let prod = ProductList[p];
    prod.site_nm = site_nm;
    storage.set('selected_product', JSON.stringify(prod));
    goLocationLink('/prod-detail');
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function exportData(_type){

    let params = getProductSearchingParams();
    let site_nm = params.site_nm;
    let fileName = site_nm === 'N' ? '네이버':(site_nm === 'C'?'쿠팡':'글로우픽');
    let mfg_nm = params.mfg_nm;
    let period = params.period;
    let s_cat = params.s_category;
    let sub_cat = params.sub_category;
    let prod_gubun = params.prod_gubun;
    let gender = params.gender;
    let age = params.age;
    let skin = params.skin;
    let prev = [];
    let header = [];
    let values = [];
    if(site_nm === 'G'){
        if(_type === 'T'){ //분포도통계
            prev = ['제품검색 > '+fileName+'_연령/성별/피부타입_분포도', '구분:'+prod_gubun, '조회기간:'+period, '성별:'+gender, '연령:'+age, '피부타입:'+skin, s_cat+':'+sub_cat, ]
            header = ['성별', '분포도', '연령', '분포도', '피부타입', '분포도']
            values = makeProdChartDataForExportingCSV(ProdChartInfo, site_nm);
            exportDataToCSVFile(header, values, prev, fileName +'_분포도');
        } else if(_type === 'R'){ //리뷰
            //리뷰 50개 호출
            prev = ['제품검색 > '+fileName+'_연령/성별/피부타입_긍부정리뷰', '구분:'+prod_gubun, '조회기간:'+period, '성별:'+gender, '연령:'+age, '피부타입:'+skin, s_cat+':'+sub_cat, ]
            header = ['No', '긍정리뷰', '등록일', '부정리뷰', '등록일']           
            values = makeProdReviewDataForExportingCSV(ProdReviewInfo, site_nm);
            exportDataToCSVFile(header, values, prev, fileName +'_긍부정리뷰');
        } else {
            prev = ['제품검색>제품리스트', '사이트:'+fileName, '조회기간:'+period, s_cat+':'+sub_cat,]
            header = ['AIS', '순위', '제품 이미지 링크', '제품명', '브랜드', '가격', '평점', '제품등록일', '제품링크']
            values = makeProdDataForExportingCSV(ProductList, site_nm);    
            exportDataToCSVFile(header, values, prev, fileName +'_제품리스트');
        } 
    }else {
        prev = ['제품검색>제품리스트', '사이트:'+fileName, '제조사:'+mfg_nm, '조회기간:'+period, s_cat+':'+sub_cat,]
        header = ['AIS', '순위', '제품 이미지 링크', '제품명', '판매처', '제조사', '브랜드', '가격', '평점', '제품등록일', '제품링크']
        values = makeProdDataForExportingCSV(ProductList, site_nm);
        exportDataToCSVFile(header, values, prev, fileName +'_제품리스트');
    }
    
}

function makeProdDataForExportingCSV(_data, site_nm){
    let retValue = [];
    for(let i=0; i<_data.length; i++){
        let v = _data[i];

        if(site_nm === 'G'){
            retValue.push([v.ais,v.prod_rank,v.prod_img,v.prod_nm?v.prod_nm.replaceAll(',', ' '):"",v.brand_nm,v.prod_price,v.prod_grade,v.reg_date,v.prod_link]);
        } else {
            retValue.push([v.ais,v.prod_rank,v.prod_img,v.prod_nm?v.prod_nm.replaceAll(',', ' '):"",v.vendor_nm,v.mfg_nm,v.brand_nm,v.prod_price,v.prod_grade,v.reg_date,v.prod_link]);
        }
    }

    return retValue;
}


function makeProdChartDataForExportingCSV(_data, site_nm){

    let retValue = [];
    for(let i=0; i<6; i++){ //연령 기준이 가장 길기때문에 6으로 설정
        let age = _data.ageChart[i];
        let gender;
        if(i<2){
            gender = _data.genderChart[i]; 
        }else{
            gender = null;
        }       
        let skin;
        if(i<5){
            skin = _data.skinChart[i]
        }else{
            skin = null;
        };

        if(site_nm === 'G'){
            retValue.push([gender!=null?gender.name:null,gender!=null?`${Number(gender.value/_data.genderTotal*100).toFixed(2)}%`:null,age.name,`${Number(age.value/_data.ageTotal*100).toFixed(2)}%`,skin!=null?skin.name:null,skin!=null?`${Number(skin.value/_data.skinTotal*100).toFixed(2)}%`:null]);
        }
    }

    return retValue;
}

function makeProdReviewDataForExportingCSV(_data,site_nm){
    
    let retValue = [];
    for(let i=0; i<50; i++){
        let goodReview = _data.goodReviewList.data[i];
        let badReview = _data.badReviewList.data[i];    
        if(site_nm === 'G'){
            retValue.push([i+1,goodReview!==null?goodReview.REVIEW:null,goodReview!==null?goodReview.REG_DTTM:null,
                badReview!==null?badReview.REVIEW:null,badReview!==null?badReview.REG_DTTM:null]);
        }
    }
    return retValue;
       
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function getProductSearchingParams(pageNo){
    let site_nm = $('select#site_nm option:selected').val();
    let period = $('.period ul#period li.active').attr('value');
    let period_direct = $('input[name=datefilter]').val();
    let period_type = (typeof period === 'undefined' ? 'Direct' : 'Indirect')
    period = (typeof period === 'undefined' ? period_direct : period);
    let mfg_nm = $('select#mfg_nm option:selected').val();

    let s_category = $('.medium_categories input[type=radio]:checked').val();
    s_category = typeof s_category === 'undefined' ? 'All' : s_category;
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

    let checked_sub_category = $('input#all_check').is(':checked');
    let checked_done_analysis = $('input#done_analyzing').is(':checked');

    let search = [];
    let search_required = $('.input_wrap input[type=checkbox]');
    let seach_type = $('select#seach_condition option:selected');
    let search_word = $('.input_wrap input[name=keyword]');
    for(let i=0; i<search_required.length; i++){
        search.push({
            required: $(search_required[i]).is(':checked'),
            type: $(seach_type[i]).val(),
            keyword: $(search_word[i]).val()
        })
    }

    let prod_limit = $('.search_results select#prod_limit option:selected').val();    

    let res = {
        site_nm: site_nm,
        period: period,
        period_type: period_type,
        mfg_nm: mfg_nm,
        s_category: s_category,
        sub_category: sub_category,
        checked_sub_category: checked_sub_category,
        checked_done_analysis: checked_done_analysis,
        search_list: search,
        cur_page: pageNo,
        page_limit: prod_limit
    }

    if(site_nm === 'G'){
        let prod_gubun = $('#prod_gubun p.active').text();

        let el_gender = $('#gender input[type=checkbox]');
        let gender = [];
        for(let i = 0; i < el_gender.length; i++){
            if($(el_gender[i]).is(':checked')){
                gender.push($(el_gender[i]).val());
            }
        }
        let el_age = $('#age input[type=checkbox]');
        let age = [];
        for(let i = 0; i < el_age.length; i++){
            if($(el_age[i]).is(':checked')){
                age.push($(el_age[i]).val());
            }
        }
        let el_skin = $('#skin input[type=checkbox]');
        let skin = [];
        for(let i = 0; i < el_skin.length; i++){
            if($(el_skin[i]).is(':checked')){
                skin.push($(el_skin[i]).val());
            }
        }

        res.prod_gubun = prod_gubun// === '인기제품' ? 1 : 0;
        res.gender = gender;
        res.age = age;
        res.skin = skin;
    }

    return res
}

function getStopwordParams(pageNo){
    let limit = $('.stopword_modal select#stopword option:selected').val();
    let keyword = $('input[name=keyword_stopword]').val();

    let res = {
        type: 'GET',
        cur_page: pageNo,
        page_limit: limit,   
    }

    if(keyword !== null && keyword.trim().length > 0){
        res.keyword = keyword;
    }

    return res
}

function getAddStopwordParams(){
    let stopword = $('input[name=stopword]').val();
    let comment = $('input[name=stopword_comment]').val();

    if(issets(stopword, comment)){
        return {
            stopword: stopword,
            comment: comment,
            type: 'ADD'
        }
    } else {
        alert('추가할 불용어 정보를 입력해주세요.')
    }
}

function getMfgNmChangeHistoryParams(pageNo){
    let mfg_nm = $('.mfg_management select#mfg_history_select option:selected').val();
    let limit = $('.mfg_management select#mfg_history_limit option:selected').val();

    return {
        mfg_nm: typeof mfg_nm === 'undefined' ? 'All' : mfg_nm,
        cur_page: pageNo,
        page_limit: limit,
        type: 'GET'
    }
}

function fetchProductInfo(pageNo){
    startLoader();
    let params = getProductSearchingParams(pageNo);
    $.getCsrf(API.get_prod_list,
        params,
        function (success, status) {
            if(status === 200){
                prodCurPage = pageNo;
                ProductList = success.data;
                drawProdList(success.data);
                drawPager(pageNo, success.page.total_cnt, params.page_limit, $('.pager.prod_list'), this.fetchProductInfo);
            }
            stopLoader();
        }, 
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

function fetchProductChartInfo(){    
    startLoader();
    let params = getProductSearchingParams(1);
    $.getCsrf(API.get_prod_chart_list,
        params,
        function (success, status) {
            if(status === 200){
                ProdChartInfo = success.chartData;
                drawProdChartList(ProdChartInfo, params);
            }
            stopLoader();
        }, 
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

function fetchStopwordWithKeyword(){
    let keyword = $('input[name=keyword_stopword]').val();
    if(issets(keyword)){
        fetchStopword(1);
    } else {
        alert('검색어를 입력해주세요.');
    }
}

function fetchMfgNmChangeHistory(pageNo){
    let params = getMfgNmChangeHistoryParams(pageNo);
    $.getCsrf(API.get_change_mfg_nm_history, params,
        function (success, status) {
            if(status === 200){
                ProductListMfg = success.data;
                drawMfgNmChangeList(success.data);
                drawpagerForChangingMfgNm(pageNo, success.page.total_cnt, params.page_limit, $('.pager.mfg_nm_history'), this.fetchMfgNmChangeHistory);
            }
        }, 
        function (error, status) {
            console.error(error);
        }
    )
}

function fetchMfgNmListChanaged(){
    $.getCsrf(API.get_changed_mfg_list, {type: 'C_MFG'},
        function (success, status) {
            if(status === 200){
                let el_factory_hist = $('select[id=mfg_history_select]').empty();
                el_factory_hist.append('<option value="All" selected>전체</option>')
                if(success.length > 0){
                    success.forEach(v => {
                        el_factory_hist.append('<option value="'+v.mfg_nm+'">' + v.mfg_nm + '</option>');
                    })
                }
            }
        }, 
        function (error, status) {
            console.error(error);
        }
    )
}

function fetchSearchProdReview(pageNo, listType){
    let params = getProductSearchingParams(pageNo);

    let limit = $('select#review_limit option:selected').val();
    let type = $('select#review_type option:selected').val();
    let age = $('select#age_select option:selected').val();
    let skin = $('select#skin_select option:selected').val();

    params.cur_page= pageNo,
    params.page_limit= limit
    params.review_type = type; // age or skin
    if(type === 'age'){ 
        params.age = [age]; 
        params.skin = 'all';
    }else{ 
        params.age = 'all';
        params.skin = [skin]; 
    }
    if(!isEmpty(listType)){
        params.listType = listType;
    }
    if(params.site_nm === 'G'){
        startLoader();
        $.getCsrf(API.get_prod_review_list, params,
            function (success, status) {
                if(status === 200){
                    if(listType === 'good'){
                        drawGoodReview(success.goodReviewList, params.page_limit);
                    } else if(listType === 'bad'){
                        drawBadReview(success.badReviewList, params.page_limit);
                    } else {
                        drawGoodReview(success.goodReviewList, params.page_limit);
                        drawBadReview(success.badReviewList, params.page_limit);
                    }   
                }
                stopLoader();
            }, 
            function (error, status) {
                console.error(error);
                stopLoader();
            }
        )
    }
}


function getSearchProdReview(pageNo, listType){ //엑셀 다운로드용 데이터
    let params = getProductSearchingParams(pageNo);
    let type = $('select#review_type option:selected').val();
    let age = $('select#age_select option:selected').val();
    let skin = $('select#skin_select option:selected').val();

    params.review_type = type; // age or skin
    if(type === 'age'){ params.age = [age]; }else{ params.skin = [skin]; }

    params.cur_page=1;
    params.page_limit=50
    if(params.site_nm === 'G'){
        $.getCsrf(API.get_prod_review_list, params,
            function (success, status) {
                if(status === 200){      
                    ProdReviewInfo = {goodReviewList:success.goodReviewList, 
                    badReviewList:success.badReviewList}
                }
            }, 
            function (error, status) {
                console.error(error);
            }
        )
    }
}

function fetchSearchProdReviewGood(selected_page){
    if(selected_page > 0) fetchSearchProdReview(selected_page, 'good')
}
function fetchSearchProdReviewBad(selected_page){
    if(selected_page > 0) fetchSearchProdReview(selected_page, 'bad')
}

function _updateChangeMfgNm(type){
    
    let mfg_nm_changed = type === 'P' ? $('.list01.prod_list input[name=manufacturer]').val() : $('.list01.hist input[name=manufacturer]').val();
    if(type === 'M' && mfg_nm_changed.trim().length === 0 /* 공백인 경우 삭제 */){
        deleteChangedMfgNm(type);
    }else{
        if(mfg_nm_changed.trim().length === 0) alert('제조사명을 입력해주세요.')
        updateChangeMfgNm(type);
    }
}

function updateChangeMfgNm(type){
    let params = getChangeMfgParams(type);
    $.postCsrf(API.update_mfg_nm, params,
        function (success, status) {
            if (status === 200) {
                if(type === 'P'){
                    $($('tbody#prod_list_tbody').children()[selectedIdx]).find('td.mfg_nm').text(params.mfg_nm_changed);
                } else {
                    $($('tbody#mfg_nm_change_history').children()[selectedIdx]).find('td.mfg_nm').text(params.mfg_nm_changed);
                }
                $(".cancelBtn").trigger('click');
            }
        },
        function (error, status) {
            console.error(error);
        })
}

function deleteChangedMfgNm(type){
    let params = getChangeMfgParams(type);
    params.type = 'DEL';
    $.postCsrf(API.update_mfg_nm, params,
        function (success, status) {
            if (status === 200) {
                alert('삭제되었습니다.')
                $(".cancelBtn").trigger('click');
                fetchMfgNmListChanaged();
                fetchMfgNmChangeHistory(1);
            }
        },
        function (error, status) {
            console.error(error);
        })
}

function getChangeMfgParams(type){
    let site_nm = $('select#site_nm option:selected').val();
    let mfg_nm = $('.list01.prod_list input[name=manufacturer]').val();
    let mfg_nm_hist = $('.list01.hist input[name=manufacturer]').val();

    return {
        site_nm: type === 'P' ? site_nm : selectedProdMfg.site_nm,
        prod_id: type === 'P' ? selectedProd.prod_id : selectedProdMfg.prod_id,
        prod_nm: type === 'P' ? selectedProd.prod_nm : selectedProdMfg.prod_nm,
        mfg_nm: type === 'P' ? selectedProd.mfg_nm : selectedProdMfg.mfg_nm,
        mfg_nm_changed: type === 'P' ? mfg_nm : mfg_nm_hist,
        type: 'U_HIST'
    }
}

function fetchStopword(pageNo){

    let params = getStopwordParams(pageNo);
    $.getCsrf(API.get_stopword_list, params,
        function (success, status) {
            if(status === 200){
                drawStopwordList(success.data);
                drawpagerForStopword(pageNo, success.page.total_cnt, params.page_limit, $('.pager.stopword'), this.fetchStopword);
            }
        }, 
        function (error, status) {
            console.error(error);
        }
    )
}

function addStopword(){
    let params = getAddStopwordParams();
    $.postCsrf(API.add_stopword, params,
        function (success, status) {
            if (status === 200) {
                fetchStopword(1);
            }
        },
        function (error, status) {
            console.error(error);
        })
}

function deleteStopword(key){
    deleteModal.addClass('active');
    $('.delete_modal').find('strong').text('\''+key+'\' ')
}
function runDeleteStopword(){
    deleteModal.removeClass('active');
    let word = $('.delete_modal').find('strong').text().replace(/[']/g, '');
    $.postCsrf(API.del_stopword, {keyword: word, type: 'DEL'},
        function (success, status) {
            if (status === 200) {
                fetchStopword(1);
            }
        },
        function (error, status) {
            console.error(error);
        })
}


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

let el_form_mfg = '<form class="flex">';
    el_form_mfg += '<input type="text" name="manufacturer" placeholder="제조사 입력">';
    el_form_mfg += '<input type="submit" class="saveBtn" value="저장" onclick="_updateChangeMfgNm(\'P\')">';
    el_form_mfg += '<span class="cancelBtn">취소</span>';
    el_form_mfg += '</form>';

function drawProdList(_data){
    let el_prod_talbe_list = $('.list01.prod_list').empty();
    let el_prod_list = '';
    let site_nm = $('select#site_nm option:selected').val();
    let el_table = '<table id="prod_list_table" class="'+(site_nm === 'G'?'glowpick':'style01')+' tablesorter">'
        el_table += '<thead id="prod_thead">'
        el_table += '$head'
        el_table += '</thead>'
        el_table += '<tbody id="prod_list_tbody">'
        el_table += '$body'
        el_table += '</tbody>'
        el_table += '</table>'

    $('.search_results').css('display', 'block');
    if(site_nm === 'G'){
        el_table = el_table.replace('$head', '<tr><th>체크박스</th><th>AIS</th><th>순위</th><th>제품사진</th><th>제품명</th><th>브랜드</th><th>가격</th><th>평점</th><th>제품등록일</th><th>제품링크</th></tr>');
        if(_data.length > 0){
            for(let i=0; i < _data.length; i++){
                let d = _data[i];
                let el_prod = '<tr '+(d.comparable_yn === 'N'? "class=\"disabled\"" : '' )+'>';
                el_prod += '<td class="t-check">';
                el_prod += '<input type ="checkbox" id ="check'+pad(i+1)+'" onclick="prodCheckboxClick(this)" '+((d.comparable_yn === 'N' || prodComparison.length > 1)? "disabled" : '' )+'>';
                el_prod += '<label for="check'+pad(i+1)+'"></label>';
                el_prod += '</td>';
                el_prod += '<td>'+(d.ais === null ? '-':d.ais)+'</td>';
                el_prod += '<td class="ranking"><span>' + (d.prod_rank === null ? '-' : d.prod_rank) + '</span><span>('+d.created_at+')</span></td>';
                el_prod += '<td class="img">';
                el_prod += '<img src="'+d.prod_img+'" alt="상품 이미지" onerror="this.src=\'main_page\static\image\no_img_s.svg\'"/>';
                el_prod += '</td>';
                el_prod += '<td onclick="goProductDetail('+i+')" class="product_name">'+d.prod_nm+'</td>';
                el_prod += '<td >'+(d.brand_nm === null ? '-' : d.brand_nm)+'</td>';
                el_prod += '<td>'+(d.prod_price === null ? '-' :converNumberWithComma(d.prod_price))+'</td>';
                el_prod += '<td>'+(d.prod_grade === null ? '-' :d.prod_grade)+'</td>';
                el_prod += '<td>'+(d.reg_date === null ? '-' : d.reg_date)+'</td>';
                el_prod += '<td><button '+((d.prod_link === null) ? 'disabled': ' onclick="goProductLink(\''+d.prod_link+'\')" ')+'>바로가기</button></td>';
                el_prod += '</tr>';
    
                el_prod_list+=el_prod;
            }
            el_table = el_table.replace('$body', el_prod_list);
        }
    } else {

        $('.search_results02').css('display', 'none');
        el_table = el_table.replace('$head', '<tr><th>체크박스</th><th>AIS</th><th>순위</th><th>제품사진</th><th>제품명</th><th>판매처</th><th>*제조사</th><th>브랜드</th><th>가격</th><th>평점</th><th>제품등록일</th><th>제품링크</th></tr>')
        if(_data.length > 0){
            for(let i=0; i < _data.length; i++){
                let d = _data[i];
                let el_prod = '<tr '+(d.comparable_yn === 'N'? "class=\"disabled\"" : '' )+'>';
                el_prod += '<td class="t-check">';
                el_prod += '<input type ="checkbox" id ="check'+pad(i+1)+'" onclick="prodCheckboxClick(this)" '+((d.comparable_yn === 'N' || prodComparison.length > 1)? "disabled" : '' )+'>';
                el_prod += '<label for="check'+pad(i+1)+'"></label>';
                el_prod += '</td>';
                el_prod += '<td>'+(d.ais === null ? '-':d.ais)+'</td>';
                el_prod += '<td class="ranking"><span>' + (d.prod_rank === null ? '-' : d.prod_rank) + '</span><span>('+d.created_at+')</span></td>';
                el_prod += '<td class="img">';
                el_prod += '<img src="'+d.prod_img+'" alt="상품 이미지" onerror="this.src=\'main_page\static\image\no_img_s.svg\'"/>';
                el_prod += '</td>';
                el_prod += '<td onclick="goProductDetail('+i+')" class="product_name">'+d.prod_nm+'</td>';
                el_prod += '<td>'+(d.vendor_nm === null ? '-' : d.vendor_nm)+'</td>'
                el_prod += '<td ondblclick="dblClickMfgName(this, \'P\')" class="mfg_nm">'+(d.mfg_nm === null ? '-': d.mfg_nm)+'</td>'
                el_prod += '<td >'+(d.brand_nm === null ? '-' : d.brand_nm)+'</td>';
                el_prod += '<td>'+(d.prod_price === null ? '-' :converNumberWithComma(d.prod_price))+'</td>';
                el_prod += '<td>'+(d.prod_grade === null ? '-' :d.prod_grade)+'</td>';
                el_prod += '<td>'+(d.reg_date === null ? '-' : d.reg_date)+'</td>';
                el_prod += '<td><button '+((d.prod_link === null) ? 'disabled': ' onclick="goProductLink(\''+d.prod_link+'\')" ')+'>바로가기</button></td>';
                el_prod += '</tr>';
    
                el_prod_list+=el_prod;
            }
            el_table = el_table.replace('$body', el_prod_list);
        }
    }
    el_prod_talbe_list.append(el_table);
    el_prod_talbe_list.append(el_form_mfg);
    drawSelectedComparisonProd();
    initTableSorter();
}

function drawSelectedComparisonProd(){
    prodComparison.forEach(p => {
        if(p.page === prodCurPage){
            $($(".t-check").find('input[type="checkBox"]')[p.position]).prop('checked', true);
            $($(".t-check").find('input[type="checkBox"]')[p.position]).attr('disabled', false);
            $($(".t-check").find('input[type="checkBox"]')[p.position]).parent().parent().find('td').css('background-color', '#F4F4F4');
        }
    })
}

function drawStopwordList(_data){
    $('input[name=stopword]').val('');
    $('input[name=stopword_comment]').val('');

    let el_stopword_list = $('tbody[id=stopword_tbody]').empty();
    if(_data.length > 0){
        _data.forEach((d) => {
            let el_stopword = '<tr style="display: inline-flex">';
            el_stopword += '<td title="stopword">'+d.KEY_WORD+'</td>';
            el_stopword += '<td class="left" title="comment">'+d.REMARK+'</td>';
            el_stopword += '<td title="reg_user">'+d.ISRT_USER+'</td>';
            el_stopword += '<td title="date">'+d.ISRT_DTTM+'</td>';
            el_stopword += '<td><span class="stopW_Delete" onclick="deleteStopword(\''+d.KEY_WORD+'\')">삭제</span></td>';
            el_stopword += '</tr>';    
            el_stopword_list.append(el_stopword);
        })
    }
}

function drawMfgNmChangeList(_data){
    let el_mfg_history = $('tbody[id=mfg_nm_change_history').empty();

    if(_data.length > 0){
        _data.forEach((d) => {
            let el_mfg = '<tr>';
            el_mfg += '<td title="id">'+d.prod_id+'</td>';
            el_mfg += '<td class="left" title="prod_nm">'+d.prod_nm+'</td>';
            el_mfg += '<td title="mfg_nm">'+d.mfg_nm+'</td>';
            el_mfg += '<td ondblclick="dblClickMfgName(this, \'M\')" class="mfg_nm">'+d.mfg_nm_changed+'</td>';
            el_mfg += '<td title="date">'+d.modified_at+'</td>';
            el_mfg += '</tr>';
    
            el_mfg_history.append(el_mfg);
        })
    }
}


function drawProdChartList(data, p){
    let site_nm = $('select#site_nm option:selected').val();
    if(site_nm === 'G'){
        $('.chart_wrap').empty();
        $($('.chart_wrap')[0]).append('<canvas id="age_doughnut"></canvas>');
        $($('.chart_wrap')[1]).append('<canvas id="gender_doughnut"></canvas>');
        $($('.chart_wrap')[2]).append('<canvas id="skin_doughnut"></canvas>');
        $('.search_results02').css('display', 'block');

        let ageTotal
        let temp = data.ageChart.recordset.map((item)=>{
            if(item.ageType==='10'||
            item.ageType==='20'||
            item.ageType==='30'||
            item.ageType==='40'||
            item.ageType==='50'||
            item.ageType=='60'
            ){
                return {
                    name: item.ageType=='10'?'10대':
                        item.ageType==='20'?'20대':
                        item.ageType==='30'?'30대':
                        item.ageType==='40'?'40대':
                        item.ageType==='50'?'50대':'60대',
                    value:item.cnt,
                    no:item.ageType
                }
            }else{
                if(item.ageType=='total'){
                    ageTotal=item.cnt
                }
                return null;
            }            
        })
        temp = temp.filter((item)=>item!==null);
        temp = temp.sort(function(a, b){
                return Number(a.no)-Number(b.no);
            });
        

        let genderTotal
        let temp2 = data.genderChart.recordset.map((item)=>{
            if(item.sexType==='F'||
                item.sexType==='M'
                ){
                return {
                    name: item.sexType=='F'?'여성':'남성',
                    value: item.cnt,
                    no : item.sexType=='F'?2:1
                }
            }else{
                if(item.sexType=='total'){
                    genderTotal=item.cnt
                }
                return null;
            }
        })
        temp2 = temp2.filter((item)=>item!==null);
        temp2 = temp2.sort(function(a, b) {
            return a.no-b.no;
        });

        let skinTotal
        let temp3 = data.skinChart.recordset.map((item)=>{
            if(item.skinType==='건성'||
            item.skinType==='민감성'||
            item.skinType==='복합성'||
            item.skinType==='중성'||
            item.skinType==='지성'
            ){
                return {
                    name: item.skinType,
                    value:item.cnt,
                    no : item.skinType==='복합성'?1:
                        item.skinType==='민감성'?2:
                        item.skinType==='건성'?3:
                        item.skinType==='중성'?4:5
                }
            }else{
                if(item.skinType=='total'){
                    skinTotal=item.cnt
                }
                return null;
            }            
        })
        temp3 = temp3.filter((item)=>item!==null);
        temp3 = temp3.sort(function(a, b) {
            return a.no-b.no;
        });
        ProdChartInfo = {
            ageChart : temp,
            genderChart : temp2,
            skinChart : temp3,
            ageTotal, genderTotal, skinTotal
        }

        drawLegend(ProdChartInfo.ageChart, $('.legend.age ul'));
        drawLegend(ProdChartInfo.genderChart, $('.legend.gender ul'));
        drawLegend(ProdChartInfo.skinChart , $('.legend.skin ul'));

        drawDounutChart('연령별', $('#age_doughnut'), temp, ['#25287F', '#65AE55', '#7C368E', '#849AF9', '#FFA800', '#EBB8A7']);
        drawDounutChart('성별', $('#gender_doughnut'), temp2, temp2.length > 1 ? ['#25287F', '#EC6870'] : (temp2[0].name == '남성' ? ['#25287F'] : ['#EC6870']));
        drawDounutChart('피부타입별', $('#skin_doughnut'), temp3, ['#25287F', '#65AE55', '#7C368E', '#849AF9', '#FFA800']);

        let period = '';
        let date = new Date(), lastDate = new Date();
        if(p.period == '3M'){
            lastDate.setMonth(date.getMonth() -3)
            period = $.format.date(date, 'yyyy-MM-dd') + ' ~ ' + $.format.date(lastDate, 'yyyy-MM-dd')
        }else if(p.period == '1Y'){
            lastDate.setFullYear(date.getFullYear() -1)
            period = $.format.date(date, 'yyyy-MM-dd') + ' ~ ' + $.format.date(lastDate, 'yyyy-MM-dd')
        }else{
            if(p.period_type == 'Direct'){
                period = p.period.replace(/[-]/g, '~').replace(/\//g, '-');
            }
        }
        
        $('.info.date').text(period)
    }
}

function drawLegend(_data, element){
    let el_legend = $(element).empty();

    for(let i=0; i<_data.length; i++){
        if(_data[i].name==='남성'){
            el_legend.append('<li><span style="background: #25287F;"></span>'+_data[i].name+'</li>');
        }else if(_data[i].name==='여성'){
            el_legend.append('<li><span style="background: #EC6870;"></span>'+_data[i].name+'</li>');
        }else{
            el_legend.append('<li><span class="bgColor'+(i < 9 ? '0'+(i+1) : i+1)+'"></span>'+_data[i].name+'</li>');        
        }        
    }
    
}

function drawGoodReview(good, page_limit){

    let type = $('select#review_type option:selected').val();
    let data = good.data;
    let page = good.page;
    let el_good_review = $('tbody#po_review').empty();
    for(let i=0;i<data.length;i++){
        let el_good = '<tr>'
        el_good += '<td title="01">'+((i+1)+((page.cur_page-1)*page_limit))+'</td>'
        if(type === 'age'){
            $('table.review_table').children('thead').children('tr').children('th').eq(1).text('연령')
            $('table.review_table').children('thead').children('tr').children('th').eq(5).text('연령')
            el_good += '<td title="">'+(Math.floor(data[i].REVIEW_AGE / 10)) * 10+'대</td>'
        }else{
            $('table.review_table').children('thead').children('tr').children('th').eq(1).text('피부타입')
            $('table.review_table').children('thead').children('tr').children('th').eq(5).text('피부타입')
            el_good += '<td title="">'+data[i].REVIEW_SKIN_TYPE+'</td>'
        }
        el_good += '<td class="left" title="">'+data[i].REVIEW+'</td>'
        el_good += '<td title="">'+data[i].REG_DTTM+'</td>'
        el_good += '</tr>'

        el_good_review.append(el_good);
    }

    darwpagerForPoReview(page.cur_page, page.total_cnt, page_limit, $('.pager.good_review'), this.fetchSearchProdReviewGood);
}

function drawBadReview(bad, page_limit){

    let type = $('select#review_type option:selected').val();
    let data = bad.data;
    let page = bad.page;
    let el_bad_review = $('tbody#ne_review').empty();
    for(let i=0;i<data.length;i++){
        let el_bad = '<tr>'
        el_bad += '<td title="01">'+((i+1)+((page.cur_page-1)*page_limit))+'</td>'
        if(type === 'age'){
            $('table.review_table').children('thead').children('tr').children('th').eq(1).text('연령')
            $('table.review_table').children('thead').children('tr').children('th').eq(5).text('연령')
            el_bad += '<td title="">'+(Math.floor(data[i].REVIEW_AGE / 10)) * 10+'대</td>'
        }else{
            $('table.review_table').children('thead').children('tr').children('th').eq(1).text('피부')
            $('table.review_table').children('thead').children('tr').children('th').eq(5).text('피부')
            el_bad += '<td title="">'+data[i].REVIEW_SKIN_TYPE+'</td>'
        }
        el_bad += '<td class="left" title="">'+data[i].REVIEW+'</td>'
        el_bad += '<td title="">'+data[i].REG_DTTM+'</td>'
        el_bad += '</tr>'

        el_bad_review.append(el_bad);
    }

    drawpagerForNeReview(page.cur_page, page.total_cnt, page_limit, $('.pager.bad_review'), this.fetchSearchProdReviewBad);
}
/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

// 숫자 앞에 0 추가
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

//검색어 추가
function AddKeyword() {
    
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
        keywordGroup += '<select id="seach_condition">';
        if(rows > 0) {
            keywordGroup += '<option value="all">검색조건선택</option>';
            keywordGroup += '<option value="P" selected>상품명</option>';
        } else {
            keywordGroup += '<option value="all" selected>검색조건선택</option>';
            keywordGroup += '<option value="P">상품명</option>';
        }        
        keywordGroup += '<option value="B">브랜드</option>';
        keywordGroup += '<option value="M">제조사</option>';
        keywordGroup += '<option value="F">기능</option>';
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
