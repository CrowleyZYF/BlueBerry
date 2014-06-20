/**
 * Created by Castiel.ZYF on 14-4-21.
 */
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

function compare(data1,data2){
    if(parseInt(data1.substring(data1.indexOf(" "),data1.indexOf(":")))>parseInt(data2.substring(data2.indexOf(" "),data2.indexOf(":")))){
        return true;
    }else if(parseInt(data1.substring(data1.indexOf(" "),data1.indexOf(":")))==parseInt(data2.substring(data2.indexOf(" "),data2.indexOf(":")))){
        if(parseInt(data1.substring(data1.indexOf("/")+1,data1.lastIndexOf(":")))>parseInt(data2.substring(data2.indexOf("/")+1,data2.lastIndexOf(":")))){
            return true;
        }else if(parseInt(data1.substring(data1.indexOf("/")+1,data1.lastIndexOf(":")))==parseInt(data2.substring(data2.indexOf("/")+1,data2.lastIndexOf(":")))){
            if(parseInt(data1.substring(data1.lastIndexOf("/")+1,data1.length)>parseInt(data2.substring(data2.lastIndexOf("/")+1,data2.length)))){
                return true;
            }
        }
    }
}

function initI03(json){
    var data1=" 0:0:0";
    var humi,light,rain,temp,wendvalue,s1,s2,s3,s4;
    var humiTotal=0,lightTotal=0,rainTotal=0,tempTotal=0,wendvalueTotal=0;
    var TRMIN,TRMAX,TPMIN,TPMAX,TGMIN,TGMAX,HPMIN,HPMAX,HGMIN,HGMAX;
    var chartTempData=[];
    var chartHumiData=[];
    var warmHouseData=[];
    var tempTime=[];
    for(var i=0;i<json["01"][0].length;i++){
        var last=json["01"][0][i]["restime"];
        $("#theDate").html(last.substring(0,last.indexOf('/'))+"年"+last.substring(last.indexOf('/')+1,last.lastIndexOf('/'))+"月"+last.substring(last.lastIndexOf('/')+1,last.indexOf(' '))+"日");
        $("#growPeriodTable1").children("tbody").append("<tr class='individualData'><td>"+last.substring(last.indexOf(' ')+1,last.length)+"</td><td>"+json["01"][0][i]["temp"]+"</td><td>"+json["01"][0][i]["humi"]+"</td><td>"+json["01"][0][i]["rain"]+"</td><td>"+json["01"][0][i]["wendvalue"]+"</td><td>"+json["01"][0][i]["light"]+"</td></tr>");
        humiTotal+=parseFloat(json["01"][0][i]["humi"]);
        lightTotal+=parseFloat(json["01"][0][i]["light"]);
        rainTotal+=parseFloat(json["01"][0][i]["rain"]);
        tempTotal+=parseFloat(json["01"][0][i]["temp"]);
        wendvalueTotal+=parseFloat(json["01"][0][i]["wendvalue"]);
        //if(last>data1){
        if(compare(last,data1)){
            humi=json["01"][0][i]["humi"];
            light=json["01"][0][i]["light"];
            rain=json["01"][0][i]["rain"];
            temp=json["01"][0][i]["temp"];
            wendvalue=json["01"][0][i]["wendvalue"];
            data1=last;
        }
        chartTempData[i]={value:json["01"][0][i]["temp"], date:new Date(json["01"][0][i]["restime"])};
        chartHumiData[i]={value:json["01"][0][i]["humi"], date:new Date(json["01"][0][i]["restime"])};
        //chartTempData[i]=json["01"][0][i]["temp"];
        //chartHumiData[i]=json["01"][0][i]["humi"];
        //tempTime[i]=data1.substring(last.indexOf(' ')+1,data1.length);
        warmHouseData[i]=[json["01"][0][i]["humi"],json["01"][0][i]["temp"]];
    }
    $("#growPeriodTable1").children("tbody").append("<tr class='totalData'><td>"+last.substring(0,last.indexOf('/'))+"年"+last.substring(last.indexOf('/')+1,last.lastIndexOf('/'))+"月"+last.substring(last.lastIndexOf('/')+1,last.indexOf(' '))+"日"+"</td><td>"+(tempTotal/json["01"][0].length).toFixed(2)+"</td><td>"+(humiTotal/json["01"][0].length).toFixed(2)+"</td><td>"+(rainTotal/json["01"][0].length).toFixed(2)+"</td><td>"+(wendvalueTotal/json["01"][0].length).toFixed(2)+"</td><td>"+(lightTotal/json["01"][0].length).toFixed(2)+"</td></tr>");
    $(".totalData").hide();
    $(".growPeriodShow").click(function(){
        if($(this).parent().next().children("table").children("tbody").children(".totalData").css("display")=="none"){
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(1)").html("日期");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(2)").html("温度当日均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(3)").html("湿度当日均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(4)").html("雨量当日均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(5)").html("风速当日均值");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(6)").html("光照当日均值");
            $(this).parent().next().children("table").children("tbody").children(".totalData").show();
            $(this).parent().next().children("table").children("tbody").children(".individualData").hide();
        }else{
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(1)").html("时间");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(2)").html("温度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(3)").html("湿度");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(4)").html("雨量");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(5)").html("风速");
            $(this).parent().next().children("table").children("thead").children("tr").children("th:nth-child(6)").html("光照");
            $(this).parent().next().children("table").children("tbody").children(".totalData").hide();
            $(this).parent().next().children("table").children("tbody").children(".individualData").show();
        }
    });
    $("#growPeriodTable1").tablecloth({
        theme: "default",
        bordered: true,
        striped: true,
        sortable: true
    });
    createGauges("#gauge1",temp,20,2,-10,60,-10,0,30,45,45,60);
    $("#gauge1").parent().next().children("span").html(temp);
    createGauges("#gauge2",humi,20,2,0,100,0,20,50,75,75,100);
    $("#gauge2").parent().next().children("span").html(humi);
    createGauges("#gauge3",rain,20,2,-10,60,-10,0,30,45,45,60);
    $("#gauge3").parent().next().children("span").html(rain);
    createGauges("#gauge4",wendvalue,20,2,0,100,0,20,50,75,75,100);
    $("#gauge4").parent().next().children("span").html(wendvalue);
    createGauges("#gauge5",light,500,100,1500,3000,1500,1700,2500,2700,2700,3000);
    $("#gauge5").parent().next().children("span").html(light);
    for(var i=0;i<json["02"][0].length;i++){
        if(json["02"][0][i]["Z_NAME"]=="温度"){
            switch (json["02"][0][i]["Z_TYPE"]){
                case "01":
                    TPMIN=json["02"][0][i]["Z_MIN"];
                    TPMAX=json["02"][0][i]["Z_MAX"];
                    break;
                case "02":
                    TRMIN=json["02"][0][i]["Z_MIN"];
                    TRMAX=json["02"][0][i]["Z_MAX"];
                    break;
                case "03":
                    s1=json["02"][0][i]["Z_MIN"];
                    s2=json["02"][0][i]["Z_MAX"];
                    break;
                case "04":
                    TGMIN=json["02"][0][i]["Z_MIN"];
                    TGMAX=json["02"][0][i]["Z_MAX"];
                    break;
            }
        }
        if(json["02"][0][i]["Z_NAME"]=="湿度"){
            switch (json["02"][0][i]["Z_TYPE"]){
                case "01":
                    HPMIN=json["02"][0][i]["Z_MIN"];
                    HPMAX=json["02"][0][i]["Z_MAX"];
                    break;
                case "03":
                    s3=json["02"][0][i]["Z_MIN"];
                    s4=json["02"][0][i]["Z_MAX"];
                    break;
                case "04":
                    HGMIN=json["02"][0][i]["Z_MIN"];
                    HGMAX=json["02"][0][i]["Z_MAX"];
                    break;
            }
        }
    }
    $("#dataManagementA").click(function(){
        createGauges("#gauge1",temp,20,2,-10,60,-10,0,30,45,45,60);
        createGauges("#gauge2",humi,20,2,0,100,0,20,50,75,75,100);
        createGauges("#gauge3",rain,20,2,-10,60,-10,0,30,45,45,60);
        createGauges("#gauge4",wendvalue,20,2,0,100,0,20,50,75,75,100);
        createGauges("#gauge5",light,500,100,1500,3000,1500,1700,2500,2700,2700,3000);
    });
    createChart("#scatterChart1",chartTempData,-10,50,"温度（摄氏度）",-10,s1,s1,s2,s2,50,-10,"{0:HH：mm} 的温度为 {1}℃","当日温度趋势散点图");
    createChart("#scatterChart2",chartHumiData,0,100,"湿度",0,s3,s3,s4,s4,100,0,"{0:HH：mm} 的湿度为 {1}","当日湿度趋势散点图");
    var x=[0,10,20,30,40,50,60,70,80,90,100];
    var y=[-10,0,10,20,30,40,50];
    temWetChart.init(1200,400,x,y,warmHouseData,TRMIN,TRMAX,TPMIN,TPMAX,TGMIN,TGMAX,HPMIN,HPMAX,HGMIN,HGMAX);
    $("#scatterChart1").waypoint(function(direction) {
        if($("#dataManagement").hasClass("in")){
            if(direction=="down"){
                createChart("#scatterChart1",chartTempData,-10,50,"温度（摄氏度）",-10,s1,s1,s2,s2,50,-10,"{0:HH：mm} 的温度为 {1}℃","当日温度趋势散点图",tempTime);
            }
        }
    });
    $("#scatterChart2").waypoint(function(direction) {
        if($("#dataManagement").hasClass("in")){
            if(direction=="down"){
                createChart("#scatterChart2",chartHumiData,30,120,"湿度（%）",30,s3,s3,s4,s4,120,0,"{0:HH：mm} 的湿度为 {1}","当日湿度趋势散点图",tempTime);
            }
        }
    });
    $("#dataLeft").css("height",$("#dataRight").css("height"));
}
//五个仪表盘：value为具体数值,majorUnit为最大刻度,minorUnit为最小刻度,min最小值,max最大值,lowMin,lowMax,midMin,midMax,highMin,highMax
function createGauges(id,value,majorUnit,minorUnit,min,max,lowMin,lowMax,midMin,midMax,highMin,highMax) {
    $(id).kendoLinearGauge({
        pointer: {
            value: value
        },
        scale: {
            majorUnit: majorUnit,
            minorUnit: minorUnit,
            min: min,
            max: max,
            vertical: true,
            ranges: [
                {
                    from: lowMin,
                    to: lowMax,
                    color: "#2798df"
                }, {
                    from: midMin,
                    to: midMax,
                    color: "#ffc700"
                }, {
                    from: highMin,
                    to: highMax,
                    color: "#c20000"
                }
            ]
        }
    });
}
//当日趋势图
function createChart(id,data,min,max,yText,dangerousMin1,dangerousMax1,safeMin,safeMax,dangerousMin2,dangerousMax2,yCross,format,title,categories) {
    $(id).kendoChart({
        title: {
            text: title
        },
        dataSource: data,
        chartArea: {
            background: null
        },
        seriesDefaults: {
            type: "scatter",
            markers: {
                size: 6
            }
        },
        series: [{
            xField: "date",
            yField: "value"
        }],
        xAxis: {
            title: {
                text: "时间"
            },
            labels: {
                skip: 3
            }
        },
        yAxis: {
            min: min,
            max: max,
            title: {
                text: yText
            },
            plotBands: [{
                from: dangerousMin1,
                to: dangerousMax1,
                color: "#c00",
                opacity: 0.3
            }, {
                from: safeMin,
                to: safeMax,
                color: "#49D909",
                opacity: 0.3
            }, {
                from: dangerousMin2,
                to: dangerousMax2,
                color: "#c00",
                opacity: 0.3
            }],
            axisCrossingValue: yCross
        },
        tooltip: {
            visible: true,
            format: format
        }
    });
}

