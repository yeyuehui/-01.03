//来优化url（根路径）
$.ajaxPrefilter(function(options){
    // console.log("函数执行了", options.url);
    options.url = " http://api-breakingnews-web.itheima.net" + options.url
})