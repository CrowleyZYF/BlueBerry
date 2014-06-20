/**
 * Created by Castiel.ZYF on 14-4-20.
 */
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
function initI01(json){
    $("#baseName").html(json["base"][0]["NAME"]);
    var baseProductString="";
    for(var i=0;i<json["zzpcList"].length;i++){
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
            initI01(json);
        },
        error:function(){
            initI01(i01);
        }
    });

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var zNodes =[];
    var node={id:1,pId:0,name:"基地名称：",open:true,icon:"image/icon1.png"};
    zNodes.push(node);
    for(var j=0;j<3;j++){
        var node={id: parseInt((1).toString()+ (j+1).toString()),pId:1,name:"基地"+(j+1),icon:"image/icon2.png"};
        zNodes.push(node);
    }
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);

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
