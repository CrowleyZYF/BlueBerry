/**
 * Created by Castiel.ZYF on 14-1-7.
 */

//I01
//初始化
function initI01(json){
    $("#baseName").html(json["base"][0]["NAME"]);
    var baseProductString="";
    $("#growPeriodBatchID").children().remove();
    $("#periodSafetyInfoBID").children().remove();
    for(var i=0;i<json["zzpcList"].length;i++){
        $("#growPeriodBatchID").append("<option data-zj='"+json["zzpcList"][i][0]["ZJ"]+"' data-name='"+json["zzpcList"][i][0]["P_NAME"]+"'>"+json["zzpcList"][i][0]["PC_NO"]+"</option>");
        $("#periodSafetyInfoBID").append("<option data-zj='"+json["zzpcList"][i][0]["ZJ"]+"'>"+json["zzpcList"][i][0]["PC_NO"]+"</option>");
        for(var j=0;j<json["zzpcList"][i].length;j++){
            if(baseProductString.search(json["zzpcList"][i][j]["P_NAME"])==-1){
                baseProductString=baseProductString+json["zzpcList"][i][j]["P_NAME"]+"；";
            }
        }
    }
    $("#baseProducts").html(baseProductString.slice(0,baseProductString.length-1));
    $("#baseLocation").html(json["base"][0]["WZ"]==null ? "暂无相关信息" : json["base"][0]["WZ"]);
    $("#baseCompany").html(json["base"][0]["P_ZJ"]==null ? "暂无相关信息" : json["base"][0]["P_ZJ"]);
    $("#baseArea").html(json["base"][0]["MJ"]==null ? "暂无相关信息" : json["base"][0]["MJ"]);
    mapInit(json)
}
//地图
function mapInit(json){
    var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>基地名称</h4><h5 style='margin:0 0 5px 0;padding:0.2em 0'>经度：东经<span id='jd'>"+(json["base"][0]["JD"]==null ? "暂无相关信息" : json["base"][0]["JD"])+"</span>°</h5><h5 style='margin:0 0 5px 0;padding:0.2em 0'>纬度：北纬<span id='wd'>"+(json["base"][0]["WD"]==null ? "暂无相关信息" : json["base"][0]["WD"])+"</span>°</h5><h5 style='margin:0 0 5px 0;padding:0.2em 0'>基地介绍：<span id='baseRemark'>"+(json["base"][0]["REMARK"]==null ? "暂无相关信息" : json["base"][0]["REMARK"])+"</span></h5>";
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    var map = new BMap.Map("map");          // 创建地图实例
    map.centerAndZoom(new BMap.Point(106.7,26.6), 12);
    var marker1 = new BMap.Marker(new BMap.Point(106.7,26.6));  // 创建标注
    map.addOverlay(marker1);              // 将标注添加到地图中
    marker1.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    marker1.addEventListener("click", function(){
        this.openInfoWindow(infoWindow);
    });
    var opts1 = {type: BMAP_NAVIGATION_CONTROL_LARGE};
    map.addControl(new BMap.NavigationControl(opts1));
    map.addControl(new BMap.MapTypeControl());
}

