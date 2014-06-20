/**
 * Created by Castiel.ZYF on 14-4-20.
 */
var dataJSMud=[];
var dataJSFruit=[];
var dataNYFruit=0;
var timeString=[];
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
function initI04(json){
    $(".periodSafetyTable tbody").children().remove();
    dataJSMud=[];
    dataJSFruit=[];
    dataNYFruit=0;
    timeString=[];
    var haveNoData=[0,0,0,0,0];
    for(var i=0;i<json.length;i++){
        if(json[i]["STAR_DATE"]!=null){
            switch (json[i]["Z_NAME"]){
                case "休眠期":
                    haveNoData[0]=addItem("#periodSafetyTable1","休眠期",json[i]);
                    createPesticideSafetyGauge("#periodSafetyChart",1);
                    $("#nyTitle").html("果实农药残留（暂无数据）");
                    timeString.push(json[i]["Z_NAME"]+"："+json[i]["STAR_DATE"].slice(5,10)+"至"+json[i]["END_DATE"].slice(5,10));
                    break;
                case "开花期":
                    haveNoData[1]=addItem("#periodSafetyTable2","开花期",json[i]);
                    timeString.push(json[i]["Z_NAME"]+"："+json[i]["STAR_DATE"].slice(5,10)+"至"+json[i]["END_DATE"].slice(5,10));
                    break;
                case "抽枝期":
                    haveNoData[2]=addItem("#periodSafetyTable3","抽枝期",json[i]);
                    timeString.push(json[i]["Z_NAME"]+"："+json[i]["STAR_DATE"].slice(5,10)+"至"+json[i]["END_DATE"].slice(5,10));
                    break;
                case "完全开花期":
                    haveNoData[3]=addItem("#periodSafetyTable4","完全开花期",json[i]);
                    timeString.push(json[i]["Z_NAME"]+"："+json[i]["STAR_DATE"].slice(5,10)+"至"+json[i]["END_DATE"].slice(5,10));
                    break;
                case "成熟期":
                    haveNoData[4]=addItem("#periodSafetyTable5","成熟期",json[i]);
                    timeString.push(json[i]["Z_NAME"]+"："+json[i]["STAR_DATE"].slice(5,10)+"至"+json[i]["END_DATE"].slice(5,10));
                    break;
            }
        }
    }
    for(var j=0;j<json.length;j++){
        if(haveNoData[j]==0){
            var idString="#periodSafetyTable"+(j+1);
            $(idString).children("tbody").append("<tr><td colspan='7'>暂无相关数据</td></tr>");
        }
    }
    createBaseInfo2(dataJSMud,dataJSFruit,timeString);
}
//基本情况
function createBaseInfo2(data1,data2,categories){
    $("#timeline1").kendoChart({
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
                to: 2.1,
                color: "#f47983",
                opacity: 0.9
            }]
        }],
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
        }
    });
}
//测试使用箱图
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
//添加表格项目
function addItem(id,name,data){
    var result=0;
    if(data["pt"]!=undefined){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>重金属</td><td>土壤</td><td>"+parseFloat(data["pt"])+"</td>"+getMetalJudge(parseFloat(data["pt"]))+"<td>"+data["STAR_DATE"]+"</td></tr>");
        dataJSMud.push(parseFloat(data["pt"]));
        result=1;
    }else{
        dataJSMud.push(0);
    }
    if(data["pg"]!=undefined){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>重金属</td><td>果实</td><td>"+parseFloat(data["pg"])+"</td>"+getMetalJudge(parseFloat(data["pg"]))+"<td>"+data["STAR_DATE"]+"</td></tr>");
        dataJSFruit.push(parseFloat(data["pg"]));
        result=1;
    }else{
        dataJSFruit.push(0);
    }
    if(data["ny"]!=undefined&&data["ny"]==1){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>农药</td><td>果实</td><td>&lt;50%</td><td class='good'>良好</td><td>"+data["STAR_DATE"]+"</td></tr>");
        result=1;
        createPesticideSafetyGauge("#periodSafetyChart",1);
        $("#nyTitle").html("果实农药残留");
    }
    if(data["ny"]!=undefined&&data["ny"]==0){
        $(id).children("tbody").append("<tr><td>"+name+"</td><td>农药</td><td>果实</td><td>&gt;50%</td><td class='bad'>超标</td><td>"+data["STAR_DATE"]+"</td></tr>");
        result=1;
        createPesticideSafetyGauge("#periodSafetyChart",2);
        $("#nyTitle").html("果实农药残留");
    }
    return result;
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
function ajaxI04(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI04(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            if (Math.random() > 0.5){
                initI04(i04New);
            }else{
                initI04(i04New);
            }
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
            $("#periodSafetyInfoBID").children().remove();
            for(var i=0;i<json["zzpcList"][0].length;i++){
                $("#periodSafetyInfoBID").append("<option data-zj='"+json["zzpcList"][0][i]["ZJ"]+"' data-name='"+json["zzpcList"][0][i]["P_NAME"]+"'>"+json["zzpcList"][0][i]["PC_NO"]+"</option>");
            }
            var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
            $("#productName").html($("#periodSafetyInfoBID option:selected").attr("data-name"));
            ajaxI04("../data.action?tit=I04&pc="+temp);
        },
        error:function(){
            $("#periodSafetyInfoBID").children().remove();
            for(var i=0;i<i01["zzpcList"][0].length;i++){
                $("#periodSafetyInfoBID").append("<option data-zj='"+i01["zzpcList"][0][i]["ZJ"]+"' data-name='"+i01["zzpcList"][0][i]["P_NAME"]+"'>"+i01["zzpcList"][0][i]["PC_NO"]+"</option>");
            }
            var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
            $("#productName").html($("#periodSafetyInfoBID option:selected").attr("data-name"));
            ajaxI04("../data.action?tit=I04&pc="+temp);
        }
    });
    $("#periodSafetyInfoBID").change(function(){
        var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
        $("#productName").html($("#periodSafetyInfoBID option:selected").attr("data-name"));
        ajaxI04("../data.action?tit=I04&pc="+temp);
    });
    $(".periodSafetyTable").tablecloth({
        theme: "default",
        bordered: true,
        striped: true,
        sortable: true
    });
    $(".nowSafe").click(function(){
        var cookie = "data-type" + "=" + $(this).attr("data-type");
        document.cookie = cookie;
        location.href=$("#nowSafetyA").attr("href");
    })
});
