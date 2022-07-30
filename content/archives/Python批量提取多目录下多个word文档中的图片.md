---
title: Python批量提取多目录下多个word文档中的图片
date: 2020-03-27 17:35:25.0
updated: 2020-09-27 20:34:30.0
url: https://www.ufec.cn/archives/3.html
thumbnail: https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/2020/05/python-891182b1a87d4053897dca586b9ac9bb.webp
categories:
  - 代码
tags:
  - Python
---

## 写在前面

写这个的起因是源于帮老师收一次作业，要求拍照，于是就收到的各式各样的格式，图片在一个文档中还能直接取出(将 word 另存为网页格式，就能看到所有图片)，一个班几十号人，每人一个文档，一个文档中就几张图片，真的很难提取，于是就有了这个项目。。。

## 实现思路

以 office 保存的 word 文件，修改后缀为 zip 格式，解压后在 word/media 下保存了文档中所有的图片，就很容易实现了，修改后缀->取出 word/media 目录下所有的图片->保存图片即可，
当然你用 wps 保存的文档是 doc，他就不能这么做，要先将 doc 转为 docx(不是直接改后缀名，要修改属性值)
使用的前提是要装了 office

## 遇到问题

Python3.x 好像都不能安装 win32com，py2.7 可以，Python3.x 可以使用此方法

```shell
pip install pypiwin32
```

多线程处理的时候，报了一个“pywintypes.com_error: (-2147221008, '尚未调用 CoInitialize。', None, None)”的错误，主线程运行的时候就不会，应该就是多个线程共用了一个资源，我们就需要在每一个线程里单独初始化，在 csdn 里找到解决方案如下

```Python
import pythoncom
```

在打开 Word 文件语句之前输入

```Python
pythoncom.CoInitialize()
```

即可解决
另外的一个需求是在提取目录下所有 Word 文档中的图片后，是否需要删除源文档，这就需要每个目录下的文件都由用户输入来决定，可在多线程里面，会将多个线程的等待输入语句一起输出，就不能做到等待用户输入了(我技术不到位，实现不了)
也试过线程锁，以及 thread.join()，好像都无法实现，后来找到一个解决方案，通过图形界面的输入框来实现这个需求即可
还有就是打包成可执行文件时，直接打包会将系统环境中的所有库都打包，程序就会很大，可以使用 pipenv 虚拟环境打包
安装 pipenv

```Python
pip install pipenv
```

为当前目录建立虚拟环境

```Python
pipenv install
```

进入虚拟环境（上一步可省略,因为没有虚拟环境的话会自动建立一个）

```Python
pipenv shell
```

安装程序中所用到的额外包(Python 自带的库就不用装了，装 site-package 下面的)，以及 pyinstaller(Python 打包库)即可

## 使用演示

原来的目录
![1.webp](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/2020/03/1-869493ca7a354bf18262b438aefd10c5.webp)
单线程操作
![2.webp](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/2020/03/2-3cac43d8a4b942de98524be74413b3f9.webp)
多线程操作
![1.webp](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/2020/03/1-085f28efc34f49419cceb477466cd5b9.webp)

## 写在结尾

那个多线程等待用户输入有知道的小伙伴，麻烦说一下呗
软件下载地址：[下载 Word 图片提取批处理工具](https://www.lanzous.com/iapl2qj)
源码还没上传 GitHub，上传后在更新
