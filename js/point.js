/**
 * Created by Castiel.ZYF on 14-5-8.
 */
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

function initI04(json,baseName){
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
    var jkd = $("#jkdName").attr("data-id");
    ajaxI06("../data.action?tit=I06&zzpc_zq="+temp2+"&jkd_zj="+jkd,baseName);
    console.log("../data.action?tit=I06&zzpc_zq="+temp2+"&jkd_zj="+jkd);
    $("#period2").change(function(){
        var temp2=$("#period2 option:selected").attr("data-id");
        console.log(temp2);
        var jkd = $("#jkdName").attr("data-id");
        ajaxI06("../data.action?tit=I06&zzpc_zq="+temp2+"&jkd_zj="+jkd,baseName);
        console.log("../data.action?tit=I06&zzpc_zq="+temp2+"&jkd_zj="+jkd);
    });
}

function initI06(json,baseName){
    var info={
        "ZBK-71":"镍 Ni",
        "ZBK-61":"硒 Se",
        "ZBK-51":"铬 Cr",
        "ZBK-41":"镉 Cd",
        "ZBK-010":"铅 Pb",
        "ZBK-009":"总汞 THg",
        "ZBK-008":"砷 As"
    }
    var info2={
        "ZBK-71":"镍 Ni",
        "ZBK-61":"硒 Se",
        "ZBK-51":"铬 Cr",
        "ZBK-41":"镉 Cd",
        "ZBK-010":"铅 Pb",
        "ZBK-009":"总汞 THg",
        "ZBK-008":"砷 As"
    }
    $("#nowSafetyDetailTable tbody").children().remove();
    for(var i=0;i<json.length;i++){
        //var node=$("<tr><td>"+(i+1)+"</td><td>"+info[json[i]['ZB_ZJ']]+"</td><td>"+baseName+"</td><td>"+$("#periodSafetyInfoBID option:selected").html()+"</td><td>"+$("#period2 option:selected").html()+"</td><td>"+$("#jkdName").html()+"</td><td>"+json[i]['VALUE']+"</td><td>暂无</td><td>"+json[i]['ADD_TIME']+"</td><td>暂无</td></tr>");
        var node=$("<tr><td>"+(i+1)+"</td><td>"+json[i]['OBJ_NAME']+"："+json[i]['ZB_NAME']+"</td><td>"+baseName+"</td><td>"+$("#periodSafetyInfoBID option:selected").html()+"</td><td>"+$("#period2 option:selected").html()+"</td><td>"+$("#jkdName").html()+"</td><td>"+json[i]['VALUE']+"</td><td>暂无</td><td>"+json[i]['ADD_TIME']+"</td><td>暂无</td></tr>");
        $("#nowSafetyDetailTable tbody").append(node);
    }
    $("#dataLeft").css("height",$("#dataRight").css("height"));

}

