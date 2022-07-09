---
title: 姜饼短视频无水印分析
date: 2020-05-16 14:41:53.0
updated: 2020-09-27 21:55:24.0
url: https://www.ufec.cn/archives/jiangbing.html
featuredImage:
categories:
  - 代码
tags:
  - Fiddler
  - JavaScript
---

## 准备工作

姜饼短视频是爱奇艺旗下的短视频平台，一位朋友让我看看，就来分析试试
老规矩：找接口，看参数，找方法
不过他这个页面就两个 js，一个 md5 很明显了，一个 index 就是我们要找的，复制下来，直接开[Fiddler](/tags/fiddler.html)调试。

## 开始操作

分析发现，他将 console 这个对象内的方法都重写了，无法使用打印输出语句，不过他源码里也有打印输出，又是个大厂，一般这样的都会有一个“开关”来控制，后续维护直接打开即可，
![11111.png](https://www.ufec.cn/upload/2020/05/11111-4d0dc5fb8bd84e259e6618475992d540.png)
这个地方很明显，!1 就是开关，去掉！符号即可，后来又发现他写了一个函数接管了 console 的输出，使得在控制台看到所有输出信息都源于他自定义的那一行，感觉像是掩耳盗铃，不过这并不影响我们找他的算法，管你写的多么花里胡哨，变的就替换，不变直接抄
![jiangbing_1.png](https://www.ufec.cn/upload/2020/05/jiangbing_1-984900c223b24c75925ed6c79b64fa72.png)
结果就是这样

```
加密参数：agenttype=313&app_key=PIZZA&app_version=1.0.0&device_id=NULL&dfp=NULL&feed_id=(视频id)&method=GET&phone_type=web&phone_version=1.0.0&ptid=02007651010000000000&ts=(10位时间戳)&uri=/v1/feed/get_feed_info&1b901176e02ef8acc6a2f2da60a58434
```

直接 MD5 就完事
