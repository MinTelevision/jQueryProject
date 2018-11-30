<?php
    //连接数据库 
    include 'connect.php';  
    $APItype=isset($_POST['APItype'])?$_POST['APItype']:'login';
    //验证用户名
    if($APItype=='uname'){
        $name=isset($_POST['username']) ? $_POST['username'] : '';   
        $sql="SELECT * FROM users WHERE name='$name'";
        $res=$conn->query($sql);//返回结果集
        // var_dump($res);
        if($res->num_rows>0){
            echo 0;
        }else{
            echo 1;
        }
        $res->close();//关闭结果集
    }
    //注册
    if($APItype=='reg'){
        $name=isset($_POST['username']) ? $_POST['username'] : '';
        $psw=isset($_POST['password']) ? $_POST['password'] : '';
        $sql="INSERT INTO users(name,password) VALUES('$name','$psw')"; 
        $res=$conn->query($sql);//返回布尔值 
        if($res){
            echo 1;
        }else{
            echo 0;
        } 
    }
    //登录
    if($APItype=='login'){
        $name=isset($_POST['username']) ? $_POST['username'] : '';
        $psw=isset($_POST['password']) ? $_POST['password'] : '';
        $sql="SELECT * FROM users WHERE name='$name' AND password='$psw'";
        $res=$conn->query($sql);//返回结果集
        if($res->num_rows>0){
            echo 1;
        }else{
            echo 0;
        }
        $res->close();//关闭结果集
    }
    //关闭数据库
    $conn->close();   
?>