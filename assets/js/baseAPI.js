var baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (params) {
    // console.log(params.url);
    params.url = baseURL + params.url
})