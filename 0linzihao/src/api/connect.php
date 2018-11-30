<?php
	//真正的数据接口：
	$servername='localhost';
	$username='root';
	$password='';
	$dbname='xiangmu';
	//创建数据库连接
	$conn=new mysqli($servername,$username,$password,$dbname);
	// 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    } 
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
     // echo "连接成功";	
?>