---
title: 解锁网易云音乐灰色歌曲
date: 2020-07-01 21:34:46.0
updated: 2020-09-27 21:55:15.0
url: https://www.ufec.cn/archives/unlockcloudmusic.html
featuredImage:
categories:
  - 神兵利器
tags:
  - NodeJs
---

# 解锁网易云音乐

## 前言

众所周知，网易云很多歌曲没有版权，无法直接播放，用惯了网易云而又不想装很多音乐软件，这款工具就能解决这个通病。文章转载自 gitee，由[meng-chuan](https://github.com/meng-chuan)的开源项目而来，[GitHub 地址](https://github.com/meng-chuan/Unlock-netease-cloud-music)，[Gitee 地址](https://gitee.com/meng-chuan/Unlock-netease-cloud-music)。

如果你是手机端，不想看后续，如下方法

### 安卓端

连接 WiFi，设置代理为自动代理，地址：`https://wy.ydlrqx.com/proxy.pac`，

### IOS 端

首先点击**链接**：[https://raw.githubusercontent.com/nondanee/UnblockNeteaseMusic/master/ca.crt](https://raw.githubusercontent.com/nondanee/UnblockNeteaseMusic/master/ca.crt) 添加证书，随后在 `设置` > `通用` > `关于本机` > `证书信任设置` 下，手动开启证书，具体参考**Apple 官方说明**：[https://support.apple.com/zh-cn/HT204477](https://support.apple.com/zh-cn/HT204477) 。

安装后依次打开无线局域网＞ HTTP 代理＞配置代理，然后把代理选择为自动配置模式，地址同 Android 端一样，记得点击右上角的存储！！！

## 项目介绍

网易音乐相信不需要我过多的介绍大家也都知道，由于各种限制，相信很多人在听歌的时候也注意到了，很多的音乐呈现灰色的样式，是无法播放的，如下图所示。今天就带大家**把灰色不能听的音乐全部变成可以正常播放的音乐**，而且是**全平台通用**哦！

![3utjKK.png](https://s2.ax1x.com/2020/02/21/3utjKK.png)

## 特性

- 使用 QQ / 虾米 / 百度 / 酷狗 / 酷我 / 咪咕 / JOOX 音源替换变灰歌曲链接 (默认仅启用一、五、六)
- 为请求增加 `X-Real-IP` 参数解锁海外限制，支持指定网易云服务器 IP，支持设置上游 HTTP / HTTPS 代理
- 完整的流量代理功能 (HTTP / HTTPS)，可直接作为系统代理 (同时支持 PAC)

## Windows 端方法一：

1.打开网易云音乐客户端，进入设置页面，设置自定义代理

- 自定义代理 ：填写服务器地址和端口号

- 代理服务器地址：127.0.0.1 （推荐本机搭建，速度快）

- 代理服务器端口：52000

  ![3uthuT.png](https://s2.ax1x.com/2020/02/21/3uthuT.png)

**2.安装 node.js**

官方网站：[http://nodejs.cn/download/](http://nodejs.cn/download/)

下载后双击软件安装包打开安装，一直点下一步直到完成即可

![3ut5bF.png](https://s2.ax1x.com/2020/02/21/3ut5bF.png)

3.**下载项目源码**

[点我下载](https://gitee.com/meng-chuan/Unlock-netease-cloud-music/attach_files/425118/download)

下载太慢？上蓝奏云链接：[https://www.lanzoux.com/b00npjmfa](https://www.lanzoux.com/b00npjmfa)密码:6666

下载后解压到任意文件夹,双击点开 Unlock-netease-cloud-music 文件夹中名为：网易.bat 的文件

![3ut4DU.png](https://s2.ax1x.com/2020/02/21/3ut4DU.png)

注：此窗口不可关闭，可以最小化

以后每次打开网易云先运行网易.bat 这个文件即可解锁所有灰色歌曲，在这里先恭喜你成功学会了第一种解锁网易云音乐灰色歌曲的方法

# Windows 端方法二：

注意：Windows 7 如无法执行则需升级 Powershell 到 3.0 以上，XP 不支持，**下载地址**：[https://docs.microsoft.com/powershell/scripting/install/installing-powershell](https://docs.microsoft.com/powershell/scripting/install/installing-powershell)

![GGWNse.png](https://s1.ax1x.com/2020/04/02/GGWNse.png)

第一步，安装代理

以 `管理员身份` 打开 `Powershell`，Windows 10 快捷入口：`Win + X` - `Windows Powershell(管理员)(A)`

[![GGhBgf.png](https://s1.ax1x.com/2020/04/02/GGhBgf.png)

复制以下代码，右键粘贴到命令行回车，打开安装菜单。

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force
Invoke-Expression -Command (Invoke-WebRequest -UseBasicParsing -Uri https://bit.ly/2RYvE3p).Content
```

![GGI1g0.png](https://s1.ax1x.com/2020/04/02/GGI1g0.png)

- 随后选择 `1` 即安装。
- 安装完毕后选择 `3` 运行。
- 如需添加开机自启，则执行 `7`。
- 最后输入 `0` 退出。

![GGTr7D.png](https://s1.ax1x.com/2020/04/02/GGTr7D.png)

**第二步，设置代理**

打开网易云音乐客户端，进入设置页面，设置自定义代理

- 自定义代理 ：填写服务器地址和端口号

- 代理服务器地址：127.0.0.1 （推荐本机搭建，速度快）

- 代理服务器端口：6666

  ![GGLULq.png](https://s1.ax1x.com/2020/04/02/GGLULq.png)

  此方法理论上只需操作一次，如使用一段时间后无法解锁，则需要重新执行命令，选择 `5` 更新。

## Windows 端方法三：

优点：无需下载任何资源，只需几步设置即可，话不多说，直接上干活，我这里以 win10 为例，其他系统操作类似：

**第一步：鼠标左键点击桌面右下角的通知气泡**

![3utoE4.png](https://s2.ax1x.com/2020/02/21/3utoE4.png)

**第二步：然后鼠标左键点击所有设置**

![3utWvV.png](https://s2.ax1x.com/2020/02/21/3utWvV.png)

**第三步：鼠标左键点击点击进入网络和 intrnet**

![3ut759.png](https://s2.ax1x.com/2020/02/21/3ut759.png)

**第四步，脚本地址**：[https://wy.ydlrqx.com/proxy.pac](https://wy.ydlrqx.com/proxy.pac)

**操作步骤请直接看下图，都是使用鼠标左键点击**

![3utbCR.png](https://s2.ax1x.com/2020/02/21/3utbCR.png)

**第五步，打开网易云音乐，进入设置，操作步骤见下图，都是使用鼠标左键点击**

![3utq81.png](https://s2.ax1x.com/2020/02/21/3utq81.png)

最终效果如下:

![3utOv6.png](https://s2.ax1x.com/2020/02/21/3utOv6.png)

# macOS 端

macOS 端的使用与以上 Windows 端第三种方法同理，依次打开系统偏好`设置`＞`网络`＞`高级`＞`代理`，然后填入**地址**：[https://wy.ydlrqx.com/proxy.pac](https://wy.ydlrqx.com/proxy.pac)

若安装了 SS，可编辑 ~/.ShadowsocksX-NG/gfwlist.js 将底部 **FindProxyForURL** 函数修改为

```
function FindProxyForURL(url, host) {
  if (host == 'music.163.com' || host == 'interface.music.163.com' || host == 'interface3.music.163.com' || host == 'apm.music.163.com' || host == 'apm3.music.163.com' || host == '59.111.181.38' || host == '59.111.181.60' || host == '223.252.199.66' || host == '223.252.199.67' || host == '59.111.160.195' || host == '59.111.160.197' || host == '193.112.159.225' || host == '39.105.63.80' || host == '47.100.127.239' || host == '118.24.63.156' || host == '59.111.181.35' || host == '115.236.118.33' || host == '115.236.121.1' || host == '112.13.122.1' || host == '112.13.119.17' || host == '103.126.92.132') {
    return 'PROXY 106.52.127.72:19951;'
  }

  if (defaultMatcher.matchesAny(url, host) instanceof BlockingFilter) {
    return proxy;
  }

  return direct;
}
```

之后同 iOS 方法安装 CA 证书

# Linux 端

会用 Linux 的都不应该是小白，所以这里就不截图了，直接上文字描述

Linux 端的使用也同样与以上 Windows 端第三种方法和 macOS 端方法同理，依次进入系统`设置`＞`网络`＞`网络代理`，然后填入**地址**：[https://wy.ydlrqx.com/proxy.pac](https://wy.ydlrqx.com/proxy.pac)

# 总结

Windows 端共提供了 3 种方法，推荐使用方法二(第一步操作可能会报错，请多试几次，实在不行就一行一行的执行)。此方法优势：只需操作一次，且部署在本地，不受代理服务器网速的影响。至于手机端如果不想使用 WiFi 可以考虑使用 ss 或者 ssr 代理(本人身在国内，不方便提供方法，可自行百度)
