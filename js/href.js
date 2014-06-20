/**
 * Created by Castiel.ZYF on 14-5-7.
 */
$(document).ready(function(){
    var href=location.href.substr(location.href.lastIndexOf("?"));
    console.log(href);
    $("#mapDivA").attr("href",$("#mapDivA").attr("href")+href);
    $("#growPeriodA").attr("href",$("#growPeriodA").attr("href")+href);
    $("#dataManagementA").attr("href",$("#dataManagementA").attr("href")+href);
    $("#periodSafetyA").attr("href",$("#periodSafetyA").attr("href")+href);
    $("#nowSafetyA").attr("href",$("#nowSafetyA").attr("href")+href);
    $("#pointA").attr("href",$("#pointA").attr("href")+href);
})
