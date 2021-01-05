let layer = layui.layer

getUserInfo()
function getUserInfo(){
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: function(res){
            console.log(res);

            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
            }
            renderUserInfo(res.data)
        },
        // complete: function(xhr){
        //     // console.log('complete 执行了');

        //     if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败!'){
        //         location.href = "/home/login.html"
        //     }
        // }
    })
}

function renderUserInfo(data){
    console.log(data);
    let name = data.nickname || data.username
    let first = name[0].toUpperCase()
    console.log(name, first);
    $("#welcome").text("欢迎" + name)

    if(data.user_pic){
        $(".layui-nav-img").attr("src", data.user_pic).show()
        $(".text-avatar").hide()
    }else{
        $(".layui-nav-img").hide()
        $(".text-avatar").text(first).show(  )
    }
}

//======================退出功能

$("#logoutBtn").click(function(){
    layer.confirm('确认是否退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        // console.log(index);
        localStorage.removeItem('token')
        location.href = '/home/login.html'
        layer.close(index);
      });
})

