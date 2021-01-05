//来优化url（根路径）
$.ajaxPrefilter(function(options){
    // console.log("函数执行了", options.url);
    options.url = " http://api-breakingnews-web.itheima.net" + options.url


    // options.headers = {
    //     Authorization: localStorage.getItem("token")
    // }

    if(options.url.indexOf("/my") !== -1){
        options.headers = {
            Authorization: localStorage.getItem("token")
        }
    }

    options.complete = function(xhr){
        // console.log('complete 执行了');

        if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败!'){
            location.href = "/home/login.html"
        }
    }


})