/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */


function exportDataToCSVFile(header, values, prev, fileName) {
    var csv = ''
    csv=prev.join('\n');
    csv+='\n';
    csv+='\n';
    csv+=header.join(',');
    csv+='\n';

    for(let i=0; i<values.length; i++) {
        csv+=values[i].join(',');
        csv+='\r';
    }

    doExportCSV(csv, fileName);
}

function exportTwoTableDataToCSVFile(table1, table2, prev, fileName) {
    var csv = ''
    csv=prev.join('\n');

    csv+='\n';
    csv+='\n';

    csv+=table1.header.join(',');
    csv+='\n';
    for(let i=0; i<table1.values1.length; i++) {
        csv+=table1.values1[i].join(',');
        csv+='\r';
    }

    csv+='\n';
    csv+='\n'; 

    csv+=table2.header.join(',');
    csv+='\n';
    for(let i=0; i<table2.values2.length; i++) {
        csv+=table2.values2[i].join(',');
        csv+='\r';
    }

    doExportCSV(csv, fileName);
}

/**
 * CSV 파일 출력
 * @param {*} data      array type 으로 0 라인은 header, 이후 라인은 value 
 * @param {*} fn        출력 할 CSV 파일명 - prefix 로 사용
 */
function doExportCSV(data, fn) {
    const fileName = $.format.date(new Date(), 'yyyyMMdd') +'_'+fn+ ".csv";
    var link = document.createElement("a");
    var blob = new Blob(["\uFEFF"+data], {type: 'text/csv', encoding: 'utf8'});
    var url = URL.createObjectURL(blob);
    $(link).attr({"download" : fileName , "href" : url});
    link.click();
    link.remove();
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */