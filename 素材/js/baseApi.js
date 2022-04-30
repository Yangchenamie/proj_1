// 注意：每次调用$.get() 或 $.post() 或 $.ajax() 得时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供得配置对象
// $.ajaxPrefilter(function(options){
// // 在发起真正的ajax请求之前，统一拼接请求得根路径
// options.url = 'http://api-breakingnews-web.itheima.net'+ options.url
// })
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }

    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1) {
            //强制清空token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
        }
    };

});