$(function () {
    let form = layui.form;
    let layer = layui.layer;
  
    form.verify({
      // pass 密码的校验规则
      pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  
      // newPass 新密码的校验规则，就是不能和原密码相同
      newPass: function (value) {
        // console.log(value); // 新密码
  
        // 获取到原密码的值
        let oldPwd = $("[name=oldPwd]").val();
  
        if (value === oldPwd) {
          return "新密码不能和原密码相同";
        }
      },
  
      // 确认新密码的校验规则，就是确保和新密码相同
      rePass: function (value) {
        // 获取到新密码的值
        let newPwd = $("[name=newPwd]").val();
  
        if (value !== newPwd) {
          return "两次输入的密码不一致";
        }
      },
    });
  
    // ============== 实现密码的修改 ==============
    $("#form").on("submit", function (e) {
      e.preventDefault();
  
      let data = $(this).serialize();
      // console.log("🚀 ~ file: user_pwd.js ~ line 36 ~ data", data);
  
      $.ajax({
        url: "/my/updatepwd",
        type: "POST",
        data,
        success: function (res) {
          // console.log("🚀 ~ file: user_pwd.js ~ line 43 ~ res", res);
  
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
  
          layer.msg("更新密码成功");
  
          // 重置表单
          $("#form")[0].reset();
        },
      });
    });
  });
  