function ajaxI03(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI03(json);
        },
        error:function(){
            initI03(i03);
        }
    });
}

function initI01(json){
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var zNodes =[];

    for(var i=0;i<json["zzpcList"][0].length;i++){
        var node={id:(i+1),pId:0,name:"批次号："+json["zzpcList"][0][i]["PC_NO"],open:true,icon:"image/icon1.png"};
        zNodes.push(node);
        for(var j=0;j<json["jkdList"][0].length;j++){
            var node={id: parseInt((i+1).toString()+ (j+1).toString()),pId:(i+1),name:"监控点："+json["jkdList"][0][j]["NAME"],icon:"image/icon2.png"};
            zNodes.push(node);
        }
    }

    $.fn.zTree.init($("#treeDemo"), setting, zNodes);

}

$(document).ready(function() {
    ajaxI03("../data.action?tit=I03");
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
            initI01(json);
        },
        error:function(){
            initI01(i01);
        }
    });
    $("#show").click(function(){
        if($(this).html()=="隐藏列表"){
            $("#showTitle").css("display","none");
            $(this).html("展开列表");
            $("#treeDemo").css("display","none");
            $("#dataLeft").css("width","25px");
        }else{
            $("#showTitle").css("display","inline");
            $(this).html("隐藏列表");
            $("#treeDemo").css("display","block");
            $("#dataLeft").css("width","189px");
        }
    })
});

