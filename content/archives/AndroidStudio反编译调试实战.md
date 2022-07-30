---
title: AndroidStudio反编译调试实战
date: 2020-10-28 21:03:45.0
updated: 2020-10-28 21:03:46.0
url: https://www.ufec.cn/archives/androidstudiodebug.html
thumbnail: https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/55d8c8954ec2cbec65d4e25a5da63395.webp
categories:
  - 调试
tags:
  - AndroidStudio
  - AndroidStudio调试
  - 反编译
  - 逆向
---

# Android Studio 调试反编译文件

## 序言

​ 写这篇文章主要记录一次实战反编译调试记录，调试过程中遇到的问题等等

## 基础

​ 这次是一个很简单的小 app，没有任何壳什么的，所以前期过程中都很顺利，主要是使用 Android Studio 动态调试的过程中遇到的问题，所以需要了解一点反编译知识，还是老三件套`apktool+dex2jar+jd-gui`，`jadx`其实更方便，但仍然需要`apktool`来支持，获取`smali`源码，并动态调试，安装这些软件都很简单，不做赘述

## 开始

`apktool` 的基本两个命令

```powershell
#解包
java -jar apktool.jar d xx.apk
#打包
java -jar apktool.jar b src -o new.apk
```

另外几个后续会用到的命令

```powershell
#生成签名
keytool -genkey -alias mykeystore -keyalg RSA -validity 2100 -keystore mykey.keystore
#查看签名
keytool -list -keystore mykey.keystore
#签名文件
jarsigner -verbose -keystore mykey.keystore -signedjar 重新签名后的.apk 待签名的.apk mykeystore
```

要使用动态调试`smali`还需要下载`AS`插件`Smalidea`插件，下载地址：`https://bitbucket.org/JesusFreke/smali/downloads`下载最新版即可

注：如果你使用`AndroidStudio 4.1`的话可能会出问题(此处踩坑)，会出现说不兼容的情况，我们需要修改一下插件的配置，打开目录

`C:\Users\user\AppData\Roaming\Google\AndroidStudio4.1\plugins\smalidea\META-INF\plugin.xml`，此次文件中根元素`id`的上面添加一个根元素，内容为

`<depends>com.intellij.modules.java</depends>`

![insert_code](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/6655f08f35a720d382861a1fdc80ad24.webp)

`AndroidStudio 4.1`就能正确加载插件

安装插件后还没完，由于`AndroidStudio 4.1`内置`smali`插件（只能查看，无法断点），我们需要使`AS`使用`Smalidea`插件来打开，

按住 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd> 选择->`编辑器`->`文件类型`，找到黑色图标那个`Smali`，点击注册格式的加号，输入`*.smali`，并删除掉橙色图标的`Smali`支持

![smalidea_activte](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/8657e6ea8dce1d70c696bae5cb488803.webp)

![samli_unactive](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/5c763c1fecf71c937b70a8597a74fa90.webp)

这样就完成了准备工作

通过`apktool`解包后的目录用`AndroidStudio`打开，右键`smali`目录，选择`标记目录为`->`源目录(Source Root)`，查看`AndroidManifest.xml`文件中`application`根元素是否有`android:debuggable="true"`这个属性，一般是没有的，添加上此行代码，并在程序主`Activity`中(搜索`LAUNCHER`，有此属性值的`activity`便是主`Activity`)添加`invoke-static{}, Landroid/os/Debug;->waitForDebugger()V`此行代码

![watefor_debug](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/d0734423c57257244bcdb0ec34d2abd9.webp)

然后对修改后的文件目录进行打包、签名（小技巧，建议修改包名可以使调试版的正式版共存）

```powershell
#以调试模式打开
adb shell am start -D -S -W 包名/主Activity
#上一步运行后，会等待调试进程，保持屏幕常亮
#查找指定包名的进程
adb shell ps | findstr "包名"
#为进程绑定一个端口，这步很重要
adb forward tcp:端口号 jdwp:进程号
```

`AndroidStudio 4.1`->`运行`->`编辑配置`->`+`->`远程` 随便起个名字，`Port`填写上一步绑定的端口，然后`保存`->`运行`->`调试`即可

接下来选择所要断点的地方即可开始正常调试

## 实战

本次是以安卓版沃派的逆向演示，找出主要几个参数的加密流程，首先需要抓包了解它的认证过程，至于如何抓包不做赘述，安卓 hc 软件即可，虽然他这个没做抓包检测，但还是有一点的技巧的

### 认证流程(大致)

- 首先会请求`www.qq.com`，做网络检测
- 然后会获取所有`api`列表
- 接着访问服务器首页即使用介绍页面，(目前不清楚这一步要做什么)
- 然后根据设备的特征(`ip`、`mac`)获取相应的参数用于生成`signature`
- 根据用户的账户、密码发送认证请求，主要是请求头`X-Xinli-Auth`，`POST`的参数都是明文参数(这一步参数加密都能生成，但却被拒绝认证，估计是有些小细节我还没断点到)，成功后会在服务器留下`session`作为登录校验，并返回认证相关参数
- 结尾会在服务器查找`session`来判断是否存在

至此即为捕获到的认证流程，如下图所示(其中`IP`可能不同的地域服务器不同，连上沃派后会弹出引导界面，引导界面的地址即为服务器地址)

![auth_process](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/f3c58346b4d751c32c2a98ded79f21e8.webp)

根据调试过程来看，请求头`X-Xinli-Auth`中`response`字段是由前一个接口返回数据中的`challenge`加密而来，`signature`是由返回数据及部分特征值组合而来(`请求方式`、`请求地址`、`请求头部分字段`)拼接，再进行加密而来，加密方法为`HmacSHA1`，密钥为`s3cr3t`，附上`Java`和`PHP`实现代码

![java_netkeeper_code](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/799eb1ec25f58ac5aca0396f181f3a81.webp)

![php_netkeeper_code](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/39bd35c6a4932f8098066922a66ea8a8.webp)

加密算法也很简单，没有自己实现，用的现有的加密库，但他有个判断，我试了几次都是断进同一个点，就直接扒出来了，不知道另一个点是否对结果有影响

没找到更好的断点来捕获整个流程，验证也一直被拒绝（猜想可能是网卡），需要进一步细心断点了！！！！
