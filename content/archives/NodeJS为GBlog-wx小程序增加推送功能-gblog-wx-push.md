---
title: NodeJS为GBlog-wx小程序增加推送功能
date: 2020-06-08 21:27:09.0
updated: 2020-06-13 14:07:46.0
url: https://www.ufec.cn/archives/gblog-wx-push.html
featuredImage:
categories:
  - 代码
tags:
  - NodeJs
  - MongoDB
  - Redis
---

## 项目来由

首先感谢[fuzui](https://gitee.com/fuzui)开源的[GBlog-wx](https://gitee.com/GeekEra/GBlog-wx)小程序项目，

[![star](https://gitee.com/GeekEra/GBlog-wx/badge/star.svg?theme=dark)](https://gitee.com/GeekEra/GBlog-wx/stargazers)[![star](https://img.shields.io/github/stars/GeekEra/GBlog-wx.svg?style=social)](https://github.com/GeekEra/GBlog-wx)

用于[halo](https://halo.run)博客，继上次 PR 的[海报功能](https://gitee.com/GeekEra/GBlog-wx/pulls/3)，总体来说，作为一个个人博客的小程序端已经很完善了，看到在评论处设有留言回复通知(这个是用于邮件通知)，由于我一般很少打开邮箱，就想到了微信推送，另外在海报功能处用到了云函数生成小程序码，考虑到免费用户的月额度有限，于是也一并写成了接口。

## 功能预览

### 安装

```git
git clone https://gitee.com/ufec/GBlog-wxpush.git
```

### 运行

```npm
npm install
npm start                //默认端口5000，可在package.json文件中修改
node /utils/schedule.js  //启动定时器程序
```

### 这里用[宝塔](https://bt.cn/)PM2 管理器作为演示

![run.jpg](https://www.ufec.cn/upload/2020/06/run-4c5dc451fff143068a810339d3d15b47.jpg)

不用宝塔也可以，后台挂起这两个服务(或者使用 nodejs 的 forever/nodemon 模块)，主服务用 nginx 反向代理即可实现一样的效果。

需要服务器可以入手腾讯云，[618 优惠 1 核 2G1M50G 硬盘，标准型 SA2 服务器三年 288RMB](https://cloud.tencent.com/act/cps/redirect?redirect=1059&cps_key=22bc3b35fb9867a983cbf371ab99c78f&from=console)
![腾讯云服务器](https://upload-dianshi-1255598498.file.myqcloud.com/345%20200%20%E6%A8%AA-b79ac5febb7dff70d7b906b29db059a0d8064a19.jpg)

### 用户端效果

![111.jpg](https://www.ufec.cn/upload/2020/06/111-92bf4d0368bf4c20ab2a683f612c3342.jpg)

## 实现过程

项目由 [NodeJS](https://nodejs.org) + [MongoDB](https://www.mongodb.com) + [Redis](https://redis.io) 构成，搭建方便，性能高效，快速开发。

### 目录结构

```
├── app.js                   //主程序
├── config                   //配置目录
│   ├── config.js            //主要配置
│   ├── database.js          //数据库配置
│   └── log4js.json          //日志配置
├── db                       //数据库目录
│   ├── collection           //数据模型
│   │   ├── article.js       //文章模型
│   │   └── comment.js       //评论模型
│   └── db.js                //数据库文件
├── log                      //日志目录
├── package.json
├── routes                   //路由文件目录
│   ├── article.js           //文章路由
│   ├── comment.js           //评论路由
│   ├── getOpenId.js         //获取用户openid路由
│   └── getQRCode.js         //生成小程序码路由
└── utils                    //功能
    ├── getToken.js          //获取微信AccessToken
    ├── log.js               //初始化日志配置
    ├── redis.js             //redis
    ├── schedule.js          //定时器
    ├── sendMsg.js           //下发模板信息
```

用到的模块：

```
express
fs
log4js
mongoose
node-schedule
path
redis
request
```

项目共有两个推送功能：留言审核和新作品推荐，需要前往小程序后台
功能->订阅消息处添加，格式如下图
![comment.jpg](https://www.ufec.cn/upload/2020/06/comment-c309186cf3ef4a5885f25ffa3a941336.jpg)

![article.jpg](https://www.ufec.cn/upload/2020/06/article-7cbc3ac4f99a4702aa3a4553336416f6.jpg)

#### !注：由于发送信息格式写死，请务必按照上图添加

app 为项目主服务，主要用于接收处理用户请求，utils/schedule 为项目的推送服务，用于定时定点发送(此项目定于每天晚上 21:30:30 执行，一般那个时候都下班了)，你也可以自定义，详见 [node-schedule 文档](https://www.npmjs.com/package/node-schedule)
routes 下为项目路由，comment 为评论订阅，article 为文章订阅，其他两个就显而易见。

## 更多选项

你可以更改 halo 博客的微信分享功能，如下图：

![微信分享](https://ae01.alicdn.com/kf/H06d3485cfc064408b3d04ce82e8de93eH.jpg)
这是基于寒山主题的修改版本，前提是小程序为[GBlog-wx](https://gitee.com/GeekEra/GBlog-wx)
做如下修改：
在 post.ftl 的最后一行添加如下代码

```JavaScript
<script>
  var img = null;
  var articleId = ${post.id?c};
  function share(e){
    $.ajax({
      url: "你的服务端地址/getQRCode?scene=id="+articleId+"&page=pages/details/index",
      success:function(result){
          img.attr('src', result.base);
      }
    });
  }

  $(document).ready(function () {
    img = $("div.social-share > a.social-share-icon.icon-wechat > div.wechat-qrcode > div.qrcode > img");
  });
</script>
```

并在 74 行添加

```
onclick="share(this);">
```

80 行改为如下内容

```HTML
<div class="social-share" data-disabled="${settings.share_disabeld!''}" data-wechat-qrcode-title="打开微信扫一扫" data-wechat-qrcode-helper="添加到我的小程序，更方便"></div>
```

即可实现。

## 一些可能的 Bug

![7.png](https://www.ufec.cn/upload/2020/06/7-be057d8c875349e5a8c0ce702246b96d.png)

- 当你看到生成小程序码出现如图所示，他明显不是一个正确的小程序码，但为什么
  结果还是 0？，这....这我遇到了好多次，原因是在你的 token 重复获取，导致上一次的 token 失效，这个有待更新，解决的方法就是：本地调试无误后上传程序到服务端运行，本地不要再获取 token，如有必要测试，请测试完成后务必删除缓存中的 token，设置的有效期与微信官方给出的一致，为：7200。在程序运行期间可能出现延迟等种种问题，你可以将他改为 3600，
- 文章标题建议尽量简短，微信限制为 20 个字(服务以及做了处理，但为了用户体验请在发布时斟酌)。

项目地址
[![Ufec/GBlog-wxpush](https://gitee.com/ufec/GBlog-wxpush/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/ufec/GBlog-wxpush)
