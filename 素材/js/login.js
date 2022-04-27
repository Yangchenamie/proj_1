$(function(){
    $('#link-reg').on('click',function(){
        $('.res').show()
        $('.login').hide()
    })
    $('#link-login').on('click',function(){
        $('.login').show()
        $('.res').hide()
    })

    // 自定义检测
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
            var pwd = $('.res [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })

    // 注册监听事件
    $('#form-res').on('submit',function(e){
        e.preventDefault();
        $.post('/api/reguser',{username:$('#form-res [name=username]').val(),password:$('#form-res [name=password]').val()},function(res){
            if(res.status !==0){
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功，请登录！')
        })
        $('#link-login').click()
    })

    // 登录监听事件
    $('#form-login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token',res.token);
                location.href ="/index.html"
            }
        })
    })
})