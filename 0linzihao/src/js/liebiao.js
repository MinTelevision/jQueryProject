$(function(){
    //购物车数量
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
                        $('#gouwuche2').html(gouwuche);
                    }
            });
    $.ajax({      //原先样式
        type:'POST',
        url:'../api/goodlist.php',
        async:true,
        data:{
            'page':1,
            'qty':20,
        },
        success:function(str){
            init(str);
             
                 
        }
    });
    $('#moren').click(function(){
        if(istrue=!istrue){
            istrue=true;
        }else{
            istrue=!istrue
        }
        $.ajax({      //原先样式
            type:'POST',
            url:'../api/goodlist.php',
            async:true,
            data:{
                'page':1,
                'qty':20,
            },
            success:function(str){
                init(str);
                 
                     
            }
        });
    });
    //点击价格排序  可点两次
    var istrue=true;
    $('#paixu').click(function(){
        istrue=!istrue;
        console.log(istrue);
             
            if(!istrue){
                $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'APItype':'goodlistup',
                        'page':1,
                        'qty':20,
                    },
                    success:function(str){
                        init(str);
                             
                    }
                });
            }else{
                $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'page':1,
                        'qty':20,
                    },
                    success:function(str){
                        init(str);
                         
                    }
                });
            }
            
    });

         //输出
    function init(str){
        var arr=JSON.parse(str).list;
        var res=arr.map(function(item){
            return`<li id="${item.id}">
                                    <img src="${item.url}" height="250" width="250" alt="" />
                                    <p>${item.title}</p>
                                    <span class="yuanjia">￥${item.oldprice}</span>
                                    <span class="xianjia">￥${item.price}</span>
                                    <p class="hot">已售出${item.hot}件</p>
                                </li>`;
        }).join('');
        $('#list').html(res);
    }
        //点击下一页照样排序
    $('#xiaye').click(function(){
        if(!istrue){
            $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'APItype':'goodlistup',
                        'page':2,
                        'qty':20,
                    },
                    success:function(str){
                        init(str);
                             
                    }
                });
        }else{
             $.ajax({
                type:'POST',
                url:'../api/goodlist.php',
                async:true,
                data:{
                    'page':2,
                    'qty':20,
                },
                success:function(str){
                    init(str);

                         
                }
            });
        }
           
    });
    //点击上一页照样排序 按开关排序
    $('#shangye').click(function(){
        if(!istrue){
            $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'APItype':'goodlistup',
                        'page':1,
                        'qty':20,
                    },
                    success:function(str){
                        init(str);
                             
                    }
            });
        }else{
            $.ajax({
                type:'POST',
                url:'../api/goodlist.php',
                async:true,
                data:{
                    'page':1,
                    'qty':20,
                },
                success:function(str){
                    init(str);
                         
                }
            });
        }
            
    });

    
    //获取ID到详情页
    $('#list').delegate('li','click',function(){
                    console.log($(this).attr('id'));
                    location.href='../html/xiangqing.html?'+$(this).attr('id');
                });



});