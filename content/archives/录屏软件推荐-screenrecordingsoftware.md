---
title: 录屏软件推荐
date: 2020-10-28 20:56:58.0
updated: 2020-10-28 21:21:45.0
url: https://www.ufec.cn/archives/screenrecordingsoftware.html
featuredImage:
categories:
  - 神兵利器
tags:
  - Bandicam
  - ScreenRecording
---

## 免费实用录屏软件推荐

## OBS Studio

> 免费并且开源的软件，用于视频录制和实时流。在 Windows，Mac 或 Linux 上快速轻松地下载并开始流式传输。

常见的场景是直播时用 OBS 推流，开源免费的特点使得它能跨平台运作，许多平台也都支持，但他同时也是一款好用的录屏软件，

[OBS 官网](https://obsproject.com)，下载对应的平台后打开默认会有引导，可以直接跳过，进入主界面(Windows 10 为例)

![obs_home](https://my-static.ufec.cn/blog/2df2e67bd2106e89c16a35e820e221c6.png)

首先需要配置一个场景，不同的场景有不同的选项，这样你就可以定义一个录屏场景，一个直播场景，只需配置一次在不同场景中切换即可。

注：Win10 中，可能你在来源中选择了显示器采集(录制屏幕)会显示黑屏，貌似是不兼容独显，下面将会介绍另一款开源的录屏，同样存在此问题，`Win + i 键打开设置`->`系统`->`图形设置` 图形设置首选项里面选择`桌面应用`，点击`浏览`，打开`OBS安装目录`选择`bin\64bit\obs64.exe`，下面会多一个`OBS Studio`，点击`选项`，选择`节能`即可让 OBS 优先使用集显运行，重启 OBS 即可解决问题

## Bandicam（班迪录屏）

> 一款简单好用的录屏大师，录屏幕，录游戏，录视频的功能强大的屏幕录像软件，比起其他软件其性能更加卓越。 与其他软件相比，用 Bandicam 录制的视频大小更小，不仅保证原文件的质量。下载免费版，可录制时间最长为 10 分钟，录制视频打上（www.BANDICAM.com）水印。购买Bandicam授权，能够永久使用无功能限制的完整版。

如果你仅仅只是想用录屏，可以考虑这个，挺不错的，虽然收费，但会有`PJ`方案，主界面如下

![bandicam_home](https://my-static.ufec.cn/blog/778c02a3c71c5d5860a6638d496d5e7e.png)

[PJ 补丁下载](https://pan.ufec.cn/%E8%BD%AF%E4%BB%B6/)

使用补丁前必须先[下载班迪录屏](https://www.bandicam.cn/downloads/)。PJ 补丁下载完成后，需要`以管理员身份运行`，才可以使用 PJ 补丁。界面如下

![bandi_pojie_soft](https://my-static.ufec.cn/blog/910dde27cff12ad23685760b0c1f40de.png)

`Email Address`可以随便写，点击`Register application`按钮，再打开 Bandicam 软件即可使用。PJ 成功后如图

![bandi_pojie](https://my-static.ufec.cn/blog/269292d18feed1f2055898cc8ab6d242.png)

为了防止联网验证，可以修改 hosts 文件(在`C:\Windows\System32\drivers\etc`)，在文件末尾添加两行

```
127.0.0.1 bandicam.com
127.0.0.1 ssl.bandisoft.com
```

即可，当然保存需要管理员身份，或者可以在防火墙中设置规则`Win + R 输入 firewall.cpl`，选择左侧高级设置，右键`出站规则`->`新建规则`->`程序`->`此程序路径(选择Bandicam安装路径中的bdcam.exe)`->`阻止连接`即可(一些烦人弹窗广告也可以设置防火墙规则来拦截)

为了保持激活状态，请不要点击授权信息右侧的刷新按钮，激活成功后即可删除 PJ 补丁文件，奔放使用！！！

## Captura

这是一款开源免费轻量的录屏软件，开源地址：https://github.com/MathewSachin/Captura 这款软件同样不支持独显(我用的 Nvida 提示不支持)，`右键NVIDA控制面板`->`程序设置`->`添加` 选择`bdcam.exe` 在`为此程序选择首选图形处理器`中选择`集成图形`，重启软件即可使用。

软件默认是英文的，`打开设置界面` -> `UI` -> `Language` ->选择中文简体即可

![captura_setting](https://my-static.ufec.cn/blog/783adebdca71f5dd5032a14219846c1a.png)

这些都软件都很不错，当然也有其他的，例如`EV录屏`等等，自用这几款感觉很不错
