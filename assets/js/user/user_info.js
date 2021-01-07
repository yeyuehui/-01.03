$(function(){
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
        // }
        nickname: (value) => { 
            console.log(value);
            if (value.length > 6) {
                return "昵称的长度需要在1-6字符之间";
              }
        }
    })


     // ==================  发送ajax请求， 获取用户的基本信息 ==================
     getInfo()
  function getInfo(){
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        if(res.status !== 0){
          return layer.msg("获取用户信息失败!")
        }
  
        // 给表单赋值
        // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        // 注意点：第二个参数，数据需要和表单中的name进行一一对应，这样才能正确的给表单赋值
        form.val("form", res.data);
      },
    });
  }

  //==============================重置功能
  $("#resetBtn").click(function(e){
    e.preventDefault()
    getInfo()
  })

  //监听表单的submit事件，实现修改功能
  $("#form").on("submit", function(e){
    e.preventDefault()
    let data = $(this).serialize()

    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data,
      success: function(res){
        if(res.status !== 0){
          return layer.msg("修改用户信息失败")
        }

        window.parent.getUserInfo()
        layer.msg('修改用户信息成功')
      }
    })
  })

})