//I02
//初始化
function initI02(json){
    createBaseInfo1();
    $("#period").children().remove();
    for(var i=0;i<json["0201"][0].length;i++){
        if(!(json["0201"][0][i]["WD_01"]==0&&json["0201"][0][i]["WD_02"]==0&&json["0201"][0][i]["WD_03"]==0&&json["0201"][0][i]["WD_04"]==0)){
            $("#period").append("<option data-01='"+json["0201"][0][i]["WD_01"]+"' data-02='"+json["0201"][0][i]["WD_02"]+"' data-03='"+json["0201"][0][i]["WD_03"]+"' data-04='"+json["0201"][0][i]["WD_04"]+"'>"+json["0201"][0][i]["Z_NAME"]+"</option>");
        }
        if(json["0201"][0][i]["zq_rq"].length!=0){
            var tableID="#growPeriodTable"+(i+1);
            var beginDate = new Date(json["0201"][0][i]["zq_rq"][0]["RESTIME"]);
            var endDate = new Date(json["0201"][0][i]["zq_rq"][0]["RESTIME"]);
            var date1 = 0;
            var date2 = 0;
            var date3 = 0;
            var date4 = 0;
            var date5 = 0;
            var date6 = 0;
            for(var j=0;j<json["0201"][0][i]["zq_rq"].length;j++){
                $(tableID.toString()).children("tbody").append("<tr class='individualData'><td>"+json["0201"][0][i]["PC_NO"]+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["RESTIME"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["MAX_TEMP"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["MIN_TEMP"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["AVG_TEMP"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["MAX_HUMI"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["MIN_HUMI"]+"</td><td>"+json["0201"][0][i]["zq_rq"][j]["AVG_HUMI"]+"</td></tr>");
                date1 += parseFloat(json["0201"][0][i]["zq_rq"][j]["MAX_TEMP"]);
                date2 += parseFloat(json["0201"][0][i]["zq_rq"][j]["MIN_TEMP"]);
                date3 += parseFloat(json["0201"][0][i]["zq_rq"][j]["AVG_TEMP"]);
                date4 += parseFloat(json["0201"][0][i]["zq_rq"][j]["MAX_HUMI"]);
                date5 += parseFloat(json["0201"][0][i]["zq_rq"][j]["MIN_HUMI"]);
                date6 += parseFloat(json["0201"][0][i]["zq_rq"][j]["AVG_HUMI"]);
                var tempDate = new Date(json["0201"][0][i]["zq_rq"][j]["RESTIME"]);
                if(tempDate<beginDate){
                    beginDate=tempDate;
                }
                if(tempDate>endDate){
                    endDate=tempDate;
                }
            }
            date1/=json["0201"][0][i]["zq_rq"].length;
            date2/=json["0201"][0][i]["zq_rq"].length;
            date3/=json["0201"][0][i]["zq_rq"].length;
            date4/=json["0201"][0][i]["zq_rq"].length;
            date5/=json["0201"][0][i]["zq_rq"].length;
            date6/=json["0201"][0][i]["zq_rq"].length;
            $(tableID.toString()).children("tbody").append("<tr class='totalData'><td>"+json["0201"][0][i]["PC_NO"]+"</td><td>"+$("#growPeriodBatchID option:selected").attr("data-name")+"</td><td>"+beginDate.getFullYear()+"-"+(parseInt(beginDate.getMonth())+1)+"-"+beginDate.getDate()+"至"+endDate.getFullYear()+"-"+(parseInt(endDate.getMonth())+1)+"-"+endDate.getDate()+"</td><td>"+date1.toFixed(2)+"</td><td>"+date2.toFixed(2)+"</td><td>"+date3.toFixed(2)+"</td><td>"+date4.toFixed(2)+"</td><td>"+date5.toFixed(2)+"</td><td>"+date6.toFixed(2)+"</td></tr>");
            $(".totalData").hide();
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
    var sum=parseInt($("#period option:first-child").attr("data-01"))+parseInt($("#period option:first-child").attr("data-02"))+parseInt($("#period option:first-child").attr("data-03"))+parseInt($("#period option:first-child").attr("data-04"));
    createPieChart("#growPeriodChart1","温度适宜值统计",parseInt($("#period option:first-child").attr("data-01")/sum*100),parseInt($("#period option:first-child").attr("data-02")/sum*100),parseInt($("#period option:first-child").attr("data-03")/sum*100),parseInt($("#period option:first-child").attr("data-04")/sum*100));
    createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据，样式仅供参考）");
    $("#period").change(function(){
        var sum=parseInt($("#period option:selected").attr("data-01"))+parseInt($("#period option:selected").attr("data-02"))+parseInt($("#period option:selected").attr("data-03"))+parseInt($("#period option:selected").attr("data-04"));
        createPieChart("#growPeriodChart1","温度适宜值统计",parseInt($("#period option:selected").attr("data-01")/sum*100),parseInt($("#period option:selected").attr("data-02")/sum*100),parseInt($("#period option:selected").attr("data-03")/sum*100),parseInt($("#period option:selected").attr("data-04")/sum*100));
    });
    $("#growPeriodHR").waypoint(function(direction) {
        if($("#growPeriod").hasClass("in")){
            if(direction=="down"){
                createPieChart("#growPeriodChart1","温度适宜值统计",parseInt($("#period option:selected").attr("data-01")/sum*100),parseInt($("#period option:selected").attr("data-02")/sum*100),parseInt($("#period option:selected").attr("data-03")/sum*100),parseInt($("#period option:selected").attr("data-04")/sum*100));
                createPieChart("#growPeriodChart2","湿度适宜值统计（暂无数据，样式仅供参考）",25,25,25,25);
            }
        }
    });
}
//基本情况
/*
*{
 type: "line",
 data: [20, 30, 22, 27, 23],
 name: "最低湿度均值",
 color: "#003c72",
 axis: "humi"
 }, {
 type: "line",
 data: [40, 55, 47, 50, 52],
 name: "平均湿度均值",
 color: "#0399d4",
 axis: "humi"
 },{
 type: "line",
 data: [60, 72, 83, 65, 79],
 name: "最高湿度均值",
 color: "#03B9FF",
 axis: "humi"
 },
* */
function createBaseInfo1(){
    $("#timeline").kendoChart({
        title: {
            text: "生长周期分析基本情况图表(温度)"
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
            data: [0, 10, -5, 7, 8],
            name: "最低温度均值",
            color:"#4b5cc4"
        },{
            data: [15, 20, 25, 17, 22],
            name: "平均温度均值",
            color:"#96ce54"
        },{
            data: [30, 35, 28, 36, 37],
            name: "最高温度均值",
            color:"#f47983"
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: true
            },
            title: { text: "温度（℃）" },
            axisCrossingValue: -10,
            plotBands: [{
                from: -5,
                to: 5,
                color: "#4b5cc4",
                opacity: 0.3
            }, {
                from: 13,
                to: 22,
                color: "#96ce54",
                opacity: 0.3
            }, {
                from: 30,
                to: 35,
                color: "#f47983",
                opacity: 0.3
            }]
        },
        categoryAxis: {
            categories: ["休眠期1/1~2/1","花芽开放期2/1~3/1","抽枝期3/1~4/1","完全开放期4/1~5/1","成熟期5/1~6/1"],
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
            $("#testPeriod").html(e.category);
            $("#testCato").html(e.series.name);
            $("#testTemp").html(e.value);
        }
    });
}
//统计分析饼状图：data1为适宜百分比,data2为正常百分比,data3为报警百分比,data4为伤害百分比
function createPieChart(id,title,data1,data2,data3,data4) {
    $(id).kendoChart({
        theme: "bootstrap",
        title: {
            position: "top",
            text: title
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

//I03
//初始化
function initI03(json){
    var data1=new Date("1990/1/1");
    var humi,light,rain,temp,wendvalue,s1,s2,s3,s4;
    var TRMIN,TRMAX,TPMIN,TPMAX,TGMIN,TGMAX,HPMIN,HPMAX,HGMIN,HGMAX;
    var chartTempData=[];
    var chartHumiData=[];
    var warmHouseData=[];
    for(var i=0;i<json["01"][0].length;i++){
        var last=new Date(json["01"][0][i]["restime"]);
        if(last>data1){
            humi=json["01"][0][i]["humi"];
            light=json["01"][0][i]["light"];
            rain=json["01"][0][i]["rain"];
            temp=json["01"][0][i]["temp"];
            wendvalue=json["01"][0][i]["wendvalue"];
            data1=last;
        }
        chartTempData[i]={value:json["01"][0][i]["temp"], date:last};
        chartHumiData[i]={value:json["01"][0][i]["humi"], date:last};
        warmHouseData[i]=[json["01"][0][i]["humi"],json["01"][0][i]["temp"]];
    }
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
    createChart("#scatterChart2",chartHumiData,30,120,"湿度",30,s3,s3,s4,s4,120,0,"{0:HH：mm} 的湿度为 {1}","当日湿度趋势散点图");
    var x=[0,10,20,30,40,50,60,70,80,90,100];
    var y=[-10,0,10,20,30,40,50];
    temWetChart.init(1000,400,x,y,warmHouseData,TRMIN,TRMAX,TPMIN,TPMAX,TGMIN,TGMAX,HPMIN,HPMAX,HGMIN,HGMAX);
    $("#scatterChart1").waypoint(function(direction) {
        if($("#dataManagement").hasClass("in")){
            if(direction=="down"){
                createChart("#scatterChart1",chartTempData,-10,50,"温度（摄氏度）",-10,s1,s1,s2,s2,50,-10,"{0:HH：mm} 的温度为 {1}℃","当日温度趋势散点图");
            }
        }
    });
    $("#scatterChart2").waypoint(function(direction) {
        if($("#dataManagement").hasClass("in")){
            if(direction=="down"){
                createChart("#scatterChart2",chartHumiData,30,120,"湿度",30,s3,s3,s4,s4,120,0,"{0:HH：mm} 的湿度为 {1}","当日湿度趋势散点图");
            }
        }
    });
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
function createChart(id,data,min,max,yText,dangerousMin1,dangerousMax1,safeMin,safeMax,dangerousMin2,dangerousMax2,yCross,format,title) {
    $(id).kendoChart({
        title: {
            text: title
        },
        dataSource: data,
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

//I04
//初始化
function initI04(json){
    createBaseInfo2();
    var haveNoData=[0,0,0,0,0];
    for(var i=0;i<json.length;i++){
        switch (json[i]["Z_NAME"]){
            case "休眠期":
                haveNoData[0]=addItem("#periodSafetyTable1","休眠期",json[i]);
                break;
            case "花芽开放期":
                haveNoData[1]=addItem("#periodSafetyTable2","花芽开放期",json[i]);
                break;
            case "抽枝期":
                haveNoData[2]=addItem("#periodSafetyTable3","抽枝期",json[i]);
                break;
            case "完全开花期":
                haveNoData[3]=addItem("#periodSafetyTable4","完全开花期",json[i]);
                break;
            case "成熟期":
                haveNoData[4]=addItem("#periodSafetyTable5","成熟期",json[i]);
                break;
        }
    }
    for(var j=0;j<json.length;j++){
        if(haveNoData[j]==0){
            var idString="#periodSafetyTable"+(j+1);
            $(idString).children("tbody").append("<tr><td colspan='7'>暂无相关数据</td></tr>");
        }
    }
}
//基本情况
function createBaseInfo2(){
    $("#timeline1").kendoChart({
        title: {
            text: "周期安全管理基本情况图表"
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "column",
            data: [20, 30, 22, 27, 23],
            name: "叶片金属残留物",
            color: "#003c72",
            axis: "js"
        }, {
            type: "column",
            data: [40, 55, 47, 50, 52],
            name: "土壤金属残留物",
            color: "#0399d4",
            axis: "js"
        },{
            type: "column",
            data: [60, 72, 83, 65, 79],
            name: "果实金属残留物",
            color: "#03B9FF",
            axis: "js"
        }, {
            type: "line",
            data: [0, 10, -5, 7, 8],
            name: "叶片农药残留物",
            color: "#642381",
            axis: "ny"
        }, {
            type: "line",
            data: [15, 20, 25, 17, 22],
            name: "土壤农药残留物",
            color: "#e5388a",
            axis: "ny"
        }, {
            type: "line",
            data: [30, 35, 28, 36, 37],
            name: "果实农药残留物",
            color: "#FF3E9B",
            axis: "ny"
        }],
        valueAxes: [{
            name: "ny",
            title: { text: "农药残留物（%）" },
            min: 0,
            max: 100
        }, {
            name: "js",
            title: { text: "金属残留物" },
            majorUnit: 10
        }],
        categoryAxis: {
            categories: ["休眠期1/1~2/1","花芽开放期2/1~3/1","抽枝期3/1~4/1","完全开放期4/1~5/1","成熟期5/1~6/1"],
            majorGridLines: {
                visible: false
            },
            baseUnitStep: "auto",
            axisCrossingValues: [0, 10]
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= series.name #: #= value #"
        }
    });
}
//测试使用箱图
function periodSafetyChart() {
    $("#periodSafetyChart").kendoChart({
        theme: "bootstrap",
        title: {
            text: "仅供测试的箱图"
        },
        legend: {
            visible: false
        },
        series: [{
            type: "boxPlot",
            data: [
                [26.2,38.3,51,61.45,68.9,49.0,[18.3, 20, 70, 72,5]],
                [26.4,38.125,46.8,60.425,66.8,47.3,[18, 69, 71.3, 71.5]],
                [31.6,41.725,52.35,62.175,70.8,52.3,[14, 16.4, 74]],
                [34.4,39.375,49.9,61.425,69.2,50.3,[16, 18, 72, 72.5]],
                [29.9,38.35,50.4,60.875,69.7,49.9,[19, 20, 76, 78]],
                [22.3,36.875,48.9,62.65,70.3,49.0,[16.5, 17, 74, 75, 78]],
                [32.3,39.5,54.1,61.175,67.3,50.8,[13, 14, 15, 74.3, 75.2, 76]],
                [28.5,36.075,50.5,64.2,70.4,49.6,[18, 22, 73.4, 75]],
                [33.6,40.65,49.55,62.8,69.2,51.1,[17, 73]],
                [33.6,38.6,47.9,60.825,67,49.7,[12, 13.5, 16, 73, 74.6, 77]],
                [31.9,36.425,49.3,61.825,69.7,49.4,[17, 76]],
                [34,41.225,51.15,62.4,68.8,51.6,[14.6, 17.3, 72.3, 74]]
            ]
        }],
        categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            majorGridLines: {
                visible: false
            }
        }
    });
}
//添加表格项目
function addItem(id,name,data){
    var result=0;
    if(data["pt"]!=undefined){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>重金属</td><td>土壤</td><td>"+parseFloat(data["pt"])+"</td>"+getMetalJudge(parseFloat(data["pt"]))+"<td>"+data["STAR_DATE"]+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22' data-zj='"+data["ZJ"]+"'>查看对应监控点</button></td></tr>");
        result=1;
    }
    if(data["pg"]!=undefined){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>重金属</td><td>果实</td><td>"+parseFloat(data["pg"])+"</td>"+getMetalJudge(parseFloat(data["pg"]))+"<td>"+data["STAR_DATE"]+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22' data-zj='"+data["ZJ"]+"'>查看对应监控点</button></td></tr>");
        result=1;
    }
    if(data["ny"]!=undefined&&data["ny"]==1){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>农药</td><td>土壤/叶片/果实</td><td>&lt;50%</td><td class='good'>良好</td><td>"+data["STAR_DATE"]+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22' data-zj='"+data["ZJ"]+"'>查看对应监控点</button></td></tr>");
        result=1;
    }
    if(data["ny"]!=undefined&&data["ny"]==0){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>农药</td><td>土壤/叶片/果实</td><td>&gt;50%</td><td class='bad'>超标</td><td>"+data["STAR_DATE"]+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22' data-zj='"+data["ZJ"]+"'>查看对应监控点</button></td></tr>");
        result=1;
    }
    return result;
}

//I05
//初始化
function initI05(json){
    for(var i=0;i<json["01"].length;i++){
        switch (json["01"][i]["Z_NAME"]){
            case "休眠期":
                $("#period2Sleep").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Sleep").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Sleep").attr("data-ny",json["01"][i]["ny"]==undefined ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("休眠期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",createMetalKeyInfo("休眠期","土壤",json["02"][0]));
                createI05TableTr("休眠期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",createMetalKeyInfo("休眠期","果实",json["02"][0]));
                createI05TableTr("休眠期","农药","土壤/果实/叶片","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",null);
                break;
            case "花芽开放期":
                $("#period2Flower").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Flower").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Flower").attr("data-ny",json["01"][i]["ny"]==undefined ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("花芽开放期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Flower",createMetalKeyInfo("花芽开放期","土壤",json["02"][0]));
                createI05TableTr("花芽开放期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Flower",createMetalKeyInfo("花芽开放期","果实",json["02"][0]));
                createI05TableTr("花芽开放期","农药","土壤/果实/叶片","张三",json["01"][i]["STAR_DATE"],"#period2Flower",null);
                break;
            case "抽枝期":
                $("#period2Trunk").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Trunk").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Trunk").attr("data-ny",json["01"][i]["ny"]==undefined ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("抽枝期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",createMetalKeyInfo("抽枝期","土壤",json["02"][0]));
                createI05TableTr("抽枝期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",createMetalKeyInfo("抽枝期","果实",json["02"][0]));
                createI05TableTr("抽枝期","农药","土壤/果实/叶片","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",null);
                break;
            case "完全开放期":
                $("#period2Bloom").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Bloom").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Bloom").attr("data-ny",json["01"][i]["ny"]==undefined ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("完全开放期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",createMetalKeyInfo("完全开放期","土壤",json["02"][0]));
                createI05TableTr("完全开放期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",createMetalKeyInfo("完全开放期","果实",json["02"][0]));
                createI05TableTr("完全开放期","农药","土壤/果实/叶片","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",null);
                break;
            case "成熟期":
                $("#period2Fruit").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Fruit").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Fruit").attr("data-ny",json["01"][i]["ny"]==undefined ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("成熟期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",createMetalKeyInfo("成熟期","土壤",json["02"][0]));
                createI05TableTr("成熟期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",createMetalKeyInfo("成熟期","果实",json["02"][0]));
                createI05TableTr("成熟期","农药","土壤/果实/叶片","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",null);
                break;
        }
    }
    createMetalSafetyGauge("#nowSafetyGauge1",$("#period2Sleep").attr("data-pt"));
    createPesticideSafetyGauge("#nowSafetyGauge2",$("#period2Sleep").attr("data-ny"));
    $("#nowSafetyA").click(function(){
        createMetalSafetyGauge("#nowSafetyGauge1",$("#period2Sleep").attr("data-pt"));
        createPesticideSafetyGauge("#nowSafetyGauge2",$("#period2Sleep").attr("data-ny"));
    });
    $("#period2").change(function(){
        var id=$("#period2 option:selected").attr("id");
        switch ($("#object option:selected").html()){
            case "土壤":
                createMetalSafetyGauge("#nowSafetyGauge1",$("#"+id).attr("data-pt"));
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
            case "叶片":
                createMetalSafetyGauge("#nowSafetyGauge1",null);
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
            case "果实":
                createMetalSafetyGauge("#nowSafetyGauge1",$("#"+id).attr("data-pg"));
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
        }
    });
    $("#object").change(function(){
        var id=$("#period2 option:selected").attr("id");
        switch ($("#object option:selected").html()){
            case "土壤":
                createMetalSafetyGauge("#nowSafetyGauge1",$("#"+id).attr("data-pt"));
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
            case "叶片":
                createMetalSafetyGauge("#nowSafetyGauge1",NaN);
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
            case "果实":
                createMetalSafetyGauge("#nowSafetyGauge1",$("#"+id).attr("data-pg"));
                createPesticideSafetyGauge("#nowSafetyGauge2",$("#"+id).attr("data-ny"));
                break;
        }
    });
    var pesticide=["有机磷","氨基甲酸酯"];
    var metals=["总汞","砷","铅","镉","铬","硒","镍"];
    $("#nowSafetyDetailTable tbody tr").hover(function(){
            var metalInfo = ($(this).attr("data-detail")).split(",");
            if($(this).attr("data-key")=="metal"){
                $(this).parent().parent().parent().next().next().children("div:first-child").children("h5").html("指标计算说明：重金属");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:first-child").html("重金属名称");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:nth-child(2)").html("重金属指标");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").children("tr").remove();
                for(var i=0;i<7;i++){
                    var node=$("<tr><td>"+metals[i]+"</td><td>"+metalInfo[i]+"</td><td>暂无数据</td><td class='good2'>暂无数据</td></tr>");
                    $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").append(node);
                }
                $(".otherImg").attr("src","image/test1.png");
                $(".otherInfo").css("height","370px")
            }else{
                $(this).parent().parent().parent().next().next().children("div:first-child").children("h5").html("指标计算说明：农药");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:first-child").html("农药名称");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:nth-child(2)").html("农药指标");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").children("tr").remove();
                for(var i=0;i<2;i++){
                    var node=$("<tr><td>"+pesticide[i]+"</td><td>暂无数据</td><td>暂无数据</td><td class='good2'>暂无数据</td></tr>");
                    $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").append(node);
                }
                $(".otherImg").attr("src","image/test2.png");
                $(".otherInfo").css("height","580px")
            }
        }
    );
}
//金属残留物图表
function createMetalSafetyGauge(id,value) {
    $(id).kendoRadialGauge({
        pointer: {
            value: value
        },
        scale: {
            minorUnit: 0.1,
            startAngle: -30,
            endAngle: 210,
            max: 5,
            labels: {
                position: "inside"
            },
            ranges: [
                {
                    from: 0,
                    to: 0.7,
                    color: "#70fda4"
                }, {
                    from: 0.7,
                    to: 1.0,
                    color: "#71d3e7"
                }, {
                    from: 1.0,
                    to: 2.0,
                    color: "#8891fd"
                }, {
                    from: 2.0,
                    to: 3.0,
                    color: "#c370e7"
                }
                , {
                    from: 3.0,
                    to: 5.0,
                    color: "#fd6e7f"
                }
            ]
        }
    });
}
//农药残留物图表
function createPesticideSafetyGauge(id,value) {
    $(id).kendoRadialGauge({
        pointer: {
            value: value
        },
        scale: {
            minorUnit: 5,
            startAngle: -30,
            endAngle: 210,
            max: 100,
            labels: {
                position: "inside"
            },
            ranges: [
                {
                    from: 0,
                    to: 50,
                    color: "#8891fd"
                }, {
                    from: 50,
                    to: 100,
                    color: "#c370e7"
                }
            ]
        }
    });
}
//获得金属评价
function getMetalJudge(number){
    if(number<=0.7){
        return "<td class='excellent'>极好</td>";
    }else if(number<=1){
        return "<td class='great'>优秀</td>";
    }else if(number<=2){
        return "<td class='good'>良好</td>";
    }else if(number<=3){
        return "<td class='bad'>超标</td>";
    }else if(number>3){
        return "<td class='suck'>严重超标</td>";
    }else{
        return "<td>暂无相关信息</td>";
    }
}
//获得农药评价
function getNYJudge(number){
    if(number==1){
        return "<td>&lt;50%</td><td class='good'>良好</td>";
    }else{
        return "<td>&gt;50%</td><td class='bad'>超标</td>";
    }
}
//添加详细信息表格项
function createI05TableTr(name,key,object,people,time,id,detail){
    var datakey,attr,metalObject;
    if(key=="重金属"){
        datakey="metal";
        if(object=="土壤"){
            attr="data-pt";
            if($(id).attr(attr)=="null"){
                return;
            }
            metalObject="mud";
        }else if(object=="果实"){
            attr="data-pg";
            if($(id).attr(attr)=="null"){
                return;
            }
            metalObject="fruit";
        }
        $("#nowSafetyDetailTable").children("tbody").append("<tr data-key='"+datakey+"' data-metal='"+metalObject+"' data-detail='"+detail+"'><td>"+name+"</td><td>"+key+"</td><td>"+object+"</td><td>"+$(id).attr(attr)+"</td>"+getMetalJudge(parseFloat($(id).attr(attr)))+"<td>"+people+"</td><td>"+time+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22'>查看对应监控点</button></td></tr>");
    }else{
        datakey="pesticide";
        attr="data-ny";
        if($(id).attr(attr)=="null"){
            return;
        }
        metalObject="null";
        $("#nowSafetyDetailTable").children("tbody").append("<tr data-key='"+datakey+"' data-metal='"+metalObject+"' data-detail='"+detail+"'><td>"+name+"</td><td>"+key+"</td><td>"+object+"</td>"+getNYJudge(parseInt($(id).attr(attr)))+"<td>"+people+"</td><td>"+time+"</td><td><button type='button' class='btn btn-default btn-xs gotoF22'>查看对应监控点</button></td></tr>");
    }
}
//添加金属分指标
function createMetalKeyInfo(period,object,array){
    //var metals=["总汞","砷","铅","镉","铬","硒","镍"];
    var metals=["暂无数据","暂无数据","暂无数据","暂无数据","暂无数据","暂无数据","暂无数据"];
    for(var i=0;i<array.length;i++){
        if(array[i]["Z_NAME"]==period && array[i]["OBJ_NAME"]==object){
            switch(array[i]["ZB_NAME"]){
                case "镍 Ni":
                    metals[6]=parseFloat(array[i]["VALUE"]);
                    break;
                case "硒 Se":
                    metals[5]=parseFloat(array[i]["VALUE"]);
                    break;
                case "铬 Cr":
                    metals[4]=parseFloat(array[i]["VALUE"]);
                    break;
                case "镉 Cd":
                    metals[3]=parseFloat(array[i]["VALUE"]);
                    break;
                case "铅 Pb":
                    metals[2]=parseFloat(array[i]["VALUE"]);
                    break;
                case "总汞 THg":
                    metals[0]=parseFloat(array[i]["VALUE"]);
                    break;
                case "砷 As":
                    metals[1]=parseFloat(array[i]["VALUE"]);
                    break;
            }
        }
    }
    var result = "";
    for(var j=0;j<7;j++){
        if(j!=6){
            result+=(metals[j]).toString()+",";
        }else{
            result+=(metals[j]).toString();
        }
    }
    return result;
}


//I06
//测试使用线图
function pointChart() {
    $("#pointChart").kendoChart({
        title: {
            text: "监控指标历史数据"
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
            name: "土壤",
            data: [3, 7, 7, 9, 9, 9, 3, 8, 9, 6]
        },{
            name: "叶片",
            data: [1, 2, 3, 3, 4, 3, 1, 2, 4, 2]
        },{
            name: "果实",
            data: [4, 7, 7, 6, 8, 8, 5, 7, 4, 4]
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            title: { text: "农药浓度(毫克/千克)" }
        },
        categoryAxis: {
            categories: ["开花期:11/1~12/1","开花期12/1~1/1","开花期1/1~2/1","开花期2/1~3/1","开花期3/1~4/1","开花期4/1~5/1","开花期5/1~6/1","开花期6/1~7/1","开花期7/1~8/1","开花期8/1~9/1"],
            majorGridLines: {
                visible: false
            },
            baseUnitStep: "auto"
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= series.name #: #= value # 毫克/千克"
        }
    });
}

//通用
//打印表格
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

//ajax
//i01
function ajaxI01(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            //get the result and process it
            console.log(url);
            initI01(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(url);
            alert("调用服务器数据失败，调用本地测试数据");
            initI01(i01);
        }
    });
}
//i02
function ajaxI02(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            //get the result and process it
            console.log(url);
            initI02(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(url);
            alert("调用服务器数据失败，调用本地测试数据");
            initI02(i02);
        }
    });
}
//i03
function ajaxI03(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            //get the result and process it
            console.log(url);
            initI03(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(url);
            alert("调用服务器数据失败，调用本地测试数据");
            initI03(i03);
        }
    });
}
//i04
function ajaxI04(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            //get the result and process it
            console.log(url);
            initI04(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(url);
            alert("调用服务器数据失败，调用本地测试数据");
            initI04(i04);
        }
    });
}
//i05
function ajaxI05(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            //get the result and process it
            console.log(url);
            initI05(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(url);
            alert("调用服务器数据失败，调用本地测试数据");
            initI05(i05);
        }
    });
}

