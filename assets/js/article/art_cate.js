$(function () {
    let form = layui.form;
    let layer = layui.layer;
  
    // 获取所有的文章类别
    getCate();
    function getCate() {
      $.ajax({
        url: "/my/article/cates",
        success: function (res) {
          // // // console.log("🚀 ~ file: art_cate.js ~ line 5 ~ res", res);
  
          let htmlStr = template("trTpl", res);
          // // // console.log("🚀 ~ file: art_cate.js ~ line 8 ~ htmlStr", htmlStr);
          $("#tb").html(htmlStr);
        },
      });
    }
  
    // ================ 添加按钮功能 ==================
    let index; // 存储弹出层的索引，用于添加成功之后关闭该弹出层
    $("#addBtn").click(function () {
      index = layer.open({
        type: 1, // 页面层（没有确认按钮）
        title: "添加文章分类", // title
        // content: "哈哈", // content内容可以写成html字符串，可以识别html字符串
        content: $("#addFormTpl").html(), // 获取到模板里面的form表单结构
        // area: ["500px", "300px"], // 定的宽高
        area: "500px", // 定的宽
      });
    });
  
    // ============= 实现添加功能 ================
    // 坑：添加的form表单 addForm 是动态创建出来的，所以需要注册事件委托，以下写法是有问题的
    /* $("#addForm").on("submit", function (e) {
      e.preventDefault();
      alert(1);
    }); */
  
    // 注册事件委托;
    $("body").on("submit", "#addForm", function (e) {
      e.preventDefault();
  
      let data = $(this).serialize();
      // // // console.log("🚀 ~ file: art_cate.js ~ line 37 ~ data", data);
  
      $.ajax({
        url: "/my/article/addcates",
        type: "POST",
        data,
        success: function (res) {
          // // console.log("🚀 ~ file: art_cate.js ~ line 44 ~ res", res);
  
          if (res.status !== 0) {
            return layer.msg("新增文章分类失败！");
          }
  
          // 1. 隐藏弹出层
          layer.close(index);
  
          // 2. 重新加载所有文章类别数据
          getCate();
  
          // 3. 提示框提示新增分类成功
          layer.msg("新增文章分类成功！");
        },
      });
    });
  
    // ============== 编辑功能 ==============
    // 需要注册事件委托
    let editIndex;
    $("#tb").on("click", ".editBtn", function () {
      // 实现弹出层
      editIndex = layer.open({
        type: 1, // 页面层（没有确认按钮）
        title: "修改文章分类", // title
        content: $("#editFormTpl").html(), // 获取到模板里面的form表单结构
        area: "500px", // 定的宽
      });
  
      // 如果获取到这条数据的id
      let id = $(this).attr("data-id");
      // // console.log("🚀 ~ file: art_cate.js ~ line 80 ~ id", id);
  
      // 发送ajax请求来填充弹出层的form表单
      $.ajax({
        url: "/my/article/cates/" + id,
        success: function (res) {
          // console.log("🚀 ~ file: art_cate.js ~ line 86 ~ res", res);
  
          // 给表单赋值操作
          // editForm 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
          form.val("editForm", res.data);
        },
      });
    });
  
    // ================  更新 ================
    $("body").on("submit", "#editForm", function (e) {
      e.preventDefault();
  
      let data = $(this).serialize();
      // console.log("🚀 ~ file: art_cate.js ~ line 102 ~ data", data);
  
      $.ajax({
        type: "POST",
        url: "/my/article/updatecate",
        data,
        success: function (res) {
          console.log("🚀 ~ file: art_cate.js ~ line 109 ~ res", res);
  
          if (res.status !== 0) {
            return layer.msg("更新分类信息失败！");
          }
  
          // 1. 隐藏弹出层
          layer.close(editIndex);
  
          // 2. 重新加载所有文章类别数据
          getCate();
  
          // 3. 提示框提示新增分类成功
          layer.msg("更新分类信息成功！");
        },
      });
    });
  
    // ================= 删除 ====================
    $("#tb").on("click", ".delBtn", function () {
      // 先把id获取到
      let id = $(this).attr("data-id");
      console.log("🚀 ~ file: art_cate.js ~ line 133 ~ id", id);
  
      layer.confirm("确定删除吗?", { icon: 3, title: "提示" }, function (index) {
        // 该函数只有点击确认按钮才会执行
  
        // 在这里面发送ajax来删除对应的数据
        $.ajax({
          url: "/my/article/deletecate/" + id,
          success: function (res) {
            console.log("🚀 ~ file: art_cate.js ~ line 142 ~ res", res);
  
            if (res.status !== 0) {
              return layer.msg("删除文章分类失败！");
            }
  
            layer.msg("删除文章分类成功！");
  
            // 重新获取所有的分类数据
            getCate();
          },
        });
  
        layer.close(index);
      });
    });
  });
  