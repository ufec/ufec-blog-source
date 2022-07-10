---
title: 安装WSL(Windows Linux)
date: 2020-04-18 09:09:09.0
updated: 2020-05-24 14:44:28.0
url: https://www.ufec.cn/archives/5.html
thumbnail: https://my-static.ufec.cn/blog/2020/05/wsl-285f5aa5262f4102ba3a09b43a576705.webp
categories:
  - 日常
tags:
  - WSL
---

## 开始安装

在自带的 MicrosoftStore 搜索 Linux，选择自己想要的系统，
![store.webp](https://my-static.ufec.cn/blog/2020/04/store-4ab3534639f6460097c319ceea157bcc.webp)
这里我选的 Ubuntu，直接搜 Ubuntu 也可，安装完成后启动，如果有如下提示
![install.webp](https://my-static.ufec.cn/blog/2020/04/install-3bb67cc367fe443c945f3e350aaa3a45.webp)
当然也可能报错，无法启动。那就可能是没开启 WindowsLinux 子系统支持，打开程序和功能->启用或关闭 Windows 功能，找到适用于 Linux 的 Windows 子系统，勾选确定等待配置，重启，即可打开

切换 root 用户
![root.webp](https://my-static.ufec.cn/blog/2020/04/root-41a9765651cc42cfbfc22a718e9ccda2.webp)

## 一些要点

WSL 是 Windows 的一个子服务，终端中无法重启 Windows 的服务，如果使用 reboot 命令，会报一个

```shell
System has not been booted with systemd as init system (PID 1). Can't operate.
```

的错误，如果有重启的需要可以以管理员身份运行 PowerShell，输入

```shell
Get-Service LxssManager | Restart-Service
```

LxssManager 就是 Linux 服务，重启它即可

## 换源操作

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo chmod 777 /etc/apt/source.list
vi /etc/apt/source.list
```

删除原来的，换为阿里源

```shell
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

```shell
sudo apt update
sudo apt upgrade
```

## 安装图形化界面

```shell
apt-get install vnc4server
vnc4server
```

除此启动需要设置密码
编辑配置文件

```shell
vi /root/.vnc/xstartup
```

修改如下

```shell
#!/bin/sh
export XKL_XMODMAP_DISABLE=1
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
gnome-panel &
gnome-settings-daemon &
metacity &
nautilus &
gnome-terminal &
#这是gnome的配置
```

安装图形化界面 gnome(这个很简洁)，追求美观可以去找别的，界面如下
![gui.webp](https://my-static.ufec.cn/blog/2020/04/gui-d695dd390efd41ce988e1422b6575279.webp)
