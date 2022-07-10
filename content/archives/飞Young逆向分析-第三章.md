---
title: 飞Young逆向分析-第三章
date: 2021-10-10 14:16:07.0
updated: 2021-10-10 14:16:07.0
url: https://www.ufec.cn/archives/fyoung-reverse-third-part.html
thumbnail: https://my-static.ufec.cn/blog/5cbc7afdc3fd99feefbb44e3734fcccc.png
categories:
  - 代码
  - 日常
tags:
  - AndroidStudio
  - AndroidStudio调试
  - 反编译
  - 逆向
---

# 飞 Young 逆向分析-第三章

由于沃派老是莫名掉线，于是基于之前的文章，把沃派的认证程序撸了出来，耽误了飞 young 第三章，加急赶了出来

在第一章我们分析了密码和日志加密算法

在第二章我们分析了认证参数加密算法

本章我们将解密这些参数，即模拟后端校验参数，当然密码除外，众所周知`md5`无法还原，这也就没意义了，退一万步来讲有人能解`md5`， 密码是被截取的，仅凭那 16 位也根本无法还原。可以大概猜测数据库中存的是密码原文，用户发起认证，根据用户名取出密码，走一遍加密流程，比对密文即可。

## 还原参数

这个地方很巧妙，用到了 **异或运算** 的特性：**异或运算的逆运算是其本身**，这样一来，原本可能复杂的解密算法，只需要复制加密算法修改一个位置即可实现，什么意思呢？如下代码：

```java
int a = 10, b = 20;
int xorRes = a ^ b; // a 与 b的异或结果
System.out.println(xorRes); // 30
System.out.println(b ^ xorRes); // 10
System.out.println(a ^ xorRes); // 20
```

也就是说，我们已知异或结果，和另一个值即可还原原来两个相异或的值，于是乎我们不难写出解密函数`decode_param`

![fyoung_decode_param](https://my-static.ufec.cn/blog/bb94178f82e971bfc06b114f98288f5d.png)

鉴于此，我写了一个`node`服务，用于解密参数，以及生成密码，无需繁琐抓包（只需要传入密码即可，无需担心账号密码泄露）

服务地址：[校园网服务](http://schoolnet.ufec.cn/)

有问题加群反馈：874629948，[点击此处直接加群](https://jq.qq.com/?_wv=1027&k=qTTYmb8v)

## 还原日志

注： 以下日志均是在 `Android` 设备下，其他设备暂未尝试

日志是先对数据进行了压缩，压缩算法为 `deflate`

> **DEFLATE**是同时使用了**LZ77 算法**与 [哈夫曼编码](https://baike.baidu.com/item/哈夫曼编码/1719730)（Huffman Coding）的一个无损数据[压缩算法](https://baike.baidu.com/item/压缩算法/2762648)。

这个地方目前没用 js 还原出来，这里也是先用 Java 简单的写了一个日志解析，待 js 还原出来，一并上线到校园网服务

![fyoung_decode_android_log](https://my-static.ufec.cn/blog/999b66cbe5f6629390975c1e0a2b1b29.png)

从日志我们可以看到更多的东西，日志打的挺多的，每个步骤干了啥，基本都有

至此，飞 Young 告一段落
