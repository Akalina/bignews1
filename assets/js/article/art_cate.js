$(function () {
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template("tpl-art-cate", res)
                $("tbody").html(str)
            }
        })
    }

    var layer = layui.layer
    $("#btnAdd").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $("#dialog-add").html(),
            //这里content是一个普通的String
        });
        // console.log(indexAdd);
    })
    var indexAdd = null
    $("body").on("submit", '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg("添加成功")
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $("tbody").on("click", '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $("#dialog-edit").html()
        })
        var Id = $(this).attr("data-id")
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                layui.form.val("form-edit", res.data)
            }
        })
    })
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg("更改成功")
                layer.close(indexEdit)
            }
        })
    })
    $("tbody").on("click", '.btn-delete', function () {
        var Id = $(this).attr("data-id")
        layer.confirm("是否确认删除?", {
                icon: 3,
                title: "提示"
            },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        initArtCateList()
                        layer.msg("删除成功")
                        layer.close(index)
                    }
                })
            }
        )
    })
})