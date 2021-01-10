$(function(){
    let form = layui.form

    //======================获取文章类别数据
    $.ajax({
        url: '/my/article/cates',
        success: function(res){
            res.data.forEach((item) => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo($("[name=cate_id]"))
            })
            form.render()
        }
    })

     // =============== 初始化富文本编辑器 ===============
    initEditor()

  // =============== 图片裁剪 ===============
  // 1. 初始化图片裁剪器
    let $image = $("#image")

  // 2. 裁剪选项
    let option = {
        aspectRatio: 400 / 280,
        preview: ".img-preview"
    }       

  // 3. 初始化裁剪区域
    $image.cropper(option)

  // =============== 选择图片按钮功能 ===============
    $("#chooseBtn").click(function(){
        $("#file").click()
    })

  // 监听文件域的change事件
    $("#file").on("change", function(){
        let imgFile = this.files[0]

        let newImgURL = URL.createObjectURL(imgFile)

        $image
        .cropper("destroy")
        .attr("src", newImgURL)
        .cropper(options)
    })

  // ==================== 表单的submit事件 ==================
    let state
    $("#pubBtn").click(function(){
        state = "已发送"
    })

    $("#saveBtn").click(function(){
        state = "草稿"
    })

    $("#form").on("submit",function(e){
        e.preventDefault()

    // 将裁切的图片转成文件对象
        $image.cropper("getCroppedCanvas", {
            width: 400,
            height: 280,
        })
        .toBlob((blob) => {
            let fd = new FormData(this)
            fd.append("state", state)
            fd.append("cover_img", blob)
            pubArt(fd)
        })
    })

    let layer = layui.layer
    function pubArt(fd){
        $.ajax({
            url: "/my/article/add",
            type: "post",
            data: fd,
      // 发送fd这个FormData数据的时候，需要有以下两个配置
            contentType: false,
            processData: false,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("发布失败")
                }
                layer.msg("发布成功")
                location.herf = "/article/art_list.html"
            }
        })
    }
})