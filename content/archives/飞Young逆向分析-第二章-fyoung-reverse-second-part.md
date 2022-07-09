---
title: 飞Young逆向分析-第二章
date: 2021-10-04 08:36:20.0
updated: 2021-10-04 08:36:20.0
url: https://www.ufec.cn/archives/fyoung-reverse-second-part.html
featuredImage:
categories:
  - 代码
  - 日常
tags:
  - AndroidStudio
  - AndroidStudio调试
  - 反编译
  - 逆向
---

## 飞 Young 逆向分析-第二章

继上篇文章 [飞 Young 逆向分析-第一章](https://www.ufec.cn/archives/fyoung-reverse-first-part.html)，我们已经基本了解了密码加密流程和日志的加密流程，但今天分析了其他参数的算法，貌似不是和日志加密算法一样（轻松翻车），但抠出代码调用起来不难。

## 代码分析

其实代码中有我仍然很多迷惑地方，在执行登陆函数的传参处，传入的参数，和代码执行过程中对参数的处理有些看起来有冲突：传入的参数最后一次修改完成后，但后续又有参数 Map 调用了 set 方法，设置了认证请求时的参数，当然这也可能是`JD-gui`、`jadx`对`smail`语法的解释不同，导致经常是一句语句在好几个反编译软件中比较得出结论（我要是会`smail`就好了），主要程序中存在大量`if - else`、循环、`try - catch`，这就导致必须要跟，好多函数光看不能知道条件结果，又得要一边断条调试，一边多个软件中比较代码，很容易出错。

但我们可以以最好的情况去看，因为代码中有很多条件是对设备的检测，我们大可以以最正常的方式去看代码，就能略过部分繁琐无意义的代码，看了代码也就不难理解`fyoung`客户端拨个号能等半天了，迟迟连不上去，十多个参数，走这些流程，算法还得要处理时间。

## 参数分析

其实在跳转链接（给出登录链接的接口）里返回了一些有用的参数

- AidcAuthAttr1
  - 这个是时间，当然这个参数可以通过格式化时间戳来获取 格式为：yyyyMMddHHmmss
- AidcAuthAttr2
  - 这个参数貌似是用来检测 wifi 的，里面加密了一个 ip 地址，通过 ping 该 ip 地址来检测连接 wifi 是否符合要求
- AidcAuthAttr15
  - 这个参数处理后加密后就是要提交的参数 AidcAuthAttr15
- AidcAuthAttr16
  - 目前没发现这个作用
- AidcAuthAttr29
  - 目前没发现这个作用

认证接口所需要的参数，下面这些参数均调用了 `t.c` 这个函数，用 `dayKey2` 对内容加密

- AidcAuthAttr3
  - 对当前应用版本号加密
- AidcAuthAttr4
  - 对当前手机系统信息加密，格式为：`android.os.Build.BRAND;android.os.Build.MODEL;android.os.Build.VERSION.RELEASE`
- AidcAuthAttr5
  - 其实进行了两次，当我们只关心最后一次，最后一次是对跳转链接中的 IP 加密
- AidcAuthAttr6
  - 也进行了两次，最后一次是对跳转链接中的网卡地址加密
- AidcAuthAttr7
  - 默认为空
- AidcAuthAttr8
  - 这个参数就跟跳转链接中返回的 `AidcAuthAttr2` 相关了，从 `AidcAuthAttr2` 中解密出 IP 地址，`ping` 操作后会返回成功与否的信息，以及相应时间加密，由于实际操作中我们不可能去做这一步，根据返回信息，我直接伪造了 `ping` 操作返回的信息
- AidcAuthAttr15
  - 从跳转链接中取出 `AidcAuthAttr15` 该值后，`base64`解码在作为加密函数的第二个参数即可得到该值
- AidcAuthAttr22
  - 用当天 key 对 `0` 加密
- AidcAuthAttr23
  - 用当天 key 对 `success` 加密

至此我们已经解决了认证接口中所有的参数，放到 `Postman` 中请求也是轻松拿下

![fyoung_login_success](https://my-static.ufec.cn/blog/27795ce2faedd1778193cf8610fc3678.png)

## 后续

接着就是最后一步，还原`fyoung`的自定义加密算法，从而可以直接解出变量值，另外本次用到的逆向工具资源都打包放在了公众号，回复关键字 `逆向工具` 即可下载，

> 声明：为了绕过阿里云盘无法分享压缩文件，我将后缀改为了 png，下载后删掉即可

![qrcode_for_gh_b645da873ba5_258](https://my-static.ufec.cn/blog/ed6f784e00f27f9180fc7fba474a06aa.jpg)
