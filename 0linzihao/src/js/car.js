$(function(){
    //location.reload([true]);

    $.ajax({
                type:'POST',
                async:true,
                url:'../api/orderCar.php',
                data:{
                    'APItype':'orderCar',
                    'page':1,
                    'qty':40,
                },
                success:function(str){
                    var arr=JSON.parse(str);
                        console.log(arr.list.length);
                        var gouwuche=arr.list.length;
                        $('#gouwuche2').html(gouwuche);
                        // $('#gouwuche2').html(gouwuche);
                    }
            });
//获取到购物车数量    
    $.ajax({
        type:'POST',
        async:true,
        url:'../api/orderCar.php',
        data:{
            'APItype':'orderCar',
            'page':1,
            'qty':40,
        },
        success:function(str){
                var arr=JSON.parse(str);
                console.log(arr.list.length);
                var gouwuche=arr.list.length;
                $('#gouwuche').html(gouwuche);
        }
    });

    //渲染数据
    $.ajax({
        type:"POST",
        url:"../api/orderCar.php", 
        async:"true",
        data:{
            'APItype':'orderCar',
            'page':1,
            'qty':40,
        },
        success:function(str){
            init(str);
        }
    });



    //渲染数据
    function init(str){
        var arr=JSON.parse(str).list;
        console.log(arr);
        var res=arr.map(function(item){
            return`<li data-id="${item.id}">
                        <input class="anniu" type="checkbox" />
                        <img src="${item.url}" height="111" width="111" alt="" />
                        <p>${item.title}</p>
                        <input value="${item.num}"  class="num" type="number" min="1" max="99" />

                        <span class="price">￥${item.price}/件</span>
                        <span class="numprice">￥${item.price}</span>
                        <span class="you">[收藏]</span>
                        <span class="del you">[删除]</span>
                    </li>`
        }).join('');
        $('#list').html(res);
    }
    //加量减量
    $('#list').on('click','.num',function(){
        var id=$(this).parent().attr('data-id');
        var num=$(this).val();//点击获取对应行的数量
        // console.log(id);
             
        // val++;
        // if(val>=100){//库存量
        //     val=100;
        // }
        //更新数据库的数量
        $.ajax({
            type:"POST",//请求方式
            url:"../api/orderCar.php",//接口路径
            async:true,//异步
            data:{//传输数据
                'APItype':"orderCarNum",
                'id':id,
                'num':num
            },
            success:function(str){//成功回调
                // console.log(str);
            }
       });
         // $(this).num(num);//更新数量
        subTotal($(this));//刷新小计
    });

    //删除当行
    $('#list').on('click','.del',function(){
        var id=$(this).parent().attr('data-id');
        var mes=confirm('您确定要删除该商品吗？');
        if(mes){
            $(this).parent().remove();
            //更新数据库的数量
            $.ajax({
                type:"POST",//请求方式
                url:"../api/orderCar.php",//接口路径
                async:true,//异步
                data:{//传输数据
                    'APItype':"orderCarDelete",
                    'id':id,
                },
                success:function(str){//成功回调
                    console.log(str);
                }
           });
        }
        updateNum();//刷新总计
        location.reload([true]);
    });
    var isok=true;
    $('#delall').click(function(){
        if(isok){
            $('.anniu').prop('checked','checked');
        }else{
            $('.anniu').removeAttr('checked');
        }
        isok=!isok;
        updateNum();

    }); 

    var arr=[];//一个空数组存放被勾选的框的个数
    $('#list').on('click', '.anniu', function() {
        updateNum();
        if(arr.length==$('.anniu').size()){//证明全被勾选
            $('#delall').prop('checked','checked');
            isok=false;
        }else{
            $('#delall').removeAttr('checked');
            isok=true;
        }   
    });

    $('#delxuan').on('click', function() {
        console.log($('.anniu').eq(arr[0]).parent().attr('data-id'));
        updateNum();
        var mes = confirm('您确定要清除所选物品吗？');
        if(mes) {
            for(var i = arr.length - 1; i >= 0; i--) { //找到对应的行，删除
                var id=$('.anniu').eq(arr[i]).parent().attr('data-id');
                console.log(id);
                $('.anniu').eq(arr[i]).parent().remove();
                //更新数据库的数量
                $.ajax({
                    type:"POST",//请求方式
                    url:"../api/orderCar.php",//接口路径
                    async:true,//异步
                    data:{//传输数据
                        'APItype':"orderCarDelete",
                        'id':id,
                    },
                    success:function(str){//成功回调
                        console.log(str);
                    }
               });
            }
        }
        updateNum();
        location.reload([true]);
    }); 

    //小计
    function subTotal(now){
        var num=now.val();//数量
        var price=now.parent().find('.price').text().slice(1,6);
        var numprice=(num*price).toFixed(2);//保留两个小数，小计：数量*单价
        now.parent().find('.numprice').html('￥'+numprice);
        updateNum();//刷新总计
        // console.log(numprice);
             
    }

    //刷新总计
    var arr=[];
    function updateNum(){
        arr.length = 0;//空数组：存被勾选的行的下标
        var le = $('.anniu').size(); //复选框的总个数
        for(var i = 0; i < le; i++) {
            if($('.anniu').eq(i).prop('checked')) {//这一行被勾选
                arr.push(i);
            }
        }
        //根据复选框选择的行计算总价与数量
        var num = 0; //总数量
        var totalPrice = 0; //存总价
        for(var i = 0; i < arr.length; i++) {
            num += $('.num').eq(arr[i]).val() * 1;
            var numprice = $('.numprice').eq(arr[i]).text().slice(1,6)*1; //￥ 199.98
            // price = $.trim(price); //去掉前后空格，工具方法
            // price = (price.substring(2) * 1); //199.98
            totalPrice += numprice;
            var totalPrice=totalPrice;

                 
        }
        console.log(numprice);
        // $('#allnum').html(num + ' 件');
        $('#zongjia').html('￥ ' + totalPrice.toFixed(2));
    }


    
});