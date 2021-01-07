// //来优化url（根路径）
// $.ajaxPrefilter(function(options){
//     // console.log("函数执行了", options.url);
//     options.url = "http://api-breakingnews-web.itheima.net" + options.url


//     // options.headers = {
//     //     Authorization: localStorage.getItem("token")
//     // }

//     if(options.url.indexOf("/my") !== -1){
//         options.headers = {
//             Authorization: localStorage.getItem("token")
//         }
//     }

//     options.complete = function(xhr){
//         // console.log('complete 执行了');

//         if(xhr.responseJSON.status === 1 && 
//             xhr.responseJSON.message === '身份认证失败!'){
//             location.href = "/home/login.html"
//         }
//     }
// })

$.ajaxPrefilter(function (options) {
    // 每次ajax请求发送前，都会执行该函数，通过该函数的形参options可以获取到每次ajax请求发送的配置项
    // 来优化url （根路径）
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log("函数执行了", options.url);
  
    // 优化headers（带上token信息） ==> 以下写法是所有的请求接口中都会带上身份认证字段的信息
    // 以 /my 开头的请求路径， 才需要带上身份认证字段的信息
    /* options.headers = {
      // 设置请求头(带上token信息，token之前在登录成功的时候，存储到本地了，只需要从本地获取到token即可)
      Authorization: localStorage.getItem("token"),
    }; */
  
    // 再一次优化
    if (options.url.indexOf("/my") !== -1) {
      // 需要带上身份认证字段的信息
      options.headers = {
        Authorization: localStorage.getItem("token"),
      };
    }
  
    // 控制用户的访问权限
    options.complete = function (xhr) {
      // 请求完成（不论是成功还是失败都会执行该函数）
      // xhr.responseJSON; 这就是服务器响应回来的数据
      // console.log("complete 执行了", xhr.responseJSON);
      if (
        xhr.responseJSON.status === 1 &&
        xhr.responseJSON.message === "身份认证失败！"
      ) {
        // token有问题，身份认证失败！
        // 跳转回login页面，需要重新登录才能进入到index页面
        location.href = "/home/login.html";
      }
    };
  });
  