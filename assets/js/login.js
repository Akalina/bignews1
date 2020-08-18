$(function () {
    $("#ling_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#ling_login").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 自定义规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6-16位，且不能有空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val()
            if (value !== pwd) {
                // preventDefault()
                return '两次输入密码不一致';
            }
        }
    })
    $("#form_reg").on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),

            },
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录");
                $("#ling_login").click();
                $("#form_reg")[0].reset();
            }
        })
    })
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您登录成功')
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })
})