/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const site = {
    N: 'N',
    C: 'C',
    G: 'G'
}

let SITE_GUBUN = {};
SITE_GUBUN[site.N] = '네이버'; 
SITE_GUBUN[site.C] = '쿠팡';
SITE_GUBUN[site.G] = '글로픽';

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const group = {
    // P01: 'P01',
    P02: 'P02',
    P03: 'P03',
    P04: 'P04',
    P05: 'P05',
    P06: 'P06',
    P07: 'P07',
    P08: 'P08',
    P09: 'P09',
    P10: 'P10',
    P11: 'P11',
    P12: 'P12',
}


let PART_GROUP = {};
PART_GROUP[group.P02] = '남성류';
PART_GROUP[group.P03] = '동물용의약외품';
PART_GROUP[group.P04] = '마스크/팩';
PART_GROUP[group.P05] = '메이크업(립)';
PART_GROUP[group.P06] = '메이크업(아이)';
PART_GROUP[group.P07] = '메이크업(페이스)';
PART_GROUP[group.P08] = '바디케어';
PART_GROUP[group.P09] = '선케어';
PART_GROUP[group.P10] = '스킨케어';
PART_GROUP[group.P11] = '클렌징';
PART_GROUP[group.P12] = '헤어케어';

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const sub = {
    S01: 'S01',
    S02: 'S02',
    S03: 'S03',
    S04: 'S04',
    S05: 'S05',
    S06: 'S06',
    S07: 'S07',
    S08: 'S08',
    S09: 'S09',
    S10: 'S10',
    S11: 'S11',
    S12: 'S12',
    S13: 'S13',
    S14: 'S14',
    S15: 'S15',
    S16: 'S16',
    S17: 'S17',
    S18: 'S18',
    S19: 'S19',
    S20: 'S20',
    S21: 'S21',
    S22: 'S22',
    S23: 'S23',
    S24: 'S24',
    S25: 'S25',
    S26: 'S26',
    S27: 'S27',
    S28: 'S28',
    S29: 'S29',
    S30: 'S30',
    S31: 'S31',
    S32: 'S32',
    S33: 'S33',
    S34: 'S34',
    S35: 'S35',
    S36: 'S36',
    S37: 'S37',
    S38: 'S38',
    S39: 'S39',
    S40: 'S40',
    S41: 'S41',
    S42: 'S42',
    S43: 'S43',
    S44: 'S44',
    S45: 'S45',
    S46: 'S46',
    S47: 'S47',
    S48: 'S48',
    S49: 'S49',
    S50: 'S50',
}

