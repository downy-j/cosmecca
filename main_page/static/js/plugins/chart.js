
//랜덤 색상
var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};



function drawDounutChart(mainTitle, element, obj, color){//원형 차트
	let labels = [];
	let datas = [];
	let totalVal = 0;
	for(let temp of obj){
		labels.push(temp.name);
		datas.push(temp.value);
		totalVal+=temp.value;
	}
	totalVal = converNumberWithComma(totalVal) + ' 명 Total';

	if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                data: datas,
                borderWidth: 0,
                backgroundColor: color,
                cutout: '70%',
                label: mainTitle,
                }
            ]
        };
        var Optipn = {
            animateRotate: true,
            animation: {
                duration: 1800,
            },  
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        };

        
        var doughnut01 = document.getElementById($(element).attr('id')).getContext("2d");
        var ageDoughnut01 = new Chart(doughnut01, {
            type: "doughnut",
            data: Data,
            options: Optipn,
            plugins: [
                {
                    id: 'text',
                    beforeDraw: function(chart, a, b) {
                        var width = chart.width,
                            height = chart.height,
                            ctx = chart.ctx;
                    
                        ctx.restore();
                        ctx.font = 12 + "px Noto Sans KR";
                        ctx.fillStyle = "#505D6F"
                        ctx.textBaseline = "middle";
                    
                        var lineHeight = 20;
                        var text = totalVal;
                        var words = text.split(' ');
                        var line = '';
                        var centerX = Math.round((width - ctx.measureText(text).width) / 2);
                        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                        centerY -= (lineHeight / 2);

                        for (var n = 0; n < words.length; n++) {
                            var line =  words[n];

                            if(n === 1){
                                ctx.font = 12 + "px Noto Sans KR";
                                ctx.fillStyle = "#505D6F"
                                ctx.fillText(line, centerX + 38, centerY + 0);
                                centerY += lineHeight;

                            }else if(n === 2){
                                ctx.font = 10 + "px Noto Sans KR";
                                ctx.fillStyle = "#9D9EA2"
                                centerX = Math.round((width - ctx.measureText(line).width) / 2);
                                ctx.fillText(line, centerX, centerY);

                            }else{
                                centerX = Math.round((width - ctx.measureText(line).width) / 2);
                                ctx.fillText(line, centerX - 8, centerY);
                                
                            }
                        }
                        ctx.save();
                    }
                },
            ]
        });
    }
}

