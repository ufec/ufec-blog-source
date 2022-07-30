---
title: 沃派飞Young一体化登陆器
date: 2021-10-30 23:38:31.0
updated: 2021-10-30 23:38:31.0
url: https://www.ufec.cn/archives/wo-pai-fei-young-yi-ti-hua-deng-lu-qi.html
thumbnail: https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/8885de4772b45721003402ea5aca50f2.webp
categories:
  - 代码
  - 日常
tags:
  - 沃派
  - 校园网
---

# 沃派飞 Young 一体

## 导语

[上篇文章](https://www.ufec.cn/archives/lian-tong-wo-pai-xiao-yuan-wang-ming-ling-xing-bo-hao-cheng-xu.html) 写了一个沃派登录端，其实飞 young 之前也搞出来了，但由于我用的是沃派，就先把沃派版本做出来先测试，也当做是学习`Go` 开发命令行程序，为打通两个校园网做准备。

## 获得可执行文件

阿里网盘不让分享二进制可执行文件，`Windows` 上的可执行文件可以，所以暂时先从群里下载吧，有什么问题也可以及时反馈，加群链接：[点击链接加入群聊](https://jq.qq.com/?_wv=1027&k=IJM3NS6D)

## 说明

目前打包了：`Windows`版本、`Linux`版本、`Mips`版本（注：此版本用于未开启 fpu 的路由器）

功能自然与沃派版本相同：电脑用此程序连接网络后可以分享热点，但目前飞 Young 不支持更换设备，基于安卓版本分析的，`ios`版本没设备搞不来，`Windows` 版纯拨号，貌似没什么用。

经测试沃派可以，`V1.0` 版本这个暂时没加，沃派的识别逻辑貌似是 `Linux` / `Windows` / `MacOS` 均为电脑版，`Android` / `IOS`为手机，这就意味着当在路由器上执行时，会被当作电脑版，此时 PC 无法使用，看后续吧，如果有必要可以加进去

## 使用

使用逻辑上跟沃派一致

### 联网操作

```shell
Campus.exe online -u "用户名" -p "密码" // windows平台示例
```

注意：此处本应还有一个`type`参数，用于指定当前连沃派还是飞 Young，为了省去这个参数，默认你连的什么网络会自动识别（当然可能有误），第一次连接 或者 切换账号 或者 切换`type` 时必须传入 用户名，密码两个参数。此后便可省略这两个参数，如下执行即可

```shell
Campus.exe online
```

### 断网操作

```shell
Campus.exe offline
```

此处也修复了沃派版本连接时间过长会无法下线，只能靠物理断网解决

## 关于

开发这个程序主要是对抗不良运营商，网速本来就慢还时不时自动断网。

写完这个程序我也去`Github`上搜了下，近一年越来越少开发者为校园网做贡献了，基本都两年前更新过就再没更新了！！

此程序 **不收费**，但由于这已经是一个成品，所以 **不开源**，这类东西开源意味着服务商就会加快速度更新，这点我深有体会，当然技术交流是可以的，如果你也想写一个客户端，[飞 Young 密码加密、参数加解密、日志加解密服务](http://schoolnet.ufec.cn) 这个服务应该能帮到你，这是我之前用 js 改写，并还原了解密算法搭建的一个服务，主要用于理解参数、日志

此程序没有 `GUI` 界面，不是那么简单点点填填就可以运行的，如果需要 `GUI` ，可以使用 https://corehub.cn/articles/goyoung 这位大佬的版本，全端支持，图形化界面，操作简单。
