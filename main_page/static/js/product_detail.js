/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

$(function () { 
    $('form').on('submit', (e) => {
        e.preventDefault();
    })

	let p = storage.get('selected_product');
    p = JSON.parse(p);
    
	drawProdDetail(p);
	fetchProductDetail(p);
});

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const dbclickKeyword = function (key){
    $('.stopword').addClass('active');
    fetchStopword(1, key);
}

function changeStopwordSelect(){
    fetchStopword(1);
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function fetchProductDetail(p){
	startLoader();
    $.getCsrf(API.get_prod_detail, {prod_id: p.prod_id, site_nm: p.site_nm, part_sub_id: p.small_category},
        function (success, status) {
            if(status === 200){
                storage.set('paramData', JSON.stringify(success));
                
                stopLoader();
                if(p.site_nm === 'G'){
                    $('.card_wrap').css('display', 'flex');
                    drawAgeDiagram(success.age);
                    drawGenderDiagram(success.gender);
                    drawSkinDiagram(success.skin);
                } else {
                    $('.card_wrap').css('display', 'none');
                }
                
                drawAttributeDiagram(success.attr);
                drawGradeDiagram(success.grade);
                drawPositiveDiagram(success.attr);
                drawKeywordTop5(success.top_k[0]);
                drawKeySentence(success.sentence[0]);
                drawPositiveReview(success.review[0]);
                drawNegativeReview(success.review[1]);
            }
        }, 
        function (error, status) {
            stopLoader();
            console.error(error);
        }
    )
}

async function fetchStopword(pageNo, key){

    let params = getStopwordParams(pageNo);
    $.getCsrf(API.get_stopword_list, params,
        function (success, status) {
            if(status === 200){
                drawStopwordList(success.data, key);
                drawPager(pageNo, success.page.total_cnt, params.page_limit, $('.pager.stopword'), this.fetchStopword);
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

function fetchStopwordWithKeyword(){
    let keyword = $('input[name=keyword_stopword]').val();
    if(issets(keyword)){
        fetchStopword(1);
    } else {
        alert('???????????? ??????????????????.');
    }
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
        alert('????????? ????????? ????????? ??????????????????.')
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function exportData(_type){   
   
    let product = JSON.parse(storage.get('selected_product'));
    let site_nm = product.site_nm;
    let prev = [];
    let header = [];
    let values = [];
    let fileName = "";
    
    if(_type === 'review'){   
        prev = ['???????????? > ??????????????? > ????????????', '?????????:'+product.prod_nm, '????????????: '+product.category_id, `????????????: ,${product.prod_ingredient?product.prod_ingredient.replace(/,/g, " "):""}`]
        fileName = product.prod_nm+'_????????????';        
          
        if(site_nm==='G'){
            header = ['No', '??????', '?????????', '??????', '?????????', '????????????','?????????','??????', '?????????', '??????', '?????????', '????????? ????????????', '????????? ????????????','','No', '????????? Top5', '???????????? Top5', '???????????? Top5', '???????????? Top5'];        
            values = makeDataForExportingCSV(site_nm);            
        }else{
            header = ['No', '??????', '?????????', '??????', '?????????', '????????? ????????????', '????????? ????????????','','No', '????????? Top5', '???????????? Top5', '???????????? Top5', '???????????? Top5'];        
            values = makeDataForExportingCSV(site_nm);
        
        }  
        exportDataToCSVFile(header, values, prev, fileName);      
    }
  
}

function makeDataForExportingCSV(site_nm){

    let data = JSON.parse(storage.get('paramData'));

    let sumGrade=0, sumAttr=0, sumGender=0, sumAge=0, sumSkin=0;
    for(let i=0; i<data.grade.length; i++){
        sumGrade += data.grade[i].cnt;
    }    
    for(let i=0; i<data.attr.length; i++){
        sumAttr += data.attr[i].cnt
    }

    if(site_nm==='G'){
        for(let i=0; i<data.age.length-1; i++){
            sumAge += data.age[i].cnt
        }
        for(let i=0; i<data.gender.length-1; i++){
            sumGender += data.gender[i].cnt;
        }            
        for(let i=0; i<data.skin.length-1; i++){
            sumSkin += data.skin[i].cnt
        }
    }

    let top_k = [], sentence = [], poReview=[], neReview=[];
    for(i in data.top_k[0]){
        top_k.push(data.top_k[0][i]);
    }
    for(i in data.sentence[0]){
        sentence.push(data.sentence[0][i]);
    }
    for(i in data.review[0]){
        poReview.push(data.review[0][i]);
    }
    for(i in data.review[1]){
        neReview.push(data.review[1][i]);
    }
    
    let max=5;
    if(data.attr.length>5){
        max=data.attr.length;
    }
        
    let retValue = [];
    
    for(let i=0; i<max;i++){ 
        let temp = [];
        temp.push(i+1); 
        if(site_nm==='G'){
            temp.push(i<data.gender.length-1? data.gender[i].sexType==="F"?"??????":"??????":"");  
            temp.push(i<data.gender.length-1? `${Number((data.gender[i].cnt/sumGender)*100).toFixed(2)}%`:""); 
        
            temp.push(i<data.age.length-1? data.age[i].ageType:"");  
            temp.push(i<data.age.length-1? `${Number((data.age[i].cnt/sumAge)*100).toFixed(2)}%`:"");                
           
            temp.push(i<data.skin.length-1? data.skin[i].skinType:"");  
            temp.push(i<data.skin.length-1? `${Number((data.skin[i].cnt/sumSkin)*100).toFixed(2)}%`:""); 
        }

        temp.push(data.grade[i]? data.grade[i].grade:"");  
        temp.push(data.grade[i]? `${Number((data.grade[i].cnt/sumGrade)*100).toFixed(2)}%`:""); 
        temp.push(data.attr[i]? data.attr[i].NM:"");
        temp.push(data.attr[i]? `${Number((data.attr[i].cnt/sumAttr)*100).toFixed(2)}%`:""); 
        temp.push(data.attr[i]? `${Number((data.attr[i].po/data.attr[i].cnt)*100).toFixed(2)}%`:""); 
        temp.push(data.attr[i]? `${Number((data.attr[i].ne/data.attr[i].cnt)*100).toFixed(2)}%`:""); 
        temp.push("");
        temp.push(i+1);
        if(i<5){
            temp.push(top_k[i]);
            temp.push(sentence[i]);
            temp.push(poReview[i+1]);
            temp.push(neReview[i+1]);
        }            
        retValue.push(temp);
    } 
    
    return retValue;

}
/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function drawProdDetail(p){

	$('.product_info .img_wrap img').attr("src",p.prod_img);
	$('.product_info .category_info').eq(0).find('p').html(p.prod_id);
	$('.product_info .category_info').eq(1).find('p').html(p.middle_category === null ? '-':PART_GROUP[p.middle_category]);
	$('.product_info .category_info').eq(2).find('p').html(p.small_category === null ? '-':PART_SUB[p.small_category]);
	$('.product_info h3').html(p.prod_nm);
	$('#description').html(p.prod_detail === null ? '-':p.prod_detail);
	$('.ingredient').html(p.prod_ingredient === null ? '-':p.prod_ingredient);
}

function drawAgeDiagram(_data){

    let temp =[], color=[];
    $('.legend.age ul').empty();
    for(let i=0; i<_data.length; i++){
        if(_data[i].ageType !== 'total'){
            temp.push({name: _data[i].ageType+'???', value: _data[i].cnt})
            color.push(ChartColor[i])

            $('.legend.age ul').append('<li><span class="bgColor'+(i < 9 ? '0'+(i+1) : i+1)+'"></span>'+_data[i].ageType+'???'+'</li>')
        }
    }
    drawDounutChart('???????????????', $('#age_pie'), temp, color);
}

function drawGenderDiagram(_data){

    let temp =[], color=[];
    $('.legend.gender ul').empty();
    for(let i=0; i<_data.length; i++){
        if(_data[i].sexType !== 'total'){
            temp.push({name: _data[i].sexType === 'F' ? '??????' : '??????', value: _data[i].cnt})
            color.push(_data[i].sexType=== 'F' ? "#EC6870":"#25287F");
            $('.legend.gender ul').append(`<li><span style="background: ${_data[i].sexType=== 'F' ?"#EC6870;":"#25287F;"}"></span>`+`${_data[i].sexType=== 'F' ? '??????' : '??????'}`+'</li>')
         
        }
    }
    drawDounutChart('???????????????', $('#gender_pie'), temp, color);
}

function drawSkinDiagram(_data){

    let temp =[], color=[];
    $('.legend.skin ul').empty();
    for(let i=0; i<_data.length; i++){
        if(_data[i].skinType !== 'total'){
            temp.push({name: _data[i].skinType , value: _data[i].cnt})
            color.push(ChartColor[i])

            $('.legend.skin ul').append('<li><span class="bgColor'+(i < 9 ? '0'+(i+1) : i+1)+'"></span>'+_data[i].skinType+'</li>')
        }
    }
    drawDounutChart('???????????? ?????????', $('#skin_pie'), temp, color);
}

function drawAttributeDiagram(_data){
    let temp = [], color = [];
    $('.legend.attr ul').empty();
    for(let i=0; i<_data.length; i++){
        temp.push({ name: _data[i].NM, value: _data[i].cnt})
        color.push(ChartColor[i])

        $('.legend.attr ul').append('<li><span class="bgColor'+(i < 9 ? '0'+(i+1) : i+1)+'"></span>'+_data[i].NM+'</li>')
    }
    drawDounutChart('???????????????', $('#feeling_pie'), temp, color);
}

function drawGradeDiagram(_data){
    let temp = [], color = [];
    $('.legend.grade ul').empty();
    for(let i=0; i<_data.length; i++){
        temp.push({ name: _data[i].grade, value: _data[i].cnt})
        color.push(ChartColor[i])

        $('.legend.grade ul').append('<li><span class="bgColor'+(i < 9 ? '0'+(i+1) : i+1)+'"></span>'+_data[i].grade+'???'+'</li>')
    }
    drawDounutChart('???????????????', $('#score_pie'), temp, color);
}

function drawPositiveDiagram(_data){

    let temp = [], temp_po = [], temp_ne = [], temp_neu = [], labels =[];
    for(let i=0; i<_data.length; i++){
        labels.push(_data[i].NM)
        temp_po.push(_data[i].po)
        temp_ne.push(_data[i].ne)
        temp_neu.push(_data[i].neu)
    }

    temp.push({ title: '??????', value: temp_po})
    temp.push({ title: '??????', value: temp_ne})
    temp.push({ title: '??????', value: temp_neu})

    drawBarChartStackWidthFix(labels, $('#Po_Negative_bar'), temp)
}

function drawKeywordTop5(_data){
   
    let temp = [], labels =[];

    let count = 1;
    for(k in _data){
        if(count > 5){
            temp.push(_data[k]);
        } else {
            labels.push(_data[k]);
        }
        count++;
    }

    drawBarchart(labels, $('#keyword_bar'), temp, dbclickKeyword);
}


function drawKeySentence(_data) {
    if (_data) {
        let count = 1;
        $('#key_sentence_tbody').empty();
        for(k in _data){
            if(k !== 'positive'){
                if(count < 6){
                    let el = `<tr><td>0${count}</td><td title="${_data[k]}">${_data[k].length > 0 ? _data[k] : '-'}</td></tr>`
                    $('#key_sentence_tbody').append(el);
                    count++;
                }
            }
        }
    }
}

function drawPositiveReview(_data) {
    if (_data) {
        let count = 1;
        $('#positive_review').empty();
        for(k in _data){
            if (k !== 'positive') {
                if(count < 6){
                    let el = `<tr><td>0${count}</td><td title="${_data[k]}">${_data[k].length > 0 ? _data[k] : '-'}</td></tr>`
                    $('#positive_review').append(el);
                    count++;
                }
            }
        }   
    }
       
}

function drawNegativeReview(_data) {
    if (_data) {
        let count = 1;
        $('#negative_review').empty();
        for(k in _data){
            if(k !== 'positive'){
                if(count < 6){
                    let el = `<tr><td>0${count}</td><td title="${_data[k]}">${_data[k].length > 0 ? _data[k] : '-'}</td></tr>`
                    $('#negative_review').append(el);
                    count++;
                }
            }
        } 
    }

}


function drawStopwordList(_data, key){

    $('input[name=stopword]').val('');
    $('input[name=stopword_comment]').val('');
    if(typeof key !== 'undefined') { $('input[name=stopword]').val(key); }

    let el_stopword_list = $('tbody[id=stopword_tbody]').empty();
    if(_data.length > 0){
        _data.forEach((d) => {
            let el_stopword = '<tr>';
            el_stopword += '<td title="stopword">'+d.KEY_WORD+'</td>';
            el_stopword += '<td class="left" title="comment">'+d.REMARK+'</td>';
            el_stopword += '<td title="reg_user">'+d.ISRT_USER+'</td>';
            el_stopword += '<td title="date">'+d.ISRT_DTTM+'</td>';
            el_stopword += '<td><span class="stopW_Delete" onclick="deleteStopword(\''+d.KEY_WORD+'\')">??????</span></td>';
            el_stopword += '</tr>';    
            el_stopword_list.append(el_stopword);
        })
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

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