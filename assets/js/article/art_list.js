$(function(){
    let query = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }

  // ================ 发送ajax请求来获取分类列表数据 ================
  let layer = layui.layer;
  let form = layui.form;

  $.ajax({
      url: '/my/article/cates',
      success: function(res){
          
          if(res.status !== 0){
              return layer.msg('获取分类数据失败')
          }

          res.data.forEach((item) => {
              $(`<option value="${item.Id}">${item.name}</option>`).appendTo(
                  $("#cateSelect")
              )
          })

          form.render()
      },
  })

  // ============== 美化处理时间格式 ==============
  let paddZero = function(n){
      return n < 10 ? "0" + n : n
  }
  template.defaults.imports.formatTime = function(msg){
      let d = new Date(msg)
      let y = d.getFullYear()
      let m = paddZero(d.getMonth() + 1);
      let day = paddZero(d.getDate());

      let h = paddZero(d.getHours());
      let mm = paddZero(d.getMinutes());
      let s = paddZero(d.getSeconds());

    return `${y}-${m}-${day} ${h}:${mm}:${s}`;
  }

  // =============== 获取列表数据 ===============
  getList()
  function getList(){
      $.ajax({
          url: "/my/article/list",
          data: query,
          success: function(res){
              let htmlStr = template("trTpl", res)
              $("#tb").html(htmlStr)

              renderPage(res.total);
          }
      })
  }

  let laypage = layui.laypage
  function renderPage(total){
      laypage.render({
          elem: "pageBox",
          count: total,
          curr: query.pagenum,
          limit: query.pagesize,
          limits: [1, 2, 3, 5, 8, 10, 20, 200],
          layout: ["count", "limit", "prev", "page", "next", "skip"],
          jump: function (obj,first){
            //   console.log(first);
              query.pagenum = obj.curr
              query.pagesize = obj.limit; 

              if(!first){
                  getList()
              }
          }
      })    
  }

  // =============== 实现筛选功能 ===============
  $("#form").on("submit", function(e){
      e.preventDefault()
      query.cate_id = $("#cateSelect").val();
      query.state = $("#stateSelect").val();

      query.pagenum = 1;

      getList();
  })

  // =============== 实现删除功能 =================
  $("#tb").on("click", ".delBtn", function (){
    let id = $(this).attr("data-id");

    layer.confirm("确定删除吗?", { icon: 3, title: "提示" }, function (index) {
        // 来获取删除按钮的个数
        let delBtnlen = $(".delBtn").length;
  
        if (delBtnlen === 1) {
          /* if (query.pagenum === 1) {
            query.pagenum = 1;
          } else {
            query.pagenum = query.pagenum - 1;
          } */
  
          // 三元简化
          query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1;
        }
  
        // 发送ajax实现删除文章数据
        $.ajax({
          url: "/my/article/delete/" + id,
  
          /* // url中的id处理以下写法错误
          url: "/my/article/delete/",
          data: {
            id,
          }, */
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("删除失败！");
            }
  
            layer.msg("删除成功！");
  
            // 重新发送ajax获取最新的数据
            getList();
          },
        });
  
        layer.close(index);
    })
  })
})