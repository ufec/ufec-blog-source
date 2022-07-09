---
title: 神兵利器之Aria2，加速你的下载
date: 2020-04-27 09:31:45.0
updated: 2020-09-27 21:55:38.0
url: https://www.ufec.cn/archives/aria2.html
featuredImage:
categories:
  - 神兵利器
tags:
  - Aria2
---

## 软件介绍

[aria2](http://aria2.github.io/)是用于下载文件的实用程序,主要用 C ++编写。aria2 是一个轻量级的多协议和多源命令行 下载实用程序。aria2 可以通过内置的 JSON-RPC 和 XML-RPC 接口进行操作。支持的协议是 HTTP（S），FTP，SFTP，BitTorrent 和 Metalink。aria2 可以从多个来源/协议下载文件，并尝试利用最大下载带宽。它支持同时从 HTTP（S）/ FTP / SFTP 和 BitTorrent 下载文件，而从 HTTP（S）/ FTP / SFTP 下载的数据上传到 BitTorrent 群。使用 Metalink 的块校验和，aria2 在下载 BitTorrent 之类的文件时会自动验证数据块。[GitHub 开源地址](https://github.com/aria2/aria2)，[软件下载地址](https://github.com/aria2/aria2/releases)
看看 PanDownload
![111.png](https://www.ufec.cn/upload/2020/04/111-de54157fd1994ed688743a7760cbb453.png)

## 使用方式

没有界面 UI，类似于命令行，所以需要后台挂起，保持运行，可以再 Aria2 根目录下新建一个 start.vbs 文件，用于在后台服务

```Visual Basic
CreateObject("WScript.Shell").Run "aria2c.exe --conf-path=aria2.conf",0
```

你也可以[下载其他的启动方式](https://lanzous.com/ibz8osb)，文件具体解释如下，前往 Aria2GitHub 下载页面，下载最新版，将该文件解压至你的 Aria2 保存目录

```
Start.bat      带命令行窗口输出启动 Aria2
Start.vbs      不带命令行窗口启动 Aria2
Stop.bat       停止 Aria2
Status.bat     查看 Aria2 进程状态
Restart.bat    重启 Aria2
Boot.bat       开启或取消 Aria2 开机启动
```

你还需要新建一个 aria2.conf 配置文件，来自定义，可前往[官方配置页面介绍](http://aria2c.com/usage.html)，此外更高级、详细配置可前往[官方文档](http://aria2.github.io/manual/en/html/aria2c.html#synopsis)，[
trackerslist 更新地址](https://github.com/ngosang/trackerslist)，搭建好服务器后，你可能还需要一个 UI 界面，可使用本站搭建好的 WebUI，地址:http://aria2.ufec.cn，打开设置->连接设置来连接服务器
运行 start.bat
![start.png](https://www.ufec.cn/upload/2020/04/start-3666cdcc554141e6b97766a55451e65f.png)

打开 webUI：http://aria2.ufec.cn

![webui.png](https://www.ufec.cn/upload/2020/04/webui-e25e860916974143af02be54ea277a81.png)

连接后打开设置->服务器信息
![info.png](https://www.ufec.cn/upload/2020/04/info-e868efb3c4574f54bce8395e8fb9d0c0.png)
看到如下即说明连接完成，可以开始下载任务
这里以微云普通下载为演示
![speed.png](https://www.ufec.cn/upload/2020/04/speed-0dc1a915bf4845b7a9f8bf655d49eb48.png)
无会员，速度基本稳定在是四倍以上，当然你网速快的话，可能会更高，这是 100M 宽带演示，我只分了五块，电脑性能好可以设置更高。

## 其他工具

Motrix，基于 Aria2 开发的，适用于 Linux、Windows、MacOS，界面美观，操作方便，直接就可以使用，这里依然使用同一个文件来下载测试，这里直接启用了最大 16 线程(这里指的是官方给的，貌似可以自己编译源码，好像最大是 256 线程)来下载
![motrix.png](https://www.ufec.cn/upload/2020/04/motrix-b686b3a794924f4f9df0ea88467b7470.png)
下载速度达到了 3Mb/s
![motrix_speed.png](https://www.ufec.cn/upload/2020/04/motrix_speed-d496152413784b35a9e8b72b57d9a5f3.png)
电脑平台有了，自然安卓手机也必须有，[devgianlu](https://github.com/devgianlu)大佬，写好了手机服务端+下载端，安装两个 APP 即可：Aria2Android 和 Aria2App
