/* var baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // console.log(params.url);
    params.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            console.log(1);
            localStorage.removeItem("token")
            location.href = '/login.html'
        }
    }
}) */
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token')
            document.body.style.filter = 'grayscale(100%)'
            layui.layer.load(2, {
                time: 3000
            });
            setTimeout(function () {
                location.href = '/login.html'
            }, 3000)
        }
    }

})