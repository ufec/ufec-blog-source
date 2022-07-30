---
title: 飞Young逆向分析-第一章
date: 2021-10-02 22:20:37.0
updated: 2021-10-02 22:23:31.0
url: https://www.ufec.cn/archives/fyoung-reverse-first-part.html
thumbnail: https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/55d8c8954ec2cbec65d4e25a5da63395.webp
categories:
  - 日常
  - 调试
tags:
  - AndroidStudio调试
  - 反编译
  - 逆向
---

# 飞 Young 逆向分析

鉴于飞 young 没有`Linux`版本，于是打算手撸一个（脚本），从`Android`版本抓包来看，只需要算出那十五个参数，通过 http 请求即可拨号成功！，本以为一切会如沃派一样简单，截至写下此篇文章，只弄出来了 `密码算法` `日志加密算法`，很容易看出（猜的，还没调）日志和另外的参数均使用了 AES 加密算法，日志在前就想着先从日志下手分析，变异的 AES 属实恼火！！！

## 梆梆企业拦路虎

之前文章搞过沃派，[基于 Android Studio 动态调试 分析 沃派 ](https://www.ufec.cn/archives/androidstudiodebug.html)，上手直接 `jadx`，一看主包很小，就感觉不对劲，以压缩文件方式查看`apk`文件，在`lib`目录下有 `libDexHelper.so`，`libDexHelper-x86.so`，看雪列出了常见的[Android 加固厂商特征](https://bbs.pediy.com/thread-223248.htm)，看到是梆梆企业版，没脱过壳就很慌，疯狂爬楼，都是梆梆加固免费版的脱壳教程，感觉希望十分渺茫，唯一看到的分析都直接上`IDA`看汇编了，咱也没用过，也不敢玩，就另寻他法了。

## GoYoung-黑暗前的黎明

百度开始疯狂换关键词，最后看到一个叫 **[GoYoung](https://gitee.com/zhyaoyu/LinkGoYoung)** 的开源项目，看`Readme`的介绍很符合要求，先下载了打包好的可执行文件(好像只有`Win` 和 `Android`)运行发现可以使用，直接`clone`准备梭哈，但是开源版只有界面，主要的算法是没给出的（可以理解，开源就意味着离消亡不远了，深有体会），就想着去群里问问如何逆向出来的，如何打开思路。结果可想而知肯定竹篮打水一场空，本想着他给出了安卓应用(go 写的安卓，这波操作很帅，爱了)，tips：[Go 开发安卓应用](https://blog.gokit.info/post/go-mobile/) 。我去逆向他的不也一样的效果，一分析`apk` 看到没加固还挺高兴，但主包依然很小肯定没戏，果不其然，所有方法都在 `GoYoung.so` 里面，这咱更不会了啊，从这里开始就逐渐走上不归路，钻到死胡同里了！

## “深度” 学习

开始搜集各种逆向资料，有的忘记保存丢失了，保存了如下几个

[Android 逆向 常用脱壳](https://lazzzaro.github.io/2020/05/10/reverse-Android%E9%80%86%E5%90%91/index.html)

[安卓常见脱壳方法](https://www.freebuf.com/column/210015.html)

[IDA7.5 安卓 10 动态调试](https://bbs.pediy.com/thread-269320.htm)

先开始准备`Frida` Hook 按钮事件，布局一分析，上面的按钮、输入框、下拉框都没了，感觉像是动态渲染的一样，就没法 Hook 了啊，又查到可以通过 IDA 可以看到 so 文件里的函数，看是可以看到，都是汇编看又看不懂，搜了下关键词 `Login` 都有三个，又不能确定只能是一个个去试，借了个 `root`手机准备开干，不曾想 Hook 一个`login`程序卡了半天没反应（感觉 Go 写 Android 不太行，先不说别的一个很简单的页面，就有 100 多 MB），此法行不通又准备`IDA`动态调试飞 Young，直接反调试，人都麻了！！！

## 柳暗花明又 N 村

最后从 `渗透旁站` 的思想，想到 从飞 Young 历史版本找些蛛丝马迹，果不其然找到一个可用的版本，借助博哥的 `MT`会员强力加持成功脱壳，心想着这不就跟沃派一样了，分分钟拿下。`jadx` 直接开干，静态分析顺着调用栈在一处关键处，`jadx`无法还原代码

![jadx error](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/dc9ec7ac14e4effb15e1fe09b06e8bb5.webp)

只能想着动态调试一通操作后，调试控制台显示 `Variables debug info not available`

![debug-Variables debug info not available](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/76c18353da54e5f8dd1daf49feebfa1e.webp)

这尼玛不让看局部变量我怎么调试，我还是准备断点跟，越跟越迷糊，根本摸不清方向，花了贼长时间一直没有思绪，又在网上看到 [Akkuman 大佬的文章](http://hacktech.cn/2019/05/21/re-hubei-feiyoung-pc-version/) ，感谢 Akkuman 不吝赐教，给出了好用的工具，节省了不少时间，但还是感觉很多地方需要知道变量值，这样才能验证是否正确，又去看了看 `smail` 语法，准备构造变量，断出有价值的值，这个地方也花了点时间，一直打包不成功，打包成功也运行不起来！！！在不断乱撞墙角后，我决定删了所有的东西，捋清思路重新来过

## 真相就在代码里

明确起点，抓包看参数，主要的登陆参数出现在 `b.a.a.a.b.c.c()` 这个方法中

![fei_young_all_param](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/82551ebac7c99733b34b360bcd1566e2.webp)

反向去跟，定位到 `b.a.a.a.e.g.b()` 函数，里面便是所有参数的生成过程了，这里时看到了日志文件和参数都是 AES 加密，就想着先分析日志加密过程。

封装给开发带来便利，反之逆向就不当人，几个文件里反复横跳，只能一步一步记录下来了，如下

飞 young 日志流程

```
b.a.a.a.c.d.e();
b.a.a.a.c.d.f();
b.a.a.a.c.i.b();
b.a.a.a.c.e.a();
b.a.a.a.c.f.a();
b.a.a.a.c.f.b();
b.a.a.a.c.a.c();
b.a.a.a.c.a.a();
b.a.a.a.c.c.b();
b.a.a.a.c.c.a();
```

有几个奇怪的地方，他先是对`key`进行了像是 md5 但又不是的 hash 操作，然后对加密内容进行了一次函数处理，导致你不能直接解密，必须推导出函数处理，先第一次解密，这就意味着你必须会而且要读懂还能反向写出，这就有点儿为难人了，先搞定加密吧！上下求索最终还是成功还原了，这里看前缀就知道还原了，大部分日志都会有个时间分隔

![AES_encrypt](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/3494d3818dd43bc30e4d02b844dbc611.webp)

然后就是密码了，一样的分析出飞 young 密码流程

```java
b.a.a.a.f.t.a(key, password);
byte[] a = b.a.a.a.f.t.f(key);
b.a.a.a.f.t(a); // 构造函数
byte[] pass_byte = password.getBytes();
byte[] res = b.a.a.a.f.t.b(pass_byte);
b.a.a.a.f.q.b(res);
b.a.a.a.f.q.c(md5(res));// 这里对md5后的值又自己实现了一层处理函数

```

![encrypt_password](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/00481e8bf1335e60ca244675a0f1c8b3.webp)

这里可以看到跟抓包结果一致

![抓包_密码加密结果](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/bed01cda6158f0f8de48e73e6b8b073d.webp)

## 未完待续！！！

文中只是给出了具体思路，还原还得靠实践！！！

并没有完成整个过程，**剩余的参数生成**，以及 **反向推演 hash 操作** 和 **aes 解密**
