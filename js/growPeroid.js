/**
 * Created by Castiel.ZYF on 14-4-20.
 */
function printTable(id){
    var OpenWindow = window.open("");
    OpenWindow.document.write("<html>");
    OpenWindow.document.write("<head>");
    OpenWindow.document.write("<meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/>");
    OpenWindow.document.write("<title>PrintPage<\/title>");
    OpenWindow.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/bootstrap.min.css\">");
    OpenWindow.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\">");
    OpenWindow.document.write("<\/head>");
    OpenWindow.document.write("<body>");
    OpenWindow.document.write("<div id='p'>");
    OpenWindow.document.write("</div>");
    OpenWindow.document.write("<\/>");
    OpenWindow.document.write("<\/body>");
    OpenWindow.document.write("<\/html>");
    OpenWindow.document.getElementById("p").innerHTML=document.getElementById(id).innerHTML;
    OpenWindow.document.close();
    OpenWindow.print();
}
function initI07(json){
    var timeArray=[];
    var min=[];
    var avg=[];
    var max=[];
    var img=[];
    for(var i=0;i<json.length;i++){
        if(json[i]["STAR_DATE"]!=null&&json[i]["END_DATE"]!=null){
            var timeString=json[i]["Z_NAME"]+"："+(json[i]["STAR_DATE"]).slice(5)+"至"+(json[i]["END_DATE"]).slice(5);
            var data=json[i]["ZQ_DATA"].split(",");
            img[i]=json[i]["IMG"];
            if(!isNaN(parseFloat(data[1].slice(9)))){
                timeArray[i]=timeString;
                switch ($("#growPeriodIndex option:selected").attr("id")){
                    case "1":
                        min[i]=parseFloat(data[1].slice(9));
                        max[i]=parseFloat(data[0].slice(9));
                        avg[i]=parseFloat(data[2].slice(9));
                        break;
                    case "2":
                        min[i]=parseFloat(data[4].slice(9));
                        max[i]=parseFloat(data[3].slice(9));
                        avg[i]=parseFloat(data[5].slice(9));
                        break;
                }
            }
        }
    }
    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[0]);
    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[0]);
    switch ($("#growPeriodIndex option:selected").attr("id")){
        case "1":
            createBaseInfo1("生长周期分析基本情况图表(温度)",min,"最低温度均值",avg,"平均温度均值",max,"最高温度均值","温度（℃）",-10,-5,5,13,23,30,35,timeArray,img);
            break;
        case "2":
            createBaseInfo1("生长周期分析基本情况图表(湿度)",min,"最低湿度均值",avg,"平均湿度均值",max,"最高湿度均值","湿度（%）",0,5,15,33,53,60,75,timeArray,img);
            break;
    }
}
function initI02(json){
    var compatible=false;
    var sUserAgent = navigator.userAgent;
    var isOpera = sUserAgent.indexOf("Opera") > -1 ;
    var isIE = sUserAgent.indexOf("compatible") > -1 && sUserAgent.indexOf("MSIE") > -1 && !isOpera;
    if(isIE){
        var ieVersion=parseInt(sUserAgent.substr(sUserAgent.indexOf("MSIE")+5,1));
        if(ieVersion<=8){
            compatible=true;
        }
    }


    $("#period").children().remove();
    for(var i=0;i<5;i++){
        var total = json["sd"][0][i]["SD_01"]+json["sd"][0][i]["SD_02"]+json["sd"][0][i]["SD_03"]+json["sd"][0][i]["SD_04"];
        var data1 = parseInt(json["sd"][0][i]["SD_01"]/total*100);
        var data2 = parseInt(json["sd"][0][i]["SD_02"]/total*100);
        var data3 = parseInt(json["sd"][0][i]["SD_03"]/total*100);
        var data4 = parseInt(json["sd"][0][i]["SD_04"]/total*100);
        var sdAvg = data1.toString()+","+data2.toString()+","+data3.toString()+","+data4.toString();
        var mintotal = json["sd"][0][i]["MIN_SD_01"]+json["sd"][0][i]["MIN_SD_02"]+json["sd"][0][i]["MIN_SD_03"]+json["sd"][0][i]["MIN_SD_04"];
        var mindata1 = parseInt(json["sd"][0][i]["MIN_SD_01"]/mintotal*100);
        var mindata2 = parseInt(json["sd"][0][i]["MIN_SD_02"]/mintotal*100);
        var mindata3 = parseInt(json["sd"][0][i]["MIN_SD_03"]/mintotal*100);
        var mindata4 = parseInt(json["sd"][0][i]["MIN_SD_04"]/mintotal*100);
        var sdMin = mindata1.toString()+","+mindata2.toString()+","+mindata3.toString()+","+mindata4.toString();
        var maxtotal = json["sd"][0][i]["MAX_SD_01"]+json["sd"][0][i]["MAX_SD_02"]+json["sd"][0][i]["MAX_SD_03"]+json["sd"][0][i]["MAX_SD_04"];
        var maxdata1 = parseInt(json["sd"][0][i]["MAX_SD_01"]/maxtotal*100);
        var maxdata2 = parseInt(json["sd"][0][i]["MAX_SD_02"]/maxtotal*100);
        var maxdata3 = parseInt(json["sd"][0][i]["MAX_SD_03"]/maxtotal*100);
        var maxdata4 = parseInt(json["sd"][0][i]["MAX_SD_04"]/maxtotal*100);
        var sdMax = maxdata1.toString()+","+maxdata2.toString()+","+maxdata3.toString()+","+maxdata4.toString();

        var wtotal = json["wd"][0][i]["WD_01"]+json["wd"][0][i]["WD_02"]+json["wd"][0][i]["WD_03"]+json["wd"][0][i]["WD_04"];
        var wdata1 = parseInt(json["wd"][0][i]["WD_01"]/wtotal*100);
        var wdata2 = parseInt(json["wd"][0][i]["WD_02"]/wtotal*100);
        var wdata3 = parseInt(json["wd"][0][i]["WD_03"]/wtotal*100);
        var wdata4 = parseInt(json["wd"][0][i]["WD_04"]/wtotal*100);
        var wdAvg = wdata1.toString()+","+wdata2.toString()+","+wdata3.toString()+","+wdata4.toString();
        var wmintotal = json["wd"][0][i]["MIN_WD_01"]+json["wd"][0][i]["MIN_WD_02"]+json["wd"][0][i]["MIN_WD_03"]+json["wd"][0][i]["MIN_WD_04"];
        var wmindata1 = parseInt(json["wd"][0][i]["MIN_WD_01"]/wmintotal*100);
        var wmindata2 = parseInt(json["wd"][0][i]["MIN_WD_02"]/wmintotal*100);
        var wmindata3 = parseInt(json["wd"][0][i]["MIN_WD_03"]/wmintotal*100);
        var wmindata4 = parseInt(json["wd"][0][i]["MIN_WD_04"]/wmintotal*100);
        var wdMin = wmindata1.toString()+","+wmindata2.toString()+","+wmindata3.toString()+","+wmindata4.toString();
        var wmaxtotal = json["wd"][0][i]["MAX_WD_01"]+json["wd"][0][i]["MAX_WD_02"]+json["wd"][0][i]["MAX_WD_03"]+json["wd"][0][i]["MAX_WD_04"];
        var wmaxdata1 = parseInt(json["wd"][0][i]["MAX_WD_01"]/wmaxtotal*100);
        var wmaxdata2 = parseInt(json["wd"][0][i]["MAX_WD_02"]/wmaxtotal*100);
        var wmaxdata3 = parseInt(json["wd"][0][i]["MAX_WD_03"]/wmaxtotal*100);
        var wmaxdata4 = parseInt(json["wd"][0][i]["MAX_WD_04"]/wmaxtotal*100);
        var wdMax = wmaxdata1.toString()+","+wmaxdata2.toString()+","+wmaxdata3.toString()+","+wmaxdata4.toString();
        $("#period").append("<option id='period"+i+"' data-sdAvg='"+sdAvg+"' data-sdMin='"+sdMin+"' data-sdMax='"+sdMax+"' data-wdAvg='"+wdAvg+"' data-wdMin='"+wdMin+"' data-wdMax='"+wdMax+"'>"+json["sd"][0][i]["Z_NAME"]+"</option>");

        if(json["zq"][0][i]["zq_mx"].length!=0){
            var tableID="#growPeriodTable"+(i+1);
            $(tableID.toString()).children("tbody").children().remove();
            var beginDate = new Date(json["zq"][0][i]["zq_mx"][0]["RESTIME"]);
            var endDate = new Date(json["zq"][0][i]["zq_mx"][0]["RESTIME"]);
            if(compatible){
                beginDate = json["zq"][0][i]["zq_mx"][0]["RESTIME"];
                endDate = json["zq"][0][i]["zq_mx"][0]["RESTIME"];
            }
            var date1 = 0;
            var date2 = 0;
            var date3 = 0;
            var date4 = 0;
            var date5 = 0;
            var date6 = 0;
            var datas = [];
            for(var j=0;j<json["zq"][0][i]["zq_mx"].length;j++){
                //$(tableID.toString()).children("tbody").append("<tr class='individualData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["RESTIME"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_HUMI"]+"</td></tr>");
                date1 += parseFloat(json["zq"][0][i]["zq_mx"][j]["MAX_TEMP"]);
                date2 += parseFloat(json["zq"][0][i]["zq_mx"][j]["MIN_TEMP"]);
                date3 += parseFloat(json["zq"][0][i]["zq_mx"][j]["AVG_TEMP"]);
                date4 += parseFloat(json["zq"][0][i]["zq_mx"][j]["MAX_HUMI"]);
                date5 += parseFloat(json["zq"][0][i]["zq_mx"][j]["MIN_HUMI"]);
                date6 += parseFloat(json["zq"][0][i]["zq_mx"][j]["AVG_HUMI"]);
                var tempDate = new Date(json["zq"][0][i]["zq_mx"][j]["RESTIME"]);
                if(datas.length == 0){
                    datas.push({dataString:tempDate,TempString:"<tr class='individualData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["RESTIME"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_HUMI"]+"</td></tr>"});
                }else{
                    var insert=false;
                    var length=datas.length;
                    for(var k=0;k<length;k++){
                        if(tempDate<=datas[k].dataString){
                            for(var h=datas.length;h>k;h--){
                                datas[h]=datas[h-1];
                            }
                            datas[k]={dataString:tempDate,TempString:"<tr class='individualData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["RESTIME"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_HUMI"]+"</td></tr>"};
                            insert=true;
                            k=length;
                        }
                    }
                    if(!insert){
                        datas[datas.length]={dataString:tempDate,TempString:"<tr class='individualData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["RESTIME"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_TEMP"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MAX_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["MIN_HUMI"]+"</td><td>"+json["zq"][0][i]["zq_mx"][j]["AVG_HUMI"]+"</td></tr>"};
                    }
                }
                if(compatible){
                    tempDate = json["zq"][0][i]["zq_mx"][j]["RESTIME"];
                    if(parseInt(tempDate.substr(0,4))<parseInt(beginDate.substr(0,4))){
                        beginDate=tempDate;
                    }else if(parseInt(tempDate.substr(0,4))==parseInt(beginDate.substr(0,4))){
                        if(parseInt(tempDate.substr(5,2))<parseInt(beginDate.substr(5,2))){
                            beginDate=tempDate;
                        }else if(parseInt(tempDate.substr(5,2))==parseInt(beginDate.substr(5,2))){
                            if(parseInt(tempDate.substr(8,2))<parseInt(beginDate.substr(8,2))){
                                beginDate=tempDate;
                            }
                        }
                    }

                    if(parseInt(tempDate.substr(0,4))>parseInt(endDate.substr(0,4))){
                        endDate=tempDate;
                    }else if(parseInt(tempDate.substr(0,4))==parseInt(endDate.substr(0,4))){
                        if(parseInt(tempDate.substr(5,2))>parseInt(endDate.substr(5,2))){
                            endDate=tempDate;
                        }else if(parseInt(tempDate.substr(5,2))==parseInt(endDate.substr(5,2))){
                            if(parseInt(tempDate.substr(8,2))>parseInt(endDate.substr(8,2))){
                                endDate=tempDate;
                            }
                        }
                    }

                }else{
                    if(tempDate<beginDate){
                        beginDate=tempDate;
                    }
                    if(tempDate>endDate){
                        endDate=tempDate;
                    }
                }
            }
            for(var b=0;b<datas.length;b++){
                $(tableID.toString()).children("tbody").append(datas[b].TempString);
            }
            date1/=json["zq"][0][i]["zq_mx"].length;
            date2/=json["zq"][0][i]["zq_mx"].length;
            date3/=json["zq"][0][i]["zq_mx"].length;
            date4/=json["zq"][0][i]["zq_mx"].length;
            date5/=json["zq"][0][i]["zq_mx"].length;
            date6/=json["zq"][0][i]["zq_mx"].length;
            if(compatible){
                $(tableID.toString()).children("tbody").append("<tr class='totalData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+beginDate+"至"+endDate+"</td><td>"+date1.toFixed(2)+"</td><td>"+date2.toFixed(2)+"</td><td>"+date3.toFixed(2)+"</td><td>"+date4.toFixed(2)+"</td><td>"+date5.toFixed(2)+"</td><td>"+date6.toFixed(2)+"</td></tr>");
            }else{
                $(tableID.toString()).children("tbody").append("<tr class='totalData'><td>"+$("#growPeriodBatchID").val()+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+beginDate.getFullYear()+"-"+(parseInt(beginDate.getMonth())+1)+"-"+beginDate.getDate()+"至"+endDate.getFullYear()+"-"+(parseInt(endDate.getMonth())+1)+"-"+endDate.getDate()+"</td><td>"+date1.toFixed(2)+"</td><td>"+date2.toFixed(2)+"</td><td>"+date3.toFixed(2)+"</td><td>"+date4.toFixed(2)+"</td><td>"+date5.toFixed(2)+"</td><td>"+date6.toFixed(2)+"</td></tr>");
            }
            $(".totalData").hide();
            $(tableID.toString()).tablecloth({
                theme: "default",
                bordered: true,
                striped: true,
                sortable: true
            });
        }else{
            var tableID="#growPeriodTable"+(i+1);
            $(tableID.toString()).children("tbody").append("<tr><td colspan='9'>暂无相关数据</td></tr>");
            $(tableID.toString()).tablecloth({
                theme: "default",
                bordered: true,
                striped: true
            });
        }
    }
    if(($("#period option:first-child").attr("data-wdmax")).indexOf("NaN")==-1){
        createPieChart("#growPeriodChart1","温度适宜值统计",parseInt(($("#period option:first-child").attr("data-wdmax").split(","))[0]),parseInt(($("#period option:first-child").attr("data-wdmax").split(","))[1]),parseInt(($("#period option:first-child").attr("data-wdmax").split(","))[2]),parseInt(($("#period option:first-child").attr("data-wdmax").split(","))[3]));
    }else{
        createPieChart("#growPeriodChart1","温度适宜值统计（暂无数据）",0,0,0,0);
    }
    if(($("#period option:first-child").attr("data-sdmax")).indexOf("NaN")==-1){
        createPieChart("#growPeriodChart2","湿度适宜值统计",parseInt(($("#period option:first-child").attr("data-sdmax").split(","))[0]),parseInt(($("#period option:first-child").attr("data-sdmax").split(","))[1]),parseInt(($("#period option:first-child").attr("data-sdmax").split(","))[2]),parseInt(($("#period option:first-child").attr("data-sdmax").split(","))[3]));
    }else{
        createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据）",0,0,0,0);
    }
    $("#period").change(function(){
        pieChartChange()
    });
    $("#show2").change(function(){
        pieChartChange()
    });
    $("#growPeriodHR").waypoint(function(direction) {
        if($("#growPeriod").hasClass("in")){
            if(direction=="down"){
                pieChartChange()
            }
        }
    });
}
function pieChartChange(){
    switch ($("#show2 option:selected").attr("id")){
        case "max":
            if(($("#period option:selected").attr("data-wdmax")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart1","温度适宜值统计",parseInt(($("#period option:selected").attr("data-wdmax").split(","))[0]),parseInt(($("#period option:selected").attr("data-wdmax").split(","))[1]),parseInt(($("#period option:selected").attr("data-wdmax").split(","))[2]),parseInt(($("#period option:selected").attr("data-wdmax").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart1","温度适宜值统计（暂无数据）",0,0,0,0);
            }
            if(($("#period option:selected").attr("data-sdmax")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart2","湿度适宜值统计",parseInt(($("#period option:selected").attr("data-sdmax").split(","))[0]),parseInt(($("#period option:selected").attr("data-sdmax").split(","))[1]),parseInt(($("#period option:selected").attr("data-sdmax").split(","))[2]),parseInt(($("#period option:selected").attr("data-sdmax").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据）",0,0,0,0);
            }
            break;
        case "average":
            if(($("#period option:selected").attr("data-wdavg")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart1","温度适宜值统计",parseInt(($("#period option:selected").attr("data-wdavg").split(","))[0]),parseInt(($("#period option:selected").attr("data-wdavg").split(","))[1]),parseInt(($("#period option:selected").attr("data-wdavg").split(","))[2]),parseInt(($("#period option:selected").attr("data-wdavg").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart1","温度适宜值统计（暂无数据）",0,0,0,0);
            }
            if(($("#period option:selected").attr("data-sdavg")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart2","湿度适宜值统计",parseInt(($("#period option:selected").attr("data-sdavg").split(","))[0]),parseInt(($("#period option:selected").attr("data-sdavg").split(","))[1]),parseInt(($("#period option:selected").attr("data-sdavg").split(","))[2]),parseInt(($("#period option:selected").attr("data-sdavg").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据）",0,0,0,0);
            }
            break;
        case "min":
            if(($("#period option:selected").attr("data-wdmin")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart1","温度适宜值统计",parseInt(($("#period option:selected").attr("data-wdmin").split(","))[0]),parseInt(($("#period option:selected").attr("data-wdmin").split(","))[1]),parseInt(($("#period option:selected").attr("data-wdmin").split(","))[2]),parseInt(($("#period option:selected").attr("data-wdmin").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart1","温度适宜值统计（暂无数据）",0,0,0,0);
            }
            if(($("#period option:selected").attr("data-sdmin")).indexOf("NaN")==-1){
                createPieChart("#growPeriodChart2","湿度适宜值统计",parseInt(($("#period option:selected").attr("data-sdmin").split(","))[0]),parseInt(($("#period option:selected").attr("data-sdmin").split(","))[1]),parseInt(($("#period option:selected").attr("data-sdmin").split(","))[2]),parseInt(($("#period option:selected").attr("data-sdmin").split(","))[3]));
            }else{
                createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据）",0,0,0,0);
            }
            break;
    }
}
function createBaseInfo1(title,data1,data1Title1,data2,dataTitle2,data3,dataTitle3,valueTitle,axisCrossingValue,minMin,minMax,middleMin,middleMax,maxMin,maxMax,categories,img){
    $("#timeline").kendoChart({
        title: {
            text: title
        },
        legend: {
            position: "bottom"
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            type: "line",
            style: "smooth"
        },
        series: [{
            data: data1,
            name: data1Title1,
            color: "#4b5cc4"
        },{
            data: data2,
            name: dataTitle2,
            color: "#96ce54"
        },{
            data: data3,
            name: dataTitle3,
            color: "#f47983"
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: true
            },
            title: { text: valueTitle },
            axisCrossingValue: axisCrossingValue,
            plotBands: [{
                from: minMin,
                to: minMax,
                color: "#4b5cc4",
                opacity: 0.3
            }, {
                from: middleMin,
                to: middleMax,
                color: "#96ce54",
                opacity: 0.3
            }, {
                from: maxMin,
                to: maxMax,
                color: "#f47983",
                opacity: 0.3
            }],
            min:-10,
            max:40
        },
        categoryAxis: {
            categories: categories,
            majorGridLines: {
                visible: false
            },
            baseUnitStep: "auto"
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= series.name #: #= value #"
        },
        seriesHover: function(e) {
            var position=(e.category).indexOf("：");
            var peroid=(e.category).slice(0,position);
            switch (peroid){
                case "休眠期":
                    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[0]);
                    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[0]);
                    break;
                case "花芽开放期":
                    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[1]);
                    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[1]);
                    break;
                case "抽枝期":
                    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[2]);
                    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[2]);
                    break;
                case "完全开放期":
                    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[3]);
                    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[3]);
                    break;
                case "成熟期":
                    $("#blueBerryImg1").attr("href","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[4]);
                    $("#blueBerryImg2").attr("src","http://222.85.150.217:8099/BlueBerry/uploadfile"+img[4]);
                    break;
            }
            var peroidTime=(e.category).slice(position+1);
            $("#testPeriod").html(peroid);
            $("#testPeriodTime").html(peroidTime);
            $("#testCato").html(e.series.name);
            $("#testTemp").html(e.value);
        }
    });
}
function createPieChart(id,title,data1,data2,data3,data4) {
    $(id).kendoChart({
        theme: "bootstrap",
        title: {
            text: title,
            color:"#8D8D8D"
        },
        chartArea: {
            background: null
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: #= value#%"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data: [{
                category: "报警",
                value: data1,
                color:"#ff4777"
            },{
                category: "伤害",
                value: data2,
                color:"#ffb61e"
            },{
                category: "正常",
                value: data3,
                color:"#1685a9"
            },{
                category: "适宜",
                value: data4,
                color:"#0eb83a"
            }]
        }],
        tooltip: {
            visible: true,
            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
        }
    });
}
function ajaxI02(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI02(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI02(i02);
        }
    });
}
function ajaxI07(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI07(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI07(i07);
        }
    });
}
$(document).ready(function() {
    var url= window.location.href;
    if(url.lastIndexOf("?")==-1){
        url += "?dw=JC-ZCGZ-140103-0003";
        window.location.href=url;
    }
    var urlArguments=url.slice(url.lastIndexOf("?")+1,url.length);
    var urlAddress="../data.action?tit=I01&"+urlArguments;

    $.ajax({
        type:"GET",
        url:urlAddress,
        dataType:"json",
        success:function(json){
            $("#growPeriodBatchID").children().remove();
            for(var i=0;i<json["zzpcList"][0].length;i++){
                $("#growPeriodBatchID").append("<option data-zj='"+json["zzpcList"][0][i]["ZJ"]+"' data-name='"+json["zzpcList"][0][i]["P_NAME"]+"'>"+json["zzpcList"][0][i]["PC_NO"]+"</option>");
            }
            var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
            ajaxI02("../data.action?tit=I02&pc="+temp);
            ajaxI07("../data.action?tit=I07&pc="+temp);
        },
        error:function(){
            $("#growPeriodBatchID").children().remove();
            for(var i=0;i<i01["zzpcList"][0].length;i++){
                $("#growPeriodBatchID").append("<option data-zj='"+i01["zzpcList"][0][i]["ZJ"]+"' data-name='"+i01["zzpcList"][0][i]["P_NAME"]+"'>"+i01["zzpcList"][0][i]["PC_NO"]+"</option>");
            }
            var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
            ajaxI02("../data.action?tit=I02&pc="+temp);
            ajaxI07("../data.action?tit=I07&pc="+temp);
        }
    });

    $(".growPeriodShow").click(function(){
        if($(this).parent().next().children("table").children("tbody").children(".totalData").css("display")=="none"){
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(3)").html("时间范围");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(4)").html("最高温度均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(5)").html("最低温度均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(6)").html("平均温度均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(7)").html("最高湿度均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(8)").html("最低湿度均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(9)").html("平均湿度均值");
            $(this).parent().next().children("table").children("tbody").children(".totalData").show();
            $(this).parent().next().children("table").children("tbody").children(".individualData").hide();
        }else{
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(3)").html("时间");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(4)").html("最高温度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(5)").html("最低温度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(6)").html("平均温度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(7)").html("最高湿度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(8)").html("最低湿度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(9)").html("平均湿度");
            $(this).parent().next().children("table").children("tbody").children(".totalData").hide();
            $(this).parent().next().children("table").children("tbody").children(".individualData").show();
        }
    });

    $("#growPeriodBatchID").change(function(){
        var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
        ajaxI02("../data.action?tit=I02&pc="+temp);
        ajaxI07("../data.action?tit=I07&pc="+temp);
    });

    $("#growPeriodIndex").change(function(){
        var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
        ajaxI07("../data.action?tit=I07&pc="+temp);
    });


});
