---
title: 高效多开微信
date: 2020-07-01 20:02:31.0
updated: 2020-09-27 21:55:17.0
url: https://www.ufec.cn/archives/morewechat.html
featuredImage:
categories:
  - 代码
  - 日常
tags:
  - bat
---

# 高效多开微信

## 前言

网上的确有很多方法，但大部分都是要多开几个复制几行命令，另存[批处理](https://baike.baidu.com/item/%E6%89%B9%E5%A4%84%E7%90%86/1448600)文件备用，但我感觉还是有点儿麻烦，靠手速点的咱就另谈了。

## 实现

话不多说上代码

```bash
@echo off
title @author Ufec https://github.com/ufec
:这里可以自定义，不用每次打开都输入
set path=""

if "%1" == "" (
set /p num=请输入要多开的数目：
) else (
set "var="&for /f "delims=0123456789" %%i in ("%1") do set var=%%i
if defined var (set num=1) else (set num=%1)
)


set wechat=Wechat.exe
if %path% == "" set /p path=请输入微信安装目录:

if %num% leq 0 set num=1

cd /d %path%

for /L %%i in (1,1,%num%) do (
start %wechat%
)

echo %num%个微信多开完毕
pause
```

在第四行粘贴你的微信目录（右键微信->属性->起始位置），当然你不输入也可以，只要你不嫌麻烦，运行的时候再输入也是可以的；

运行方式一：双击打开 bat 文件

![run_bat_way](https://my-static.ufec.cn/blog/1a21469195a0004097b2c1751341882f.png)

如图，输入你要开启的数目即可，不推荐这种方式

方式二：命令行运行

`Win+R`输入 cmd，或者`Win+X`选择`Windows PowerShell 或 Windows PwoerShell(管理员)`，`cd`切换到命令行所在目录，输入 bat 文件名 多开数目，回车即可，如下图

![run_dos_way](https://my-static.ufec.cn/blog/f24f544bf8f4abc470f837caeb446d6a.png)

方式三：直接运行(推荐此方法)

首先需要修改环境变量，按下`Win`键，输入`环境变量`，选择右方的编辑系统环境变量，点击`环境变量`，在下方`系统变量`选择`Path`，点击`新建或者编辑`，新建就选择浏览目录，编辑就点浏览，找到你的 bat 文件存放目录后确定，

![set_env_](https://my-static.ufec.cn/blog/05c7b9945e41be32e39ac269bdc2dc0e.png)

`Win+R`输入 bat 文件名 打开的数目，回车即可，如下图

![winR_way](https://my-static.ufec.cn/blog/4817280da18c7968e05680b27ce330c0.png)

你可以重命名 bat 文件为你喜欢的名字（如果要修改成 WeChat，那就不要放在微信目录下），看个人喜好
