$(function(){
    // 去注册账号
    $("#gotoRegi").click(function(){
        // 显示注册
        $(".register").show()

        // 隐藏登陆
        $(".login").hide()
    });

    // 去登陆
    $("#gotoLogin").click(function(){
        // 隐藏注册
        $(".register").hide()

        // 显示注册
        $(".login").show()
    })

    // ============================添加自定义校验规则
    let form = layui.form;
    form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        //pass 是密码的校验
        pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
        ],

        //两次密码一致
        repwd: function(value, item){
        // console.log(value);
        // console.log(item);

        // 步骤
        // 1.
        let pwd = $(".register [name=password]").val()
        console.log(pwd);
        // 2.
        if(value !== pwd){
            //函数内的return返回值就是提示框的信息
            return "密码不一致"
        }

        
    }

  }); 

  //===========================实现注册功能
  let layer = layui.layer
  $("#regiForm").on("submit", function(e){
    // 1. 阻止表单的默认行为
    // 2. 获取到表单的数据
    // 3. 发送ajax实现注册功能
    // 4. 弹框提示注册如何

    //1.
    e.preventDefault()

    //2.
    let data = $(this).serialize()
    // console.log(data);

    //3.
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data,
        success: function(res){
            console.log(res);

            if(res.status !== 0){
                //注册失败
                return layer.msg(res.message);
            }
            layer.msg('注册成功');

        // 注册成功之后，需要出发去登录的点击事件
            $("#gotoLogin").click()
        }
    })
  })

  //=======================实现登陆功能
  $('#loginForm').on("submit", function(e){
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: "POST",
        // url: "http://api-breakingnews-web.itheima.net/api/login",
        url: "/api/login",

        data,
        success: function(res){
            console.log(res);
            if (res.status !== 0) {
                // 登录失败
                return layer.msg("登录失败");
              }

              localStorage.setItem("token", res.token);
              layer.msg("登录成功, 即将跳转到首页", function () {
                // 弹出框关闭了才会执行该函数
      
                // 跳转页面
                location.href = "/home/index.html";
              });
        }
    })
  })
})

     