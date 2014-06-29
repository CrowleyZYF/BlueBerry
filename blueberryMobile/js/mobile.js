/**
 * Created by Castiel.ZYF on 14-5-25.
 */
var i04New=[{"PC_ZJ":"ZZPC-140104-0000","STAR_DATE":"2014-01-14","ZQ_ZJ":"PZ-140103-0009","ZJ":"ZZPC-140104-00001","END_DATE":"2014-01-19","pt":".25","REMARK":null,"Z_NAME":"休眠期","PC_NO":"002","XL":1},{"PC_ZJ":"ZZPC-140104-0000","STAR_DATE":"2014-01-20","ZQ_ZJ":"PZ-140103-0008","ZJ":"ZZPC-140104-00002","END_DATE":"2014-02-26","pt":".75","REMARK":null,"Z_NAME":"开花期","PC_NO":"002","XL":2},{"PC_ZJ":"ZZPC-140104-0000","STAR_DATE":"2014-01-26","ZQ_ZJ":"PZ-140103-0007","ZJ":"ZZPC-140104-00003","END_DATE":"2014-02-01","pt":".95","REMARK":null,"Z_NAME":"抽枝期","PC_NO":"002","XL":3},{"PC_ZJ":"ZZPC-140104-0000","STAR_DATE":"2014-02-01","ZQ_ZJ":"PZ-140103-0006","ZJ":"ZZPC-140104-00004","END_DATE":"2014-02-10","pt":".05","REMARK":null,"Z_NAME":"完全开花期","PC_NO":"002","XL":4},{"PC_ZJ":"ZZPC-140104-0000","STAR_DATE":"2014-02-10","ZQ_ZJ":"PZ-140103-0005","ZJ":"ZZPC-140104-00005","END_DATE":"2014-02-16","pt":"3.25","pg":"3","ny":"1","REMARK":null,"Z_NAME":"成熟期","PC_NO":"002","XL":5}];
var i08=[
    {"ZY_TYPE":"01","TYPENAME":"施肥1","PC_ZJ":"ZZPC-140104-0000","ZJ":"ZZPC-140104-00000","CONTENT":"1233","REMARK":"撒旦飞1","ADDTIME":"2014-05-09"},
    {"ZY_TYPE":"01","TYPENAME":"施肥2","PC_ZJ":"ZZPC-140104-0000","ZJ":"ZZPC-140104-00000","CONTENT":"1234","REMARK":"撒旦飞2","ADDTIME":"2014-05-12"},
    {"ZY_TYPE":"01","TYPENAME":"施肥3","PC_ZJ":"ZZPC-140104-0000","ZJ":"ZZPC-140104-00000","CONTENT":"1235","REMARK":"撒旦飞3","ADDTIME":"2014-05-01"},
    {"ZY_TYPE":"01","TYPENAME":"施肥4","PC_ZJ":"ZZPC-140104-0000","ZJ":"ZZPC-140104-00000","CONTENT":"1236","REMARK":"撒旦飞4","ADDTIME":"2014-05-07"},
    {"ZY_TYPE":"01","TYPENAME":"施肥5","PC_ZJ":"ZZPC-140104-0000","ZJ":"ZZPC-140104-00000","CONTENT":"1237","REMARK":"撒旦飞5","ADDTIME":"2014-05-11"}
];
function createPesticideSafetyGauge(value) {
    $("#chart2").kendoLinearGauge({
        pointer: {
            value: value,
            shape: "arrow",
            size:15
        },
        scale: {
            majorUnit: 10,
            minorUnit: 1,
            min: 0,
            max: 100,
            vertical: false,
            ranges: [
                {
                    from: 0,
                    to: 50,
                    color: "#BFC4E3"
                }, {
                    from: 50,
                    to: 100,
                    color: "#F2CDD0"
                }
            ]
        }
    });
    /*
    $("#chart2").kendoRadialGauge({
        title: {
            text: "金属残留物基本情况图表"
        },
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
    */
}
function createBaseInfo2(data1,data2){
    $("#chart").kendoChart({
        title: {
            text: "金属残留物基本情况图表"
        },
        chartArea: {
            background: null
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "column",
            data: data1,
            name: "土壤金属残留物",
            color: "#ff8c31",
            axis: "js"
        },{
            type: "column",
            data: data2,
            name: "果实金属残留物",
            color: "#9ed048",
            axis: "js"
        }],
        valueAxes: [{
            name: "js",
            title: { text: "金属残留物" },
            min:0,
            max:4,
            plotBands: [{
                from: 0,
                to: 2,
                color: "#4b5cc4",
                opacity: 0.3
            }, {
                from: 2,
                to: 4,
                color: "#f47983",
                opacity: 0.3
            }]
        }],
        categoryAxis: {
            categories: ["休眠期","花芽开放期","抽枝期","完全开放期","成熟期"],
            majorGridLines: {
                visible: false
            },
            baseUnitStep: "auto"
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= series.name #: #= value #"
        }
    });
}
function initI08(json){
    $("#pzName").html(json[0]["PC_ZJ"]);
    for(var i=0;i<json.length-1;i++){
        for(var j=i+1;j<json.length;j++){
            if(new Date((json[i]['ADDTIME']).replace("-", "/").replace("-", "/"))<new Date((json[j]['ADDTIME']).replace("-", "/").replace("-", "/"))){
                var temp=json[i];
                json[i]=json[j];
                json[j]=temp;
            }
        }
    }
    for(var i=0;i<json.length;i++){
        if(i==0){
            var li=$("<li class='specialLi'></li>");
            var div=$("<div class='circleActive'></div>");
            var p1=$("<p style='padding-top: 15px' class='activeP'><span>"+json[i]["TYPENAME"]+"</span><span class='smallFont' style='padding-left: 20px'>"+json[i]["CONTENT"]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说明："+json[i]["TRP_NAME"]+"</span></p>");
            var p2=$("<p class='smallFont activeP'>"+json[i]["ADDTIME"]+"</p>");
            li.append(div).append(p1).append(p2);
            $("#trace").append(li);
        }else{
            var li=$("<li class='specialLi'></li>");
            var div=$("<div class='circle'></div>");
            var p1=$("<p style='padding-top: 15px'><span>"+json[i]["TYPENAME"]+"</span><span class='smallFont' style='padding-left: 20px'>"+json[i]["CONTENT"]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说明："+json[i]["TRP_NAME"]+"</span></p>");
            var p2=$("<p class='smallFont'>"+json[i]["ADDTIME"]+"</p>");
            li.append(div).append(p1).append(p2);
            $("#trace").append(li);
        }
    }
    var li=$("<li id='specialLi'></li>");
    $("#trace").append(li);
    $("#specialLi").css("height",json.length*130-130);
    $("#specialLi").css("margin-top","80px");
}
function initI04(json){
    var temp=[0,0,0,0,0];
    var temp2=[0,0,0,0,0];
    for(var i=4;i>=0;i--){
        if(json[i]["pt"]!=undefined){
            temp[i]=parseFloat(json[i]["pt"]);
        }else{
            temp[i]=0;
        }
        if(json[i]["pt"]!=undefined&&json[i]["ny"]!=undefined){
            if(json[i]["pt"]!=undefined){
                $("#pt").html(parseFloat(json[i]["pt"]));
                if(parseFloat($("#pt").html())>=2){
                    $("#pt").next().removeClass("judge").addClass("judgeBad");
                    $("#pt").next().html("差");
                }
            }else{
                $("#pt").html("暂无数据");
            }
            if(json[i]["ny"]!=3){
                $("#ny").html(json[i]["ny"]==1?"不达标":"达标");
                if($("#ny").html()=="不达标"){
                    $("#ny").next().removeClass("judge").addClass("judgeBad");
                    $("#ny").next().html("差");
                }
            }else{
                $("#ny").html("暂无数据");
            }
        }
        if(i==4){
            if(json[i]["pg"]!=undefined){
                temp[i]=parseFloat(json[i]["pt"]);
            }else{
                temp[i]=0;;
            }
        }
    }
    createBaseInfo2(temp,temp2);
    createPesticideSafetyGauge(23)
}
function createBaseInfo1(temp){
    $("#chart").kendoChart({
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
            data: temp,
            name: "土壤重金属",
            color: "#88B022"
        }],
        valueAxis: {
            labels: {
                format: "{0}"
            },
            line: {
                visible: true
            },
            title: { text: "含量（单位：mg/kg）" },
            min:0,
            max:3
        },
        categoryAxis: {
            categories: ["休眠期","花芽开放期","抽枝期","完全开放期","成熟期"],
            majorGridLines: {
                visible: false
            },
            baseUnitStep: "auto"
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= series.name #: #= value #"
        }
    });
}
$(document).ready(function(){
    $(".specialA").click(function(){
        location.href=$(this).attr("data-href");
    })
    var width=$("body").css("width");
    $(".specialImg").css("width",width);
    var url= window.location.href;
    if(url.lastIndexOf("?")==-1){
        url += "?pc=ZZPC-140529-0001";
        window.location.href=url;
    }
    var urlArguments=url.slice(url.lastIndexOf("?")+1,url.length);
    var urlAddress="../data.action?tit=I08&"+urlArguments;
    var urlAddress2="../data.action?tit=I04&"+urlArguments;

    $("#index").attr("data-href","index.html?"+urlArguments);
    $("#safe").attr("data-href","safe.html?"+urlArguments);
    $("#pictures").attr("data-href","picture.html?"+urlArguments);

    $.ajax({
        type:"GET",
        url:urlAddress,
        dataType:"json",
        success:function(json){
            initI08(json);
        },
        error:function(){
            initI08(i08);
        }
    });
    $.ajax({
        type:"GET",
        url:urlAddress2,
        dataType:"json",
        success:function(json){
            initI04(json);
        },
        error:function(){
            initI04(i04New);
        }
    });
})
