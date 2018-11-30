<?php    
    include 'connect.php'; 
    $APItype=isset($_POST['APItype']) ? $_POST['APItype'] : 'orderCarNum';
    //加入购物车
    if($APItype=='addOrderCar'){

        $title=isset($_POST['title']) ? $_POST['title'] : '12';
        $num=isset($_POST['num']) ? $_POST['num'] : '12';
        $price=isset($_POST['price']) ? $_POST['price'] : '12';
        $url=isset($_POST['url']) ? $_POST['url'] : '12';
        $sql="INSERT INTO orderCar(title,num,price,url) VALUES('$title','$num','$price','$url')"; 
    }  
    //购物车信息输出 
    if($APItype=='orderCar'){
        $page=isset($_POST['page']) ? $_POST['page'] : '1';
        $qty=isset($_POST['qty']) ? $_POST['qty'] : '2';
        $index=($page-1)*$qty;
        
        $sql="SELECT * FROM orderCar LIMIT $index,$qty";
    }
    //购物数量变化
    if($APItype=='orderCarNum'){
        $id=isset($_POST['id']) ? $_POST['id'] : '1';
        $num=isset($_POST['num']) ? $_POST['num'] : '2';
        $sql="UPDATE orderCar SET num='$num' where id='$id'"; 
    }
    //购物车删除数据
    if($APItype=='orderCarDelete'){
        $id=isset($_POST['id']) ? $_POST['id'] : '';
        $sql="DELETE FROM orderCar WHERE id='$id'"; 
    }
    //购物车删除全部
    if($APItype=='orderCarDeleteAll'){
        $id=isset($_POST['id']) ? $_POST['id'] : '';
        $sql="DELETE FROM orderCar";
    }
    $res=$conn->query($sql); 
    if($APItype=='orderCar'){
        $row=$res->fetch_all(MYSQLI_ASSOC);//只要内容部分
        $datalist=array(
            'list'=>$row,
            'page'=>$page,
            'qty'=>$qty
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();//关闭结果集
    }else{
        if($res){
            echo 1;
        }else{
            echo 0;
        }
    }
    //关闭数据库
    $conn->close();
?>