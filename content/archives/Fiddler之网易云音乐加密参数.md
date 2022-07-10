---
title: Fiddler之网易云音乐加密参数
date: 2020-04-24 13:38:38.0
updated: 2020-09-27 21:55:35.0
url: https://www.ufec.cn/archives/6.html
thumbnail: https://my-static.ufec.cn/blog/2020/04/fiddler-b77a5668439447babfb3f1803d89311b.webp
categories:
  - 代码
  - 调试
tags:
  - Fiddler
  - JavaScript
---

## Fiddler 简介

&emsp;&emsp;[Fiddler](https://www.telerik.com/fiddler)是一款 Web 调试代理工具，用于记录计算机和 Internet 之间的所有 HTTP（S）通信。检查流量，设置断点，并伪造请求/响应。

## 实现方法

&emsp;&emsp;利用 Fiddler 替换原网站 js，通过断点调试，找出关键参数，并提取全部加密方法，从而达到可以直接生成接口的加密参数，配合会员的 cookie，就可以获取会员才能看到的内容。

## 分析过程

先找一首非会员试听歌曲，找到接口
![find_one.webp](https://my-static.ufec.cn/blog/2020/04/find_one-b59bc5dbf1bc4035a85042358a608dd6.webp)

找到关键参数
![find_two.webp](https://my-static.ufec.cn/blog/2020/04/find_two-052b21a982ea4f24b319fadb67044d54.webp)

分析页面 js，找到生成这两个参数的地方
![get_one.webp](https://my-static.ufec.cn/blog/2020/04/get_one-9ddc88323e31456483b60a3b6eda86c0.webp)

Copy 大法，准备伪造的副本
![get_three.webp](https://my-static.ufec.cn/blog/2020/04/get_three-a80f7c6d519846c0a70f7f393b71fa95.webp)

上才艺
![get_two.webp](https://my-static.ufec.cn/blog/2020/04/get_two-75b208da05644a17b2f87de11a11faa1.webp)

调试技巧之禁用缓存：找到 Network 选项卡，勾选 Disable cache 选项，当然你不勾也行，那你就得清空缓存，再刷新页面，勾选后启动 AutoResponder 直接刷新即可

看表演
![res_one.webp](https://my-static.ufec.cn/blog/2020/04/res_one-3b4df0468c9c4fa094ae26a02cd50909.webp)

![res_two.webp](https://my-static.ufec.cn/blog/2020/04/res_two-9c0b49a66a234d30906a66b26ce68372.webp)

![res_three.webp](https://my-static.ufec.cn/blog/2020/04/res_three-e923c495d75746a5914584053a360980.webp)

然后就是对着源码一顿 Copy，把主要的东西搞出来就行了，那些固定的直接写死，然后放在一个 js 文件里，就可以动态生成，虽然他这个参数可以直接 copy 一份，但那样显得来路不明，js 脚本是 2019 年 5 月 Copy 好的，那时候还不会用 js 的加密，用的 php 来加密的，现在看起来就很 low，我就不发了，如果实在不会，带上邮箱留言，但自己动手实现一遍会更有意思，

```JavaScript
 brx9o(["流泪", "强"]), brx9o(["爱心", "女孩", "惊恐", "大笑"])
```

不知道这加密参数是网易云音乐哪位程序员的故事，细思极恐！

## 写在结尾

&emsp;&emsp;应该没啥要补充的了，想起来再改，本文仅供参考，接口勿用于商业！！！
