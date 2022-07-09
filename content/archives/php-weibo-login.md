---
title: 新浪短网址接口源码，并使用PHP模拟登陆来自动更新
date: 2020-05-17 09:55:54.0
updated: 2020-09-27 21:55:23.0
url: https://www.ufec.cn/archives/php-weibo-login.html
featuredImage:
categories:
  - 代码
tags:
  - PHP
  - 新浪短网址
  - 爬虫开发
  - NodeJs
---

## 实现思路

上次发过的，通过分享链接来生成短链接，后来微博又下线了这个功能，微博还有好多地方都可以生成，发微博、评论、发私信等等都可以，网上也有通过发微博来实现的，这里我用的是发私信(因为私信接口返回的是 json 数据，可以偷懒，而且速度也要快一点)

## 项目地址

https://github.com/ufec/shortUrlApi
使用方法更新说明里面已经写好了，就不再赘述。可以使用 PHP-MongoDB 来构建对应索引数据库，这样简单清晰的结构建议用 MongoDB，MySQL 的话在这样的场景性能可能不如 MongoDB(个人见解)

## 模拟登陆

这里只讲一下思路，PHP 来实现密码加密我也还没弄出来，我用的是的 nodejs 做服务端来加密，php 直接获取即可，无需跳转。Python 的确很好实现，三行代码就搞定了加密过程，看个人选择吧，我是觉得就这一个需求，实在用不着安装 Python 和那几个包，

#### 首先预登陆

主要接口为：

```
https://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&rsakt=mod&client=ssologin.js(v1.4.19)&su=base64后的账号&_=13位时间戳
```

从这里我们可以获取公钥、服务器时间、nonce、rsakv 这些必要参数，前三个与密码明文作为 rsa 加密参数，结果作为登陆的 sp 参数的值，POST 参数：

```PHP
$postData = [
            "entry"	     => "weibo",
            "gateway"    =>	"1",
            "from"	     => "",
            "savestate"  => "7",
            "qrcode_flag"=>	"false",
            "useticket"	 => "1",
            "vsnf"	     => "1",
            "su"	     => base64_encode(用户名),
            "service"	 => "miniblog",
            "servertime" => '这里填入servertime',
            "nonce"	     => '这里填入nonce',
            "pwencode"	 => "rsa2",
            "rsakv"	     => '这里填rsakv',
            "sp"	     => '加密后的密码',
            "sr"	     => "1536*864",
            "encoding"   => "UTF-8",
            "prelt"	     => "560",
            "url"	     => "https://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack",
            "returntype" => "TEXT",
];
```

接口地址：

```
https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)
```

这里指出一点，returntype 值填 TEXT 会更好，返回 json 数据，默认的是 html，要正则取 ticket，
登录成功后，需要取出 ticket，来做下一步获取通行证的 POST 参数：

```PHP
$lastData = [
            "ticket"       => "上个过程获取的ticket",
            "ssosavestate" => time(),
            "callback"     => "sinaSSOController.doCrossDomainCallBack",
            "scriptId"     => "ssoscript0",
            "client"       => "ssologin.js(v1.4.19)",
            "_"            => (time() * 1000)
];
```

接口地址：

```
https://passport.weibo.com/wbsso/login
```

即可获取登陆 cookie，虽然我还没写出 php 的加密过程，但我相信肯定能用 PHP 来写，毕竟服务端用的 PHP 解密
![login.png](https://www.ufec.cn/upload/2020/05/login-31aff1275558496ea237cd1ed7dc6c66.png)
同样老问题，在服务器上模拟登陆，会遇到验证码，Python 可以直接保存二维码等待用户输入，但在服务器上这样不现实，可以直接调用图片识别接口来操作即可。
