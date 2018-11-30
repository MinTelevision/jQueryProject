$(function(){
    var val1=$('#username').val();
    var val2=$('#password').val();


    $('#password').blur(function(){
        var val1=$('#username').val();
        var val2=$('#password').val();
        if(checkReg.psweasy(val2)){
             $('.qrmm2').css('display','none');
        }
        else{
            $('.qrmm2').css('display','block');
        }
    });
    $('#username').blur(function(){
        var val1=$('#username').val();
        var val2=$('#password').val();
        if(val1){
            $.ajax({
                type:"POST",
                url:"../api/users.php",
                async:true,
                data:{
                    'APItype':'uname',
                    'username':val1,
                },
                success:function(yanzheng){
                    console.log(yanzheng);
                    if(yanzheng==1){
                        $('#tishi1').css("display","block");
                        $('#tishi2').css("display","none");
                            $('#btn').click(function(){
                                var val1=$('#username').val();
                                var val2=$('#password').val();
                                var val3=$('#password2').val();

                                if(val1 && val2 && val3 ){
                                        if(checkReg.psweasy(val2)){
                                            $('.qrmm2').css('display','none');
                                              $.ajax({
                                                    type:"POST",
                                                    url:"../api/users.php",
                                                    async:true,
                                                    data:{
                                                       'APItype':'reg',
                                                       'username':val1,
                                                       'password':val2,
                                                    },
                                                    success:function(str){
                                                        if(str==1){
                                                            if(val2==val3){
                                                                 alert('注册成功');
                                                            location.href='denglu.html';
                                                            }
                                                            else{
                                                                alert('两次输入不一致！请重新输入');
                                                            }
                                                           
                                                        }
                                                    }
                                            });  
                                        }else{
                                            alert('请按要求写密码');
                                                 
                                        }
                                        
                                }else{
                                    alert('您输入的信息不完整！')
                                }          
                            });
                    }else{
                        $('#tishi2').css("display","block");
                        $('#tishi1').css("display","none");
                    }
                         
                }
            });
                
                
        }
    });
    










});