function drawBarchartParallel(labels, element, obj, datasets){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: obj === null ? datasets : [{
                    data: obj[0].value,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: obj[0].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[2].value,
                    backgroundColor: 'rgba(194, 194, 194, 1)',
                    label: obj[2].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[1].value,
                    backgroundColor: 'rgba(236, 104, 112, 1)',
                    label: obj[1].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            animation: true,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var  Bar01 = document.getElementById($(element).attr('id')).getContext("2d");
        var PoNegativedBar01 = new Chart(Bar01, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawBarChartStack(labels, element, obj, datasets){ // Bar차트 스텍, 바 너비 비율에 따라 바뀜

    if (element.length) {
        var Data = {
            labels: labels,
            datasets: obj === null ? datasets : [{
                    data: obj[0].value,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: obj[0].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[2].value,
                    backgroundColor: 'rgba(194, 194, 194, 1)',
                    label: obj[2].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[1].value,
                    backgroundColor: 'rgba(236, 104, 112, 1)',
                    label: obj[1].title,
                    barPercentage:0.5,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            animation: true,
            scales: {
                x: {
                    stacked: true,
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            size: 12,
                        },
                    }
                },
                y: {
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            size: 10,
                        },
                        stepSize: 20
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var  Bar01 = document.getElementById($(element).attr('id')).getContext("2d");
        var PoNegativedBar01 = new Chart(Bar01, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawBarChartStackWidthFix(labels, element, obj, datasets){ // Bar차트 스텍, 바 너비 고정

    if (element.length) {
        var Data = {
            labels: labels,
            datasets: obj === null ? datasets : [{
                    data: obj[0].value,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: obj[0].title,
                    barThickness: 20,
                    borderRadius: 3,
                },{
                    data: obj[2].value,
                    backgroundColor: 'rgba(194, 194, 194, 1)',
                    label: obj[2].title,
                    barThickness: 20,
                    borderRadius: 3,
                },{
                    data: obj[1].value,
                    backgroundColor: 'rgba(236, 104, 112, 1)',
                    label: obj[1].title,
                    barThickness: 20,
                    borderRadius: 3,
                }
            ]
        };
        var Optipn = {
            animation: true,
            scales: {
                
                x: {
                    stacked: true,
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            size: 12,
                        },
                    }
                },
                y: {
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            size: 10,
                        },
                        stepSize: 20
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var  Bar01_1 = document.getElementById($(element).attr('id')).getContext("2d");
        var PoNegativedBar01_1 = new Chart(Bar01_1, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}


function drawBarchart(labels, element, obj, callback){
    let lastClick = 0;
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    barThickness: 20,
                    borderRadius: 3,
                }
            ]
        };
        var Optipn = {
            animation: true,
            scales: {
                
                x: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            size: 12,
                        },
                    }
                },
                y: {
                    suggestedMin: 0,
                    suggestedMax: 6,
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            size: 10,
                        },
                        stepSize: 2
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            onClick : function(mouseEvent,chart){
                let thisClick = Date.now();
                if (thisClick - lastClick < 300) {
                  if(callback) callback(labels[chart[0].index])
                  return;
                }
                lastClick = thisClick;
             }
        };
        
        var Bar02 = document.getElementById($(element).attr('id')).getContext("2d");
        var keywordBar01 = new Chart(Bar02, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawComparisonBarchart(labels, element, obj){

    if ($(element).length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj[0].value,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    barThickness: 22,
                    borderRadius: 5,
                    label: obj[0].name,
                    borderColor: '#FFF',
                    borderWidth: 3,
                },{
                    data: obj[1].value,
                    backgroundColor: "rgba(101, 174, 85, 1)",
                    barThickness: 22,
                    borderRadius: 5,
                    label: obj[1].name,
                    borderColor: '#FFF',
                    borderWidth: 3,
                }
            ]
        };
        var Optipn = {
            animation: true,
            scales: {
                
                x: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            size: 12,
                        },
                    }
                },
                y: {
                    suggestedMin: 0,
                    suggestedMax: 6,
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            size: 10,
                        },
                        stepSize: 2
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 7,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var Bar03 = document.getElementById($(element).attr('id')).getContext("2d");
        var comparisonBar01 = new Chart(Bar03, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawHBarChartLeftStack(labels, element, obj, maxlange){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj[0],
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: "긍정",
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[2],
                    backgroundColor: 'rgba(194, 194, 194, 1)',
                    label: "중립",
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[1],
                    backgroundColor: 'rgba(236, 104, 112, 1)',
                    label: "부정",
                    barPercentage:0.5,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            indexAxis: 'y',
            
            animation: true,
            scales: {
                
                x: {
                    reverse: true,
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: maxlange,
                    grid:{
                        display:false
                    },
                    ticks: {
                        maxTicksLimit: 11,
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 12,
                        },
                        stepSize: 10,
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                            weight: 500,
                        },
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            }
        };
        
        var  HorizontalBar01 = document.getElementById($(element).attr('id')).getContext("2d");
        var P_N_HorizontalBar01 = new Chart(HorizontalBar01, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawHBarChartRightStack(labels, element, obj, maxlange){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj[0],
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: "긍정",
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[2],
                    backgroundColor: 'rgba(194, 194, 194, 1)',
                    label: "중립",
                    barPercentage:0.5,
                    borderRadius: 2,
                },{
                    data: obj[1],
                    backgroundColor: 'rgba(236, 104, 112, 1)',
                    label: "부정",
                    barPercentage:0.5,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            indexAxis: 'y',
            animation: true,
            scales: {
                x: {
                    stacked: true,
                    grid:{
                        display:false
                    },
                    suggestedMin: 0,
                    suggestedMax: maxlange,
                    ticks: {
                        maxTicksLimit: 11,
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 12,
                        },
                        stepSize: 10
                    }
                },
                y: {
                    stacked: true,
                    position: 'right',
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                            weight: 500,
                        },
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            }
        };
        
        var  HorizontalBar02 = document.getElementById($(element).attr('id')).getContext("2d");
        var P_N_HorizontalBar02 = new Chart(HorizontalBar02, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawHBarChartLeft(labels, element, obj, name, maxlange){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj,
                    backgroundColor: "rgba(37, 40, 127, 1)",
                    label: name,
                    barPercentage:0.35,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            indexAxis: 'y',
            animation: true,
            scales: {
                x: {
                    reverse: true,
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: maxlange,
                    grid:{
                        display:false
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 0,
                        minRotation: 0,
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                        },
                    stepSize: 10
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                            weight: 500,
                        },
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var HorizontalBar03 = document.getElementById($(element).attr('id')).getContext("2d");
        var AgeHorizontalBar01 = new Chart(HorizontalBar03, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawHBarChartRight(labels, element, obj, name, maxlange){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj,
                    backgroundColor: "rgba(101, 174, 85, 1)",
                    label: name,
                    barPercentage:0.35,
                    borderRadius: 2,
                }
            ]
        };
        var Optipn = {
            indexAxis: 'y',
            animation: true,
            scales: {
                x: {
                    stacked: true,
                    grid:{
                        display:false
                    },
                    suggestedMin: 0,
                    suggestedMax: maxlange,
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 0,
                        minRotation: 0,
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                        },
                        stepSize: 10
                    }
                },
                y: {
                    stacked: true,
                    position: 'right',
                    ticks: {
                        color: 'rgba(22, 22, 22, 1)',
                        font: {
                            family:'Noto Sans KR',
                            size: 10,
                            weight: 500,
                        },
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(22, 22, 22, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
            }
        };
        
        var HorizontalBar04 = document.getElementById($(element).attr('id')).getContext("2d");
        var AgeHorizontalBar02 = new Chart(HorizontalBar04, {
            type: "bar",
            data: Data,
            options: Optipn
        });
    }
}

function drawLineChart(labels, element, obj){
    if (element.length) {
        var Data = {
            labels: labels,
            datasets: [{
                    data: obj.data,
                    borderColor: "rgba(101, 174, 85, 1)",
                    backgroundColor: "rgba(101, 174, 85, 1)",
                    label: obj.title,
                    borderWidth: 2,
                    pointRadius: 0,
                }
            ]
        };

        var Optipn = {
            animation: true,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                
                x: {
                    stacked: true,
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        maxTicksLimit: 12,
                        maxRotation: 0,
                        minRotation: 0,
                        font: {
                            size: 12,
                        },
                    }
                },
                y: {
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: 80,
                    ticks: {
                        color: 'rgba(146, 149, 158, 1)',
                        font: {
                            size: 10,
                        },
                          stepSize: 20,
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'rgba(33, 37, 39, 1)',
                        boxWidth: 18,
                        boxHeight: 5,
                        padding: 18,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                        enabled: false,

                        external: function(context) {
                            // Tooltip Element
                            let tooltipEl = document.getElementById('chartjs-tooltip');

                            // Create element on first render
                            if (!tooltipEl) {
                                tooltipEl = document.createElement('div');
                                tooltipEl.id = 'chartjs-tooltip';
                                tooltipEl.innerHTML = '<table style="margin: auto"></table>';
                                document.body.appendChild(tooltipEl);
                                tooltipEl.style.width = "249px";
                                tooltipEl.style.height = "auto";
                                tooltipEl.style.background = '#FFF';
                                tooltipEl.style.border = "1px solid #E4E4E4";
                                tooltipEl.style.borderRadius = '4px';
                                // tooltipEl.style.paddingTop = "6px";
                                tooltipEl.style.paddingBottom = "6px";
                                tooltipEl.style.color = 'rgba(33, 37, 39, 1)';
                                tooltipEl.style.opacity = 1;
                                tooltipEl.style.pointerEvents = 'none';
                                tooltipEl.style.position = 'absolute';
                                tooltipEl.style.transform = 'translate(-50%, 10%)';
                                tooltipEl.style.transition = 'all .1s ease';
                                tooltipEl.style.boxShadow = "0px 0px 6px rgba(0, 0, 0, 0.13)";
                            }

                            // Hide if no tooltip
                            const tooltipModel = context.tooltip;
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = 0;
                                return;
                            }

                            // Set caret Position
                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                            if (tooltipModel.yAlign) {
                                tooltipEl.classList.add(tooltipModel.yAlign);
                            } else {
                                tooltipEl.classList.add('no-transform');
                            }

                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }

                            // Set Text
                            if (tooltipModel.body) {
                                const titleLines = tooltipModel.title || [];
                                const bodyLines = tooltipModel.body.map(getBody);

                                let innerHtml = '<thead>';

                                titleLines.forEach(function(title) {
                                    innerHtml += '<tr><th style= "font-family: Noto Sans KR; width:249px; padding-bottom: 4px; font-weight: 700; font-size:12px; border-bottom:1px solid #E4E4E4; display: block;">' + title + '</th></tr>';
                                });
                                innerHtml += '</thead><tbody>';

                                bodyLines.forEach(function(body, i) {
                                    const colors = tooltipModel.labelColors[i];
                                    let style = 'background:' + colors.backgroundColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-radius: 50%; margin-right: 5px; border-radius: 50%; width: 8px; height: 8px; display: inline-block; font-family: Noto Sans KR;';
                                    const span = '<span style="' + style + '"></span>';
                                    innerHtml += '<tr><td style="padding-top: 5px; font-size:12px">' + span + body + '명' + '</td></tr>';
                                });
                                innerHtml += '</tbody>';

                                let tableRoot = tooltipEl.querySelector('table');
                                tableRoot.innerHTML = innerHtml;
                            }

                            const position = context.chart.canvas.getBoundingClientRect();
                            const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                            // Display, position, and set styles for font
                            tooltipEl.style.opacity = 1;
                            tooltipEl.style.position = 'absolute';
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                            tooltipEl.style.top = position.top + window.pageYOffset + 'px';
                            tooltipEl.style.font = bodyFont.string;
                            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                            tooltipEl.style.pointerEvents = 'none';
                        }
                }
            }
        };

         const tooltipLine = {
            id: 'tooltipLine',
            beforeDraw: chart => {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const ctx = chart.ctx;
                    ctx.save();
                    const activePoint = chart.tooltip._active[0];

                    ctx.beginPath();
                    ctx.setLineDash([6, 3]);
                    ctx.moveTo(activePoint.element.x, chart.chartArea.top);
                    ctx.lineTo(activePoint.element.x, 240);
                    // ctx.lineTo(activePoint.element.x, activePoint.element.y);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#CFCFCF";
                    ctx.stroke();
                    ctx.restore();
                }
            }

        }

        var Line01 = document.getElementById($(element).attr('id')).getContext("2d");
        var clicksLine01 = new Chart(Line01, {
            type: "line",
            data: Data,
            options: Optipn,
                    plugins: [tooltipLine]
        });
    }
}