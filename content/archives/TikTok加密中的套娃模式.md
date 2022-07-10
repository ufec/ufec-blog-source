---
title: TikTok加密中的套娃模式
date: 2020-06-28 10:48:47.0
updated: 2020-09-27 21:55:20.0
url: https://www.ufec.cn/archives/tiktok-signature.html
thumbnail: https://my-static.ufec.cn/blog/091efef0c2d7bc9ad9b66d83399cb0f7.jpg
categories:
  - 代码
  - 调试
tags:
  - JavaScript
  - NodeJs
  - TikTok
---

# TikTok 加密中的套娃模式

## 引言

tiktok 相比国内的某音的网页版做的不错，以至于你基本可以将他的网页版当作 APP 来使用，登录也自然是可以的(整体看上去跟 APP 差别不大)，也没有必要去搞什么拔卡、应用变量修改啥的，只要你有连接大世界的工具，你就可以[来到抖音](https://www.tiktok.com/trending)。这也给调试带来了方便(其实并不方便)，因为网页意味着他写的代码你可见但不一定清晰，用不着反编译 TikTokAPP，去看一堆堆的混淆过后的代码。

## 起步

先随便看一个接口的参数

![tiktok_param](https://my-static.ufec.cn/blog/bf6f01ca0443fb29dd0c44887945da16.jpg)

这两个基本上是每一个接口都必须的，其他的根据不同的接口来动态构造，其中 verifyFp，通过搜索可以看到定义处：

![verifyFp](https://my-static.ufec.cn/blog/224add7dce9491de59e1262ab3d83428.jpg)

很明显从 cookie 中获取，我本以为他是在某一个接口中返回的，当我看完一整个请求后，我发现我还是太年轻了，她根本没有，于是就搜索那个 cookie 的名称：

![cookie_s_v_web_id](https://my-static.ufec.cn/blog/cbac85f0372638be8f2682f6e373ac05.jpg)

这里就很明显了，在此处设置了 cookie，便于后续获取，生成值 e 的代码如下

```javascript
function() {
    var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
      , e = t.length
      , n = (new Date).getTime().toString(36)
      , r = [];
    r[8] = r[13] = r[18] = r[23] = "_",
    r[14] = "4";
    for (var o, i = 0; i < 36; i++)
        r[i] || (o = 0 | Math.random() * e,
        r[i] = t[19 == i ? 3 & o | 8 : o]);
    return "verify_" + n + "_" + r.join("")
}();
```

看不懂不要管，能跑就行。

剩下的就是 sign 那个参数，第一次通过断点接口，触发断点后，真的怀疑人生，F10 按了半天没看到 sign 值的计算和出现，有一个循环是真的牛批，用了好多秒，”不走一遍内存的路，永远不知道内存承受了什么“，这里真的不建议去断点接口，更建议直接断点代码，老规矩，直接搜索`_signature`，就会发现只有三个 js 中出现，其中有一个 js 中很明显不是，就缩小了范围，当然这个断点也需要有耐心，也比较长，但比断点接口还是好的多。过程中你会发现有一个`acrawler.js`的文件，里面就是一个核心，内容如下：

![acrawler_js](https://my-static.ufec.cn/blog/eca1f9d79e015edac6f43826c3d1ef0a.jpg)

说他不像函数，他又用了函数构造器，说她像个函数，里面又有一些不该有的东西

### 小插曲 Function

```javascript
Function(
  (function (t) {
    console.log(t);
  })("1111")
)();

(function (t) {
  console.log(t);
})("1111");
```

这两段代码效果是一样的。

根据上面的代码，直接把那个拿出来跑，发现返回值是一个 js 代码，另存为新的 js 文件，却又发现内部还是有一堆看起不来不像函数，却能用`eval`执行的”伪代码“，再运行，它的返回值又是一份 js 代码，在另存为新文件，发现里面又有一堆英文字母和数字组成的奇怪”代码“，于是我天真的以为这就是最后的结果，直接拿出来跑，结果一记暴击，控制台赫然出现`undefined`，TikTok 套娃成功，后来看了一些资料，发现代码执行后会生成一个全局`byted_acrawler`对象而没有返回值，里面就有 sign 方法用来生成参数`_signature`，最后也是成功的生成了参数`_signature`，并通过了校验，不过那个获取视频详情的接口，生成的`_signature`有点儿问题，要多次请求才有可能出现结果，其他的例如获取作者所有的视频接口还是可以通过的。

![res_url](https://my-static.ufec.cn/blog/af78e70da5f0a38c2102fc418d52a210.jpg)

访问如下：

![res_json](https://my-static.ufec.cn/blog/32c49647b72fded03dce3a777a1b07ae.jpg)

当然这个里面的视频是有水印的，[无水印接口](https://www.apibug.com/webcode/779.html)，如果没有国外服务器，域名，可以配合腾讯云函数来实现，每个月免费百万次调用，性能强劲，配置简单，[腾讯云函数详情](https://url.cn/IppU0m0Y)。

## 结尾

需要源码可以关注`TopCode`公众号

![qrcode_for_gh_b645da873ba5_258](https://my-static.ufec.cn/blog/ed6f784e00f27f9180fc7fba474a06aa.jpg)

回复：`TikTok验签源码`，即可获取下载链接。
