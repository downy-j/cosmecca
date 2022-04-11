/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

$(function () { 
  
    let prodComparison = JSON.parse(storage.get('comparison'));

    drawProdDetail(prodComparison);
    fetchComparisonProd(prodComparison);
});

let product = [];

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function fetchComparisonProd(data){
    let _data = [];
    data.forEach((p) => {
        startLoader();
        $.getCsrf(API.get_prod_detail, {prod_id: p.prod.prod_id, site_nm: p.prod.site_nm, part_sub_id: p.prod.small_category},
            function (success, status) {
                stopLoader();
                if(status === 200){
                    if(p.prod.prod_nm===data[0].prod.prod_nm){
                        _data.unshift(success);
                    }else{
                        _data.push(success);
                    }
                    if(_data.length>1){
                        parseComparisonData(_data, p);
                    }
                }
            }, 
            function (error, status) {
                stopLoader();
                console.error(error);
            }
        )
    })
}

function parseComparisonData(data, p){
    let site_nm = p.prod.site_nm;

    if(site_nm === 'G'){
        $('.wrap.glowpick').css('display', 'flex');

        drawAgeDiagram(data);
        drawGenderDiagram(data);
        drawSkinDiagram(data);
    } else {
        $('.wrap.glowpick').css('display', 'none');
    }
    drawAttributeDiagram(data);
    drawGradeDiagram(data);
    drawPositiveDiagram(data);
    drawKeywordTop5(data);
    drawPositiveReview(data);
    storage.set('paramData', JSON.stringify(data));
    
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function exportData(_type){   
    let prodComparison = JSON.parse(storage.get('comparison'));     
    
    let prev = [];
    let header = [];
    let fileName = "";
    
    if(_type === 'comparison'){       
        prev = [
            '제품검색 > 제품리스트 > 리뷰비교분석', 
            '제품명:'+`${prodComparison[0].prod.prod_nm}, ${prodComparison[1].prod.prod_nm}`, 
            `제품성분: ,${prodComparison[0].prod.prod_ingredient? prodComparison[0].prod.prod_ingredient.replace(/,/g, " "):""}, ${prodComparison[1].prod.prod_ingredient?prodComparison[1].prod.prod_ingredient.replace(/,/g, " "):""}`
        ]
        fileName = prodComparison[0].prod.prod_nm+'_'+prodComparison[1].prod.prod_nm+'_비교분석';        
        header = [
            'No', '평점', 
            `${prodComparison[0].prod.prod_nm} 분포도`, `${prodComparison[1].prod.prod_nm} 분포도`,
            '속성',
            `${prodComparison[0].prod.prod_nm} 분포도`, `${prodComparison[1].prod.prod_nm} 분포도`, 
            `${prodComparison[0].prod.prod_nm} 속성별 긍정`, `${prodComparison[0].prod.prod_nm} 속성별 부정`, 
            `${prodComparison[1].prod.prod_nm} 속성별 긍정`, `${prodComparison[1].prod.prod_nm} 속성별 부정`, 
            '', 'No',
            `${prodComparison[0].prod.prod_nm} 키워드 Top5`, `${prodComparison[1].prod.prod_nm} 키워드 Top5`, 
            `${prodComparison[0].prod.prod_nm} 긍정리뷰 Top5`, `${prodComparison[1].prod.prod_nm} 긍정리뷰 Top5`, 
            `${prodComparison[0].prod.prod_nm} 부정리뷰 Top5`, `${prodComparison[1].prod.prod_nm} 부정리뷰 Top5`]
            let values = makeDataForExportingCSV();
            exportDataToCSVFile(header, values, prev, fileName);
    }
  
}

function makeDataForExportingCSV(){

    let dataList = JSON.parse(storage.get('paramData'));
    let tempValue = [];
    
    for(data of dataList){
        let temp = {
            sumGrade: 0,
            sumAttr: 0,
            top_k: [],
            sentence: [], 
            poReview: [], 
            neReview: []
        };
        for(let i=0; i<data.grade.length; i++){
            temp.sumGrade += data.grade[i].cnt;
        }    
        for(let i=0; i<data.attr.length; i++){
            temp.sumAttr += data.attr[i].cnt
        }
        for(i in data.top_k[0]){
            temp.top_k.push(data.top_k[0][i]);
        }
        for(i in data.sentence[0]){
            temp.sentence.push(data.sentence[0][i]);
        }
        for(i in data.review[0]){
            temp.poReview.push(data.review[0][i]);
        }
        for(i in data.review[1]){
            temp.neReview.push(data.review[1][i]);
        }     
        tempValue.push(temp);        
    }

    let retValue = [];
    let max= Math.max(5, dataList[0].attr.length, dataList[1].attr.length);
    
    for(let i=0; i<max;i++){ 
        let temp = [];
        temp.push(i+1); 
        if(i<5){
            temp.push(`${i+1}점`);
        }else{
            temp.push("");
        }

        //평점 분포도
        for(d in dataList){
            let gradeScore = dataList[d].grade.find(item => item.grade===i+1);
            if(gradeScore){
                temp.push(`${Number((gradeScore.cnt/tempValue[d].sumGrade)*100).toFixed(2)}%`); 
            }else{
                temp.push("0.00%"); 
            }
        }
       
        //속성 분포도
        temp.push(dataList[0].attr[i].NM);
        temp.push(`${Number((dataList[0].attr[i].cnt/tempValue[0].sumAttr)*100).toFixed(2)}%`); 
        temp.push(`${Number((dataList[1].attr[i].cnt/tempValue[1].sumAttr)*100).toFixed(2)}%`); 

        //속성별 긍정/부정
        temp.push(dataList[0].attr[i].cnt>0? `${Number((dataList[0].attr[i].po/dataList[0].attr[i].cnt)*100).toFixed(2)}%`:"0.00%"); 
        temp.push(dataList[0].attr[i].cnt>0? `${Number((dataList[0].attr[i].ne/dataList[0].attr[i].cnt)*100).toFixed(2)}%`:"0.00%");
        temp.push(dataList[1].attr[i].cnt>0? `${Number((dataList[1].attr[i].po/dataList[1].attr[i].cnt)*100).toFixed(2)}%`:"0.00%"); 
        temp.push(dataList[1].attr[i].cnt>0? `${Number((dataList[1].attr[i].ne/dataList[1].attr[i].cnt)*100).toFixed(2)}%`:"0.00%"); 

        temp.push("");
        temp.push(i+1);

        if(i<5){
            temp.push(tempValue[0].top_k[i]);
            temp.push(tempValue[1].top_k[i]);
            temp.push(tempValue[0].poReview[i+1]);
            temp.push(tempValue[1].poReview[i+1]);
            temp.push(tempValue[0].neReview[i+1]);
            temp.push(tempValue[1].neReview[i+1]);
        }            
        retValue.push(temp);

    } 
    
    return retValue;

}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function drawProdDetail(data){
    for(let i=0; i< data.length; i++){
        let p = data[i].prod;
        $('.product_info .img_wrap.p'+(i+1)+' img').attr("src",p.prod_img);
        $('.product_info .category_info.p'+(i+1)+'').eq(0).find('p').html(p.prod_id);
        $('.product_info .category_info.p'+(i+1)+'').eq(1).find('p').html(p.middle_category === null ? '-':PART_GROUP[p.middle_category]);
        $('.product_info .category_info.p'+(i+1)+'').eq(2).find('p').html(p.small_category === null ? '-':PART_SUB[p.small_category]);
        $('.product_info h3#p'+(i+1)+'').html(p.prod_nm);
        $('.description.p'+(i+1)+'').html(p.prod_detail === null ? '-':p.prod_detail);
        $('.ingredient.p'+(i+1)+'').html(p.prod_ingredient === null ? '-':p.prod_ingredient);

        product.push({name: p.prod_nm});
    }

    drawProductName();
}

function dataComparison(d1, d2, l1, l2){
    for(let i=0; i<l2.length; i++){
        if(l1.indexOf(l2[i]) < 0){
            l1.splice(i, 0, l2[i]);
            if(Array.isArray(d1[0])){
                for(let j=0; j<d1.length; j++){
                    d1[j].splice(i, 0, 0);
                }
            }else{
                d1.splice(i, 0, 0);
            }
        }
    }
    for(let i=0; i<l1.length; i++){
        if(l2.indexOf(l1[i]) < 0){
            l2.splice(i, 0, l1[i]);
            if(Array.isArray(d2[0])){
                for(let j=0; j<d2.length; j++){
                    d2[j].splice(i, 0, 0);
                }
            }else{
                d2.splice(i, 0, 0);
            }
        }
    }
    return {
        l1: l1,
        l2: l2,
        d1: d1,
        d2: d2
    }
}

function drawAgeDiagram(_data){
    let maxlange = 0;
    let data1 = [], data2 = [], label1 = [], label2=[];
    for(let i=0; i<_data.length; i++){
        let v =[], l=[];
        let d = _data[i].age.sort((a, b) => a.ageType - b.ageType);
        for(let j=0; j<d.length; j++){
            if(d[j].ageType !== 'total'){
                l.push(d[j].ageType+'대');
                v.push(d[j].cnt);

                if(maxlange < d[j].cnt){
                    maxlange = d[j].cnt
                }
            }
        }
        if(i===0){
            data1 = v;
            label1 = l;
        } else {
            data2 = v;
            label2 = l;
        }
 
    }

    let rountd100 = Math.round(maxlange / 100) * 100;
    maxlange = maxlange > rountd100 ? rountd100 + 50 : rountd100;

    let temp = dataComparison(data1, data2, label1, label2);
    drawHBarChartLeft(temp.l1, $('#age_mirror01'), temp.d1, product[0].name, maxlange);
    drawHBarChartRight(temp.l2, $('#age_mirror02'), temp.d2, product[1].name, maxlange);
}

function drawGenderDiagram(_data){
    let maxlange = 0;
    let data1 = [], data2 = [], label1 = [], label2=[];
    for(let i=0; i<_data.length; i++){
        let v =[], l=[];
        let d = _data[i].gender;
        for(let j=0; j<d.length; j++){
            if(d[j].sexType !== 'total'){
                l.push(d[j].sexType === 'F' ? '여성':'남성');
                v.push(d[j].cnt);

                if(maxlange < d[j].cnt){
                    maxlange = d[j].cnt
                }
            }
        }
        if(i===0){
            data1 = v;
            label1 = l;
        } else {
            data2 = v;
            label2 = l;
        }
    }

    let rountd100 = Math.round(maxlange / 100) * 100;
    maxlange = maxlange > rountd100 ? rountd100 + 50 : rountd100;

    let temp = dataComparison(data1, data2, label1, label2);
    drawHBarChartLeft(temp.l1, $('#gender_mirror01'), temp.d1, product[0].name, maxlange);
    drawHBarChartRight(temp.l2, $('#gender_mirror02'), temp.d2, product[1].name, maxlange);
}

function drawSkinDiagram(_data){
    let maxlange = 0;
    let data1 = [], data2 = [], label1 = [], label2=[];
    for(let i=0; i<_data.length; i++){
        let v =[], l=[];
        let d = _data[i].skin.sort((a, b) => {
            if(a.skinType < b.skinType) return 1;
            else if(a.skinType > b.skinType) return -1;
            else return 0;
        });
        for(let j=0; j<d.length; j++){
            if(d[j].skinType !== 'total'){
                l.push(d[j].skinType);
                v.push(d[j].cnt);

                if(maxlange < d[j].cnt){
                    maxlange = d[j].cnt
                }
            }
        }
        if(i===0){
            data1 = v;
            label1 = l;
        } else {
            data2 = v;
            label2 = l;
        }

    }

    let rountd100 = Math.round(maxlange / 100) * 100;
    maxlange = maxlange > rountd100 ? rountd100 + 50 : rountd100;

    let temp = dataComparison(data1, data2, label1, label2);
    drawHBarChartLeft(temp.l1, $('#skin_mirror01'), temp.d1, product[0].name, maxlange);
    drawHBarChartRight(temp.l2, $('#skin_mirror02'), temp.d2, product[1].name, maxlange);
}


function drawAttributeDiagram(_data){
    let data = [], label = [];
    for(let i=0; i<_data.length; i++){
        let d = _data[i].attr;
        let temp = [];
        for(let j=0; j<d.length; j++){
            if(i === 0) label.push(d[j].NM);
            temp.push(d[j].cnt);
        }
        data.push({name: product[i].name, value: temp})
    }
    drawComparisonBarchart(label, $('#Po_Negative_bar'), data);
}

function drawGradeDiagram(_data){
    let data = [], label = [];
    for(let i=0; i<_data.length; i++){
        let d = _data[i].grade;
        let temp = [];
        for(let j=0; j<d.length; j++){
            if(i === 0) label.push(d[j].grade);
            temp.push(d[j].cnt);
        }
        data.push({name: product[i].name, value: temp})
    }
    drawComparisonBarchart(label, $('#keyword_bar'), data);
}

function drawPositiveDiagram(_data){
    let attr1 = _data[0].attr, attr2 = _data[1].attr;
    let temp_attr = []
    for(let i=0; i<attr2.length; i++){
        temp_attr = []
        temp_attr = attr1.filter((d) => {
            return d.NM === attr2[i].NM
        })
        if(temp_attr.length === 0){
            attr1.push({NM: attr2[i].NM, cnt:0, po:0, ne:0, neu:0})
        }
    }
    for(let i=0; i<attr1.length; i++){
        temp_attr = []
        temp_attr = attr2.filter((d) => {
            return d.NM === attr1[i].NM
        })
        if(temp_attr.length === 0){
            attr2.push({NM: attr1[i].NM, cnt:0, po:0, ne:0, neu:0})
        }
    }

    let maxlange = 0;
    let attr = [ attr1, attr2 ];
    let data1 = [], data2 = [], label1 = [], label2=[];
    for(let i=0; i<attr.length; i++){
        let _temp = [], temp_po = [], temp_ne = [], temp_neu = [], labels =[];

        let d = attr[i].sort((a, b) => {
            if(a.NM < b.NM) return 1;
            else if(a.NM > b.NM) return -1;
            else return 0;
        });
        for(let j=0; j<d.length; j++){
            labels.push(d[j].NM)
            temp_po.push(d[j].po)
            temp_ne.push(d[j].ne)
            temp_neu.push(d[j].neu)

            if(maxlange < (d[j].po + d[j].ne + d[j].neu)){
                maxlange = (d[j].po + d[j].ne + d[j].neu);
            }
        }
        _temp.push(temp_po)
        _temp.push(temp_ne)
        _temp.push(temp_neu)

        if(i===0){
            data1 = _temp;
            label1 = labels;
        } else {
            data2 = _temp;
            label2 = labels;
        }
    }

    let rountd100 = Math.round(maxlange / 100) * 100;
    maxlange = maxlange > rountd100 ? rountd100 + 50 : rountd100;

    let temp = dataComparison(data1, data2, label1, label2);
    drawHBarChartLeftStack(temp.l1, $('#p_n_mirror01'), temp.d1, maxlange)
    drawHBarChartRightStack(temp.l2, $('#p_n_mirror02'), temp.d2, maxlange)
}

function drawKeywordTop5(_data){
    let value = [];
    for(let i=0; i<_data.length; i++){
        let temp = [], labels =[];
        let count = 1;
        let d = _data[i].top_k[0];
        for(k in d){
            if(count > 5){
                temp.push(d[k]);
            } else {
                labels.push(d[k]);
            }
            count++;
        }
        if(labels.length === 0){
            labels = new Array(5);
            temp = new Array(5);
        }

        value.push({key: labels, value: temp});
    }

    let blue = $('.top_key.blue').empty();
    let green = $('.top_key.green').empty();
    for(let i=0; i<value.length; i++){
        let v = value[i];
        let _el = '';
        for(let j=0; j<v.key.length; j++){
            _el += '<div class="wrap keyword f_b_c"><p><span></span>'+(typeof v.key[j] === 'undefined'?'-':v.key[j])+'</p><p class="percentage"><b>'+(typeof v.value[j] === 'undefined'?'-':v.value[j])+'</b></p></div>'
        }
        if(i === 0) blue.append(_el);
        else green.append(_el);
    }
}

function drawPositiveReview(_data){
    $('#positive_review1').empty();
    $('#positive_review2').empty();
    $('#negative_review1').empty();
    $('#negative_review2').empty();

    
    for(let i=0; i<_data.length; i++){
        let _d = _data[i].review;
        if(_d.length === 0){
            _d.push(new Array(5));
            _d.push(new Array(5));
        } else if(_d.length === 1){
            if(_d[0].positive === 'P'){
                _d.push(new Array(5));
            } else {
                _d.unshift(new Array(5));
            }
        }
        for(let _i=0; _i<_d.length;_i++){
            let d= _d[_i];
            let count = 1;
            let el = '';
            if(Array.isArray(d)){
                for(let l=0; l<d.length; l++){
                    el += '<tr><td>0'+(l+1)+'</td><td title="">-</td></tr>'
                }
            }else{
                for(k in d){
                    if(k !== 'positive'){
                        el += '<tr><td>0'+count+'</td><td title="'+d[k]+'">'+(isEmpty(d[k]) ? '-':d[k])+'</td></tr>'
                        count++;
                    }
                }
            }
            
            if(_i === 0){
                $('#positive_review'+(i+1)).append(el);
            } else {
                $('#negative_review'+(i+1)).append(el);
            }
        }
    }
}


function drawProductName(){
    $($('ul.com_chart li')[0]).text(product[0].name);
    $($('ul.com_chart li')[1]).text(product[1].name);
    $($('p.product_n')[0]).text(product[0].name);
    $($('p.product_n')[1]).text(product[1].name);
    $($('p.product_n')[2]).text(product[0].name);
    $($('p.product_n')[3]).text(product[1].name);
    $($('p.product_n')[4]).text(product[0].name);
    $($('p.product_n')[5]).text(product[1].name);
}

