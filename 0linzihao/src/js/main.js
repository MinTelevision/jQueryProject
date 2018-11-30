$(function(){
            // for(i=0;i<2;i++){
            //     location.reload();
            // }
            $(document).ready(function () {

                 if(location.href.indexOf("#reloaded")==-1){
                    location.href=location.href+"#reloaded";
                    location.reload();
                }
             });

            $.ajax({
                type:'POST',
                async:true,
                url:'api/orderCar.php',
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
    //轮播图---------------------------------------------
    var iW=$('#imglist li').eq(0).outerWidth();
    $('#imglist li').css('left',iW);
    $('#imglist li').eq(0).css('left',0);

    var timer=null;
    clearInterval(timer);
    var now=0;
    timer=setInterval(next,2500);
    function next(){
        //旧的挪走
        $('#imglist li').eq(now).animate({'left':-iW},1000);
        now=++now>=$('#imglist li').size()?0:now;
        //新的快速放在右侧，再挪进可视区
        $('#imglist li').eq(now).css('left',iW);
        $('#imglist li').eq(now).animate({'left':0},1000);
        light();
    }
    function light(){
        $('#light span').removeClass('active');
        $('#light span').eq(now).addClass('active');
    }
    $('#light span').click(function(){
        //旧 ：now
        //新：index() 新的
        var index=$(this).index();
        if(index>now){
            //从右边切入
            //旧 now：挪到左边
            $('#imglist li').eq(now).animate({'left':-iW},1000);
            //新的
            $('#imglist li').eq(index).css('left',iW);
            $('#imglist li').eq(index).animate({'left':0},1000);
            now=index;//最新的一张变成index
            
        }
        if(index<now){
            //从左边切入
            //旧 now：挪到左边
            $('#imglist li').eq(now).animate({'left':iW},1000);
            //新的
            $('#imglist li').eq(index).css('left',-iW);
            $('#imglist li').eq(index).animate({'left':0},1000);
            now=index;//最新的一张变成index
        }
        clearInterval(timer);
        timer=setInterval(next,2500);
        light();
    });



    //main的轮播图---------------------------------------------
    var wNum=$('#mainrb li').size()*$('#mainrb li').eq(0).outerWidth();
    console.log(wNum);
    $('#mainrb').css('width',wNum)
    var iW=$('#mainrb li').eq(0).outerWidth()*4;
    var now2=0;
    var timer2=null;

    clearInterval(timer2);
    timer2=setInterval(next2,3000);

    function next2(){//动画时间间隔：5000-2000
        $('#mainrb').animate({'left':-iW},2000,function(){
            //出去的图片，剪切放到末尾
            $('#mainrb li:lt(4)').insertAfter($('#mainrb li:last'));
            //ul归位
            $('#mainrb').css('left',0);

        });
                now2=++now2>=$('.tcl').size()?0:now2;
                light2();   
    } 

   function light2(){
                $('.tcl').removeClass('active2');
                $('.tcl').eq(now2).addClass('active2');
                console.log(now2);
                } 
    var isok=true;        
        $('#nav').find('.dianji1').eq(0).click(function(){
        
            //给所有的input绑定点击事件
            $('.dianji1').removeClass('active10');
            $(this).addClass("active10");//点击高亮
            // $('.xuanxiangka').css('display','none');//清空
            // $('.xuanxiangka').eq($(this).index()).css('display','block'); 
            
            console.log(isok); 
            if(!isok){
                $('#chuxian').css('display','none');
                $('#yincang').css('display','block');
                  isok=true;
            }
            
        }); 
        
        $('#nav').find('.dianji1').eq(1).click(function(){
        
            //给所有的input绑定点击事件
            $('.dianji1').removeClass('active10');
            $(this).addClass("active10");//点击高亮
            // $('.xuanxiangka').css('display','none');//清空
            // $('.xuanxiangka').eq($(this).index()).css('display','block'); 
              
            console.log(isok); 
            
            if(isok){
                $('#chuxian').css('display','block');
                $('#yincang').css('display','none');
                
                isok=!isok;
            }
        });
    
         
    
});