$(document).ready(function() {
    //ajax
    var url= window.location.href;
    if(url.lastIndexOf("?")==-1){
        url += "?tit=I01&dw=JC-ZCGZ-140103-0003";
        window.location.href=url;
    }
    var urlArguments=url.slice(url.lastIndexOf("?")+1,url.length);
    var urlAddress="192.168.1.2:8080/Portal/data.action?"+urlArguments;

    ajaxI01(urlAddress);
    //01
    $("#mapDivA").click(function(){
        ajaxI01("192.168.1.2:8080/Portal/data.action?"+urlArguments);
    });
    //02
    $("#growPeriodA").click(function(){
        var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
        ajaxI02("192.168.1.2:8080/Portal/data.action?tit=I02&pc="+temp);
    });
    $("#growPeriodBatchID").change(function(){
        var temp=$("#growPeriodBatchID option:selected").attr("data-zj");
        ajaxI02("192.168.1.2:8080/Portal/data.action?tit=I02&pc="+temp);
    });
    //03
    $("#dataManagementA").click(function(){
        ajaxI03("192.168.1.2:8080/Portal/data.action?tit=I03");
    });
    //04
    $("#periodSafetyA").click(function(){
        var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
        ajaxI04("192.168.1.2:8080/Portal/data.action?tit=I04&pc="+temp);
    });
    $("#periodSafetyInfoBID").change(function(){
        var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
        ajaxI04("192.168.1.2:8080/Portal/data.action?tit=I04&pc="+temp);
    });

    //initI01(i01);
    //initI02(i02);
    //initI03(i03);
    //initI04(i04);
    initI05(i05);
    $(".gotoF22").click(function(){
            $('#myTab a[href="#test"]').tab('show');
        }
    );
    periodSafetyChart();
    pointChart();
    $(".periodSafetyTable").tablecloth({
        theme: "default",
        bordered: true,
        striped: true,
        sortable: true
    });
    $(".nowSafetyTable1").tablecloth({
        theme: "default",
        bordered: true,
        striped: true,
        sortable: true
    });
    $(".nowSafetyTable2").tablecloth({
        theme: "default",
        bordered: true,
        sortable: true
    });
});

