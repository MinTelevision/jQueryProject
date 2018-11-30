<?php
    include 'connect.php';
    $APItype=isset($_POST['APItype']) ? $_POST['APItype'] : 'goodlistdown';
    //查找相应id在详情页输出
    if($APItype=='goodlistDetail'){
        $id=isset($_POST['id']) ? $_POST['id'] : '';
        $sql="SELECT * FROM goodlist WHERE id='$id'";
    }else{
        $page=isset($_POST['page']) ? $_POST['page'] : '1';
        $qty=isset($_POST['qty']) ? $_POST['qty'] : '2';
        $index=($page-1)*$qty;
    }
    //列表页数据正常输出
    if($APItype=='goodlist'){
        $sql="SELECT * FROM goodlist LIMIT $index,$qty";
    }
    //列表页数据降序输出
    if($APItype=='goodlistdown'){
        $sql="SELECT * FROM goodlist ORDER BY price DESC LIMIT $index,$qty";
    } 
    //列表页数据升序输出
    if($APItype=='goodlistup'){
        $sql="SELECT * FROM goodlist ORDER BY price LIMIT $index,$qty";
    }
    //列表页数据人气降序输出
    if($APItype=='goodlisthotdown'){
        $sql="SELECT * FROM goodlist ORDER BY hot DESC LIMIT $index,$qty";
    }
    //列表页数据人气升序输出
    if($APItype=='goodlisthotup'){
        $sql="SELECT * FROM goodlist ORDER BY hot LIMIT $index,$qty";
    }
    $res=$conn->query($sql); //得到结果集
    $row=$res->fetch_all(MYSQLI_ASSOC);//得到全部内容
    if($APItype=='goodlistDetail'){
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }else{
        //关联数组能存储更多数据
        $datalist=array(
            'list'=>$row,
            'page'=>$page,
            'qty'=>$qty
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    }
    $res->close();//关闭结果集   
    $conn->close();//关闭数据库
?>