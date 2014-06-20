/**
 * Created by Castiel.ZYF on 14-4-22.
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

function initI04(json){
    for(var i=0;i<5;i++){
        switch (json[i]["Z_NAME"]){
            case "休眠期":
                $("#period2Sleep").attr("data-id",json[i]["ZJ"]);
                break;
            case "开花期":
                $("#period2Flower").attr("data-id",json[i]["ZJ"]);
                break;
            case "抽枝期":
                $("#period2Trunk").attr("data-id",json[i]["ZJ"]);
                break;
            case "完全开花期":
                $("#period2Bloom").attr("data-id",json[i]["ZJ"]);
                break;
            case "成熟期":
                $("#period2Fruit").attr("data-id",json[i]["ZJ"]);
                break;
        }
    }
    var temp2=$("#period2 option:selected").attr("data-id");
    console.log(temp2);
    ajaxI05("../data.action?tit=I05&pc_zq="+temp2);
}

function initI05(json){
    $("#nowSafetyDetailTable tbody").children().remove();
    for(var i=0;i<json["01"].length;i++){
        switch (json["01"][i]["Z_NAME"]){
            case "休眠期":
                $("#period2Sleep").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Sleep").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Sleep").attr("data-ny",json["01"][i]["ny"]==3 ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("休眠期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",createMetalKeyInfo("休眠期","土壤",json["02"][0]));
                createI05TableTr("休眠期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",createMetalKeyInfo("休眠期","果实",json["02"][0]));
                createI05TableTr("休眠期","农药","果实","张三",json["01"][i]["STAR_DATE"],"#period2Sleep",null);
                break;
            case "开花期":
                $("#period2Flower").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Flower").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Flower").attr("data-ny",json["01"][i]["ny"]==3 ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("花芽开放期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Flower",createMetalKeyInfo("花芽开放期","土壤",json["02"][0]));
                createI05TableTr("花芽开放期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Flower",createMetalKeyInfo("花芽开放期","果实",json["02"][0]));
                createI05TableTr("花芽开放期","农药","果实","张三",json["01"][i]["STAR_DATE"],"#period2Flower",null);
                break;
            case "抽枝期":
                $("#period2Trunk").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Trunk").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Trunk").attr("data-ny",json["01"][i]["ny"]==3 ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("抽枝期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",createMetalKeyInfo("抽枝期","土壤",json["02"][0]));
                createI05TableTr("抽枝期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",createMetalKeyInfo("抽枝期","果实",json["02"][0]));
                createI05TableTr("抽枝期","农药","果实","张三",json["01"][i]["STAR_DATE"],"#period2Trunk",null);
                break;
            case "完全开放期":
                $("#period2Bloom").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Bloom").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Bloom").attr("data-ny",json["01"][i]["ny"]==3 ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("完全开放期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",createMetalKeyInfo("完全开放期","土壤",json["02"][0]));
                createI05TableTr("完全开放期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",createMetalKeyInfo("完全开放期","果实",json["02"][0]));
                createI05TableTr("完全开放期","农药","果实","张三",json["01"][i]["STAR_DATE"],"#period2Bloom",null);
                break;
            case "成熟期":
                $("#period2Fruit").attr("data-pt",json["01"][i]["pt"]==undefined ? "null" : parseFloat(json["01"][i]["pt"]));
                $("#period2Fruit").attr("data-pg",json["01"][i]["pg"]==undefined ? "null" : parseFloat(json["01"][i]["pg"]));
                $("#period2Fruit").attr("data-ny",json["01"][i]["ny"]==3 ? "null" : parseInt(json["01"][i]["ny"]));
                createI05TableTr("成熟期","重金属","土壤","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",createMetalKeyInfo("成熟期","土壤",json["02"][0]));
                createI05TableTr("成熟期","重金属","果实","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",createMetalKeyInfo("成熟期","果实",json["02"][0]));
                createI05TableTr("成熟期","农药","果实","张三",json["01"][i]["STAR_DATE"],"#period2Fruit",null);
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
    var answer1=[0.01,0.5,0.1,0.05,0.5,0.05,"暂无标准"];
    var answer2=[0.5,30,300,0.6,200,"暂无标准",50];
    var metalInfo = ($("#nowSafetyDetailTable tbody tr:first-child").attr("data-detail")).split(",");
    if($("#nowSafetyDetailTable tbody tr:first-child").attr("data-key")=="metal"){
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("h5").html("指标计算说明：重金属");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:first-child").html("重金属名称");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:nth-child(2)").html("重金属指标");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").children("tr").remove();
        for(var i=0;i<7;i++){
            if($("#nowSafetyDetailTable tbody tr:first-child").attr("data-metal")=="mud"){
                var node=$("<tr><td>"+metals[i]+"</td><td>"+metalInfo[i]+"</td><td>"+answer2[i]+"</td><td class='"+(testString=metalInfo[i]<answer2[i]?'good':'suck')+"'>"+(testString=metalInfo[i]<answer2[i]?'达标':'超标')+"</td></tr>");
            }else{
                var node=$("<tr><td>"+metals[i]+"</td><td>"+metalInfo[i]+"</td><td>"+answer1[i]+"</td><td class='"+(testString=metalInfo[i]<answer1[i]?'good':'suck')+"'>"+(testString=metalInfo[i]<answer1[i]?'达标':'超标')+"</td></tr>");
            }
            $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").append(node);
        }
    }else{
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("h5").html("指标计算说明：农药");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:first-child").html("农药名称");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:nth-child(2)").html("农药指标");
        $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").children("tr").remove();
        for(var i=0;i<2;i++){
            var node=$("<tr><td>"+pesticide[i]+"</td><td>暂无数据</td><td>暂无数据</td><td class='good2'>暂无数据</td></tr>");
            $("#nowSafetyDetailTable tbody tr:first-child").parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").append(node);
        }}
    $("#nowSafetyDetailTable tbody tr").hover(function(){
            var metalInfo = ($(this).attr("data-detail")).split(",");
            if($(this).attr("data-key")=="metal"){
                $(this).parent().parent().parent().next().next().children("div:first-child").children("h5").html("指标计算说明：重金属");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:first-child").html("重金属名称");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("thead").children("tr").children("th:nth-child(2)").html("重金属指标");
                $(this).parent().parent().parent().next().next().children("div:first-child").children("div").children("table").children("tbody").children("tr").remove();
                for(var i=0;i<7;i++){
                    if($(this).attr("data-metal")=="mud"){
                        var node=$("<tr><td>"+metals[i]+"</td><td>"+metalInfo[i]+"</td><td>"+answer2[i]+"</td><td class='"+(testString=metalInfo[i]<answer2[i]?'good':'suck')+"'>"+(testString=metalInfo[i]<answer2[i]?'达标':'超标')+"</td></tr>");
                    }else{
                        var node=$("<tr><td>"+metals[i]+"</td><td>"+metalInfo[i]+"</td><td>"+answer1[i]+"</td><td class='"+(testString=metalInfo[i]<answer1[i]?'good':'suck')+"'>"+(testString=metalInfo[i]<answer1[i]?'达标':'超标')+"</td></tr>");
                    }
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
        $("#nowSafetyDetailTable").children("tbody").append("<tr data-key='"+datakey+"' data-metal='"+metalObject+"' data-detail='"+detail+"'><td>"+name+"</td><td>"+key+"</td><td>"+object+"</td><td>"+$(id).attr(attr)+"</td>"+getMetalJudge(parseFloat($(id).attr(attr)))+"<td>"+people+"</td><td>"+time+"</td></tr>");
    }else{
        datakey="pesticide";
        attr="data-ny";
        if($(id).attr(attr)=="null"){
            return;
        }
        metalObject="null";
        $("#nowSafetyDetailTable").children("tbody").append("<tr data-key='"+datakey+"' data-metal='"+metalObject+"' data-detail='"+detail+"'><td>"+name+"</td><td>"+key+"</td><td>"+object+"</td>"+getNYJudge(parseInt($(id).attr(attr)))+"<td>"+people+"</td><td>"+time+"</td></tr>");
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
function ajaxI04(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI04(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI04(i04);
        }
    });
}
function ajaxI05(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI05(json);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI05(i05);
        }
    });
}
function getNowCookie(){
    var cookieList = {};
    var all = document.cookie;
    if(all === ""){
        return cookieList;
    }
    var list = all.split(";");
    for(var i = 0;i<list.length;i++){
        var cookie = list[i];
        var p = cookie.indexOf("=");
        if(i==0){
            var name = cookie.substring(0,p);
        }else{
            var name = cookie.substring(1,p);
        }
        var value = cookie.substring(p+1);
        value = decodeURIComponent(value);
        cookieList[name] = value;
    }
    return cookieList;
}
function getCookie(name){
    var cookie = getNowCookie();
    if(cookie[name]!=undefined){
        return cookie[name];
    }else{
        return null;
    }
}
$(document).ready(function() {
    var url= window.location.href;
    if(url.lastIndexOf("?")==-1){
        url += "?dw=JC-ZCGZ-140103-0003";
        window.location.href=url;
    }
    var urlArguments=url.slice(url.lastIndexOf("?")+1,url.length);
    var urlAddress="../data.action?tit=I01&"+urlArguments;
    var peroid = (getCookie("data-type"));
    for(var i=0;i<5;i++){
        if(peroid == $($("#period2 option")[i]).html()){
            $("#period2 option")[i].selected=true;
        }
    }

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
            ajaxI04("../data.action?tit=I04&pc="+temp);
            for(var i=0;i<json["jkdList"][0].length;i++){
                $("#pointMenu").append("<li><a class='toPoint' data-href='"+$("#pointA").attr("href")+"' data-zj='"+json["jkdList"][0][i]["ZJ"]+"'>"+json["jkdList"][0][i]["NAME"]+"</a></li>")
            }
            $(".toPoint").click(function(){
                var cookie = "data-jkdZJ" + "=" + $(this).attr("data-zj");
                document.cookie = cookie;
                var cookie = "data-zqZJ" + "=" + $("#peroid2 option:selected").attr("data-id");
                document.cookie = cookie;
                location.href=$(this).attr("data-href");
            })
        },
        error:function(){
            $("#periodSafetyInfoBID").children().remove();
            for(var i=0;i<i01["zzpcList"].length;i++){
                $("#periodSafetyInfoBID").append("<option data-zj='"+i01["zzpcList"][i][0]["ZJ"]+"' data-name='"+i01["zzpcList"][i][0]["P_NAME"]+"'>"+i01["zzpcList"][i][0]["PC_NO"]+"</option>");
            }
            var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
            ajaxI04("../data.action?tit=I04&pc="+temp);
            for(var i=0;i<i01["jkdList"][0].length;i++){
                $("#pointMenu").append("<li><a class='toPoint' data-href='"+$("#pointA").attr("href")+"' data-zj='"+i01["jkdList"][0][i]["ZJ"]+"'>"+i01["jkdList"][0][i]["NAME"]+"</a></li>")
            }
            $(".toPoint").click(function(){
                var cookie = "data-jkdZJ" + "=" + $(this).attr("data-zj");
                document.cookie = cookie;
                var cookie = "data-zqZJ" + "=" + $("#period2 option:selected").attr("data-id");
                document.cookie = cookie;
                location.href=$(this).attr("data-href");
            })
        }
    });
    $("#periodSafetyInfoBID").change(function(){
        var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
        ajaxI04("../data.action?tit=I04&pc="+temp);
    });
    $("#period2").change(function(){
        var temp2=$("#period2 option:selected").attr("data-id");
        ajaxI05("../data.action?tit=I05&pc_zq="+temp2);
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