let PART_SUB = {};
PART_SUB[sub.S01] = 'BB크림(CC포함)';
PART_SUB[sub.S02] = '로션/에멀젼';
PART_SUB[sub.S03] = '린스/컨디셔너';
PART_SUB[sub.S04] = '립글로스';
PART_SUB[sub.S05] = '립스틱';
PART_SUB[sub.S06] = '립케어/립밤';
PART_SUB[sub.S07] = '립틴트/라커';
PART_SUB[sub.S08] = '마스카라';
PART_SUB[sub.S09] = '마스크시트/패드';
PART_SUB[sub.S10] = '메이크업';
PART_SUB[sub.S11] = '메이크업픽서';
PART_SUB[sub.S12] = '바디';
PART_SUB[sub.S13] = '바디로션크림';
PART_SUB[sub.S14] = '베이스/프라이머';
PART_SUB[sub.S15] = '블러셔';
PART_SUB[sub.S16] = '샴푸';
PART_SUB[sub.S17] = '선스틱/선밤';
PART_SUB[sub.S18] = '선스프레이';
PART_SUB[sub.S19] = '선에센스/세럼/젤';
PART_SUB[sub.S20] = '선케어';
PART_SUB[sub.S21] = '선쿠션';
PART_SUB[sub.S22] = '선크림';
PART_SUB[sub.S23] = '스킨/토너/미스트';
PART_SUB[sub.S24] = '스킨커버(밥/스틱)';
PART_SUB[sub.S25] = '스킨케어';
PART_SUB[sub.S26] = '아이라이너';
PART_SUB[sub.S27] = '아이브로우';
PART_SUB[sub.S28] = '아이새도우';
PART_SUB[sub.S29] = '아이크림';
PART_SUB[sub.S30] = '아이프라이머';
PART_SUB[sub.S31] = '에센스/세럼';
PART_SUB[sub.S32] = '에센스/토닉';
PART_SUB[sub.S33] = '컨실러';
PART_SUB[sub.S34] = '크림/밤';
PART_SUB[sub.S35] = '클렌져';
PART_SUB[sub.S36] = '클렌져/각질케어/패드';
PART_SUB[sub.S37] = '클렌져/메이크업';
PART_SUB[sub.S38] = '클렌져/페이셜';
PART_SUB[sub.S39] = '클렌징';
PART_SUB[sub.S40] = '트리트먼트/팩';
PART_SUB[sub.S41] = '파우더';
PART_SUB[sub.S42] = '파운데이션/쿠션류';
PART_SUB[sub.S43] = '팩류';
PART_SUB[sub.S44] = '페이스오일';
PART_SUB[sub.S45] = '하이라이터/쉐딩';
PART_SUB[sub.S46] = '핸드/풋크림';
PART_SUB[sub.S47] = '향수/샤워코롱';
PART_SUB[sub.S48] = '헤어';
PART_SUB[sub.S49] = '헤어메이크업';
PART_SUB[sub.S50] = '헤어스타일링';

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const factory = {
    F01: 'F01',
    F02: 'F02',
    F03: 'F03',
    F04: 'F04',
    F05: 'F05',
    F06: 'F06',
    F07: 'F07',
    F08: 'F08',
    F09: 'F09',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    F13: 'F13',
    F14: 'F14',
    F15: 'F15',
    F16: 'F16',
    F17: 'F17',
    F18: 'F18',
    F19: 'F19',
    F20: 'F20',
}

let FACTORY = {}
    FACTORY[factory.F01] = '코스메카코리아';
    FACTORY[factory.F02] = '콜마';
    FACTORY[factory.F03] = '코스맥스';
    FACTORY[factory.F04] = '나우스코';
    FACTORY[factory.F05] = '한국화장품';
    FACTORY[factory.F06] = '코코';
    FACTORY[factory.F07] = '화성화학';
    FACTORY[factory.F08] = '코디';
    FACTORY[factory.F09] = '인터코스';
    FACTORY[factory.F10] = '코스온';
    FACTORY[factory.F11] = '코리아나';
    FACTORY[factory.F12] = 'C&C';
    FACTORY[factory.F13] = 'C&F';
    FACTORY[factory.F14] = '이미인';
    FACTORY[factory.F15] = '제닉';
    FACTORY[factory.F16] = '믹스앤매치';
    FACTORY[factory.F17] = 'LG생활건강';
    FACTORY[factory.F18] = '아모레퍼시픽';
    FACTORY[factory.F19] = '웰코스';
    FACTORY[factory.F20] = '신세계인터코스';

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function getCategoryColor(c_nm){
    let i = Math.floor(Math.random() * 9);

    if(c_nm === '남성류') return manColor[i];
    if(c_nm === '클렌징') return cleansingColor[i];
    if(c_nm === '메이크업(페이스)') return faceColor[i];
    if(c_nm === '바디케어') return bodyColor[i];
    if(c_nm === '스킨케어') return skinColor[i];
    if(c_nm === '헤어케어') return hairColor[i];
    if(c_nm === '마스크/팩') return maskpackColor[i];
    if(c_nm === '선케어') return suncareColor[i];
    if(c_nm === '메이크업(아이)') return eyeColor[i];
    if(c_nm === '메이크업(립)') return lipColor[i];


    i = Math.floor(Math.random() * randomColor.length);
    return randomColor[i];
}

