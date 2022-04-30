$(function(){
    getUserInfo();
    $('#btnClose').on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'},
        function(index){
            // console.log('ok');
            //do something
                // 清空本地储存的token
                localStorage.removeItem('token');
                location.href = '/login.html'
                // 关闭询问框
            layer.close(index);
          });
    })
})
// 获取用户信息
function getUserInfo(){
    // $.ajax({
    //     method:'GET',
    //     url:'/my/userinfo',
    //     Header:{
    //         Authorization:localStorage.getItem('token')||''
    //     },
    //     success:function(res){
    //         if(res.status !==0){
    //             return layer.msg('获取失败！')
    //         }
    //         // 调用renderAvatar函数渲染头像
    //         renderAvatar()
    //     }
    // })
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('获取用户信息失败');
            }
                // 渲染用户头像
                renderAvatar(res.data);
        }
    });
}
function renderAvatar(user){
    var name = user.nickname||user.username;
    $('.weclome').html('欢迎&nbsp&nbsp' + name);
    if(user.user_pic !==null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}