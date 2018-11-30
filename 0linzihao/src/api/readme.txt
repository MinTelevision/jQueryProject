数据库名称：xiangmu

表1 users
api/users.php

用户名验证：
传参：(POST)
APItype=uname
username 用户名
返回：
0 存在，验证失败
1 不存在，验证成功

注册：
传参：(POST)
APItype=reg
username 用户名
password 密码
返回：
0 注册失败
1 注册成功

登录：
传参：(POST)
APItype=login
username 用户名
password 密码
返回：
0 不存在，登录失败
1 存在，登录成功












表2 goodlist
api/goodlist.php

列表页数据输出：
传参：(POST)
APItype=goodlist
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    page->第几页
    qty->每页多少数据
}

列表页价格降序输出：
传参：(POST)
APItype=goodlistdown
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    page->第几页
    qty->每页多少数据
}

列表页价格升序输出：
传参：(POST)
APItype=goodlistup
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    page->第几页
    qty->每页多少数据
}

列表页人气降序输出：
传参：(POST)
APItype=goodlisthotdown
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    total->总数据数
    page->第几页
    qty->每页多少数据
}

列表页人气升序输出：
传参：(POST)
APItype=goodlisthotup
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    total->总数据数
    page->第几页
    qty->每页多少数据
}

查找相应id在详情页输出：
传参：(POST)
APItype=goodlistDetail
id 商品id
返回：
相应id的数据 可渲染
1 数据不存在







表3 order
api/orderCar.php

加入购物车：
传参：(POST)
APItype=addOrderCar
title 商品名称
num 加入的数量
price 价钱
商品其它各种信息...(具体什么信息传什么)
返回：
1 购物信息插入成功
0 购物信息插入不成功

购物车信息输出：
传参：(POST)
APItype=orderCar
page 第几页
qty 每页多少数据
返回：
datalist{
    list->第page页的数据
    page->第几页
    qty->每页多少数据
}

购物数量变化：
传参：(POST)
APItype=orderCarNum
id 商品id
num 商品数量
返回：
1 更新成功
0 更新失败

购物车删除数据：
传参：(POST)
APItype=orderCarDelete
id 商品id
返回：
1 删除成功
0 删除失败

购物车删除全部：
传参：(POST)
APItype=orderCarDeleteAll
返回：
1 删除成功
0 删除失败