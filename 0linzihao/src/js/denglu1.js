
    $(function(){
    $('#btn').click(function(){ 
    var val1=$('#username').val();
    var val2=$('#password').val();     
        if(val1&&val2){
            $.ajax({
                type:"POST",
                url:"../api/users.php", 
                async:"true",
                data:{
                    'APItype':'login',
                    'username':val1,
                    'password':val2,
                },
                success:function(str){
                    console.log(str);
                         if(str==1){
                            location.href='../main.html';
                         }else{
                            alert('用户密码错误！');
                            window.location.reload();
                         }
                }


            });
        }else{
            alert('请填完登陆信息！')
        }
    });











});