function ajaxI04(url,baseName){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI04(json,baseName);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI04(i04,baseName);
        }
    });
}
function ajaxI06(url,baseName){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"json",
        success:function(json){
            initI06(json,baseName);
        },
        error:function(jqXHR, textStatus, errorThrown){
            initI06(i06,baseName);
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
    var baseName;
    $.ajax({
        type:"GET",
        url:urlAddress,
        dataType:"json",
        success:function(json){
            baseName=json["base"][0]["NAME"];
            var jkdZJ=getCookie("data-jkdZJ");
            if(!(jkdZJ==null||jkdZJ==undefined)){
                $("#jkdName").attr("data-id",jkdZJ);
            }else{
                $("#jkdName").attr("data-id",json["jkdList"][0][0]["ZJ"]);
            }
            for(var i=0;i<json["jkdList"][0].length;i++){
                if(json["jkdList"][0][i]["ZJ"]==$("#jkdName").attr("data-id")){
                    $("#jkdName").html(json["jkdList"][0][i]["NAME"]);
                }
            }
            $("#periodSafetyInfoBID").children().remove();
            for(var i=0;i<json["zzpcList"][0].length;i++){
                $("#periodSafetyInfoBID").append("<option data-zj='"+json["zzpcList"][0][i]["ZJ"]+"' data-name='"+json["zzpcList"][0][i]["P_NAME"]+"'>"+json["zzpcList"][0][i]["PC_NO"]+"</option>");
            }
            var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
            ajaxI04("../data.action?tit=I04&pc="+temp,baseName);
            var setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick
                }
            };
            function onClick(event, treeId, treeNode, clickFlag){
                console.log(treeNode.myAttr);
                console.log(treeNode.infos);
                if(treeNode.myAttr=="p"){
                    for(var i=0;i<5;i++){
                        if(treeNode.infos == $($("#periodSafetyInfoBID option")[i]).attr("data-zj")){
                            $("#periodSafetyInfoBID option")[i].selected=true;
                        }
                    }
                }else{
                    $("#jkdName").attr("data-id",treeNode.infos);
                    $("#jkdName").html(treeNode.name);
                }
                var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
                ajaxI04("../data.action?tit=I04&pc="+temp,baseName);
            }
            var zNodes =[];

            for(var i=0;i<json["zzpcList"][0].length;i++){
                var node={id:(i+1),pId:0,name:"批次号："+json["zzpcList"][0][i]["PC_NO"],open:true,icon:"image/icon1.png",infos:json["zzpcList"][0][i]["ZJ"],myAttr:"p"};
                zNodes.push(node);
                for(var j=0;j<json["jkdList"][0].length;j++){
                    var node={id: parseInt((i+1).toString()+ (j+1).toString()),pId:(i+1),name:"监控点："+json["jkdList"][0][j]["NAME"],icon:"image/icon2.png",infos:json["jkdList"][0][j]["ZJ"],myAttr:"j"};
                    zNodes.push(node);
                }
            }

            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        },
        error:function(){
            baseName=i01["base"][0]["NAME"];
            var jkdZJ=getCookie("data-jkdZJ");
            if(!(jkdZJ==null||jkdZJ==undefined)){
                $("#jkdName").attr("data-id",jkdZJ);
            }else{
                $("#jkdName").attr("data-id",i01["jkdList"][0][0]["ZJ"]);
            }
            for(var i=0;i<i01["jkdList"][0].length;i++){
                if(i01["jkdList"][0][i]["ZJ"]==$("#jkdName").attr("data-id")){
                    $("#jkdName").html(i01["jkdList"][0][i]["NAME"]);
                }
            }
            $("#periodSafetyInfoBID").children().remove();
            for(var i=0;i<i01["zzpcList"].length;i++){
                $("#periodSafetyInfoBID").append("<option data-zj='"+i01["zzpcList"][i][0]["ZJ"]+"' data-name='"+i01["zzpcList"][i][0]["P_NAME"]+"'>"+i01["zzpcList"][i][0]["PC_NO"]+"</option>");
            }
            var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
            ajaxI04("../data.action?tit=I04&pc="+temp,baseName);
            var setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick
                }
            };
            function onClick(event, treeId, treeNode, clickFlag){
                console.log(treeNode.myAttr);
                console.log(treeNode.infos);
                if(treeNode.myAttr=="p"){
                    for(var i=0;i<5;i++){
                        if(treeNode.infos == $($("#period2 option")[i]).attr("data-zj")){
                            $("#period2 option")[i].selected=true;
                        }
                    }
                }else{
                    $("#jkdName").attr("data-id",treeNode.infos);
                    $("#jkdName").html((treeNode.name).substr(4));
                }
                var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
                ajaxI04("../data.action?tit=I04&pc="+temp,baseName);
            }
            var zNodes =[];
            for(var i=0;i<i01["zzpcList"][0].length;i++){
                var node={id:(i+1),pId:0,name:"批次号："+i01["zzpcList"][0][i]["PC_NO"],open:true,icon:"image/icon1.png",infos:i01["zzpcList"][i][0]["ZJ"],myAttr:"p"};
                zNodes.push(node);
                for(var j=0;j<i01["jkdList"][0].length;j++){
                    var node={id: parseInt((i+1).toString()+ (j+1).toString()),pId:(i+1),name:"监控点："+i01["jkdList"][0][j]["NAME"],icon:"image/icon2.png",infos:i01["jkdList"][0][j]["ZJ"],myAttr:"j"};
                    zNodes.push(node);
                }
            }
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    });
    $("#periodSafetyInfoBID").change(function(){
        var temp=$("#periodSafetyInfoBID option:selected").attr("data-zj");
        ajaxI04("../data.action?tit=I04&pc="+temp,baseName);
    });
    $(".nowSafetyTable1").tablecloth({
        theme: "default",
        bordered: true,
        striped: true
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