//랜덤컬러 배열
let skinColor = ['#272B75','#343D8B','#3C4797','#4651A2','#4C59AC','#6672B8','#818CC4','#A5ACD5','#C8CCE6'];
let cleansingColor = ['#475F3B','#5A8248','#759559','#87A865','#96B86F','#A4C282','#B4CD97','#C9DBB3','#DDE9D0'];
let maskpackColor = ['#DA8A43','#E6AE53','#EBC35D','#F2DA67','#F3E66A','#F6EB7C','#F8F091','#FBF4AE','#FCF9CE'];
let suncareColor = ['#3E2564','#562F77','#633481','#723B8A','#7D4090','#8F57A0','#A172B0','#BB97C7','#D5C0DD'];
let hairColor = ['#2C37AA','#3949C1','#4154CD','#4A5FDA','#5269E6','#6B81EE','#8899F2','#ACB8F6','#CDD3F9'];
let bodyColor =['#71140C','#861910','#921D12','#9C1F14','#A52416','#B04522','#BB6443','#CE8E74','#E2BAAA'];
let manColor = ['#352315','#43311F','#503D28','#5D4931','#675337','#7E6B53','#968570','#B6A797','#D5C9BD'];
let faceColor = ['#AC2324','#BA272E','#C52A34','#D6343B','#E53F3E','#E14F53','#DA7074','#E5999B','#F6CCD2'];
let eyeColor = ['#292929','#4B4B4B','#6B6B6B','#7F7F7F','#A9A9A9','#C7C7C7','#E9E9E9','#F2F2F2','#F6F6F6'];
let lipColor = ['#7E7423','#9B9B30','#ADB239','#BEC843','#CCD94B','#D3DE60','#DBE579','#E6EC9E','#F0F4C4'];
let animalColor = ['#9B5927','#A86C2D','#B07833','#B78439','#BB8C3E','#C39C4C','#CCAC64','#D8C28C','#E8DBB8'];

let randomColor = ['#272B75','#343D8B','#3C4797','#4651A2','#4C59AC','#6672B8','#818CC4','#A5ACD5','#C8CCE6','#475F3B','#5A8248','#759559','#87A865','#96B86F','#A4C282','#B4CD97','#C9DBB3','#DDE9D0','#DA8A43','#E6AE53','#EBC35D','#F2DA67','#F3E66A','#F6EB7C','#F8F091','#FBF4AE','#FCF9CE','#3E2564','#562F77','#633481','#723B8A','#7D4090','#8F57A0','#A172B0','#BB97C7','#D5C0DD','#2C37AA','#3949C1','#4154CD','#4A5FDA','#5269E6','#6B81EE','#8899F2','#ACB8F6','#CDD3F9','#71140C','#861910','#921D12','#9C1F14','#A52416','#B04522','#BB6443','#CE8E74','#E2BAAA','#352315','#43311F','#503D28','#5D4931','#675337','#7E6B53','#968570','#B6A797','#D5C9BD','#AC2324','#BA272E','#C52A34','#D6343B','#E53F3E','#E14F53','#DA7074','#E5999B','#F6CCD2','#292929','#4B4B4B','#6B6B6B','#7F7F7F','#A9A9A9','#C7C7C7','#E9E9E9','#F2F2F2','#F6F6F6','#7E7423','#9B9B30','#ADB239','#BEC843','#CCD94B','#D3DE60','#DBE579','#E6EC9E','#F0F4C4','#9B5927','#A86C2D','#B07833','#B78439','#BB8C3E','#C39C4C','#CCAC64','#D8C28C','#E8DBB8'];
let ChartColor = ['#25287F', '#65AE55', '#7C368E', '#849AF9', '#FFA800', '#EBB8A7', '#DEE2F3', '#ECEEF2', '#BCC0CC', '#949AAD', '#606781'];

let COLOR = {}
COLOR['skin'] = skinColor;
COLOR['cleansing'] = cleansingColor;
COLOR['maskpack'] = maskpackColor;
COLOR['suncare'] = suncareColor;
COLOR['hair'] = hairColor;
COLOR['body'] = bodyColor;
COLOR['man'] = manColor;
COLOR['face'] = faceColor;
COLOR['eye'] = eyeColor;
COLOR['lip'] = lipColor;
COLOR['animal'] = animalColor;