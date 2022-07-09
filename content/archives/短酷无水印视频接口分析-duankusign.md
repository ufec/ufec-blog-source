---
title: 短酷无水印视频接口分析
date: 2020-05-15 17:04:32.0
updated: 2020-09-27 21:55:26.0
url: https://www.ufec.cn/archives/duankusign.html
featuredImage:
categories:
  - 代码
  - 调试
tags:
  - Fiddler
  - JavaScript
---

## 准备工作

找到接口，看必要参数
![4.png](https://www.ufec.cn/upload/2020/05/4-209d64c62355416d9d891cedb6a793f0.png)
断点调试，找出生成 sign 的方法所在的 js 文件，使用[Fiddler](/tags/fiddler.html)替换文件(之前的文章已经讲过，不再赘述)，这里指出一点，使用此方法会遇到跨域的问题(用了本地转发)，不过没关系，[Fiddler](/tags/fiddler.html)依旧可以解决。具体方法如下：

```
打开  Rules->Customize Rules... 搜索 OnBeforeResponse

增加
if(oSession.uriContains("要处理的url")){
            oSession.oResponse["Access-Control-Allow-Origin"] =  "允许的域名";
            oSession.oResponse["Access-Control-Allow-Credentials"] = true;
}
保存，刷新网页
```

![3.png](https://www.ufec.cn/upload/2020/05/3-012033e2a02c4ea3ab2217546f094f58.png)
即可，QQ 音乐就有这个问题，腾讯视频也是。

## 开始操作

![1.png](https://www.ufec.cn/upload/2020/05/1-7fb47541503d48a0a8ba96d0d8e83292.png)
这一行是生成 sign 的，不用管什么参数，全打印出来就完事。
![2.png](https://www.ufec.cn/upload/2020/05/2-a724aa07178849f1acfd07def7380982.png)
这里直接比对 sign 值就可以了，多次刷新网页发现 sign 不变，这就很有意思，很有可能说明是直接用了某个加密方法，看到 substr(8,16)极大可能就是 MD5 了，他虽然写了好几万行，但那个对象转 query 请求参数，我还特意去找他怎么写得，调过来调过去的，当打印出来发现跟 nodejs 的 querystring 模块功能一样，懵了！
生成 sign 的方法就是 MD5，不过没导包，直接手写 MD5 算法，好像网上也有。附上扒下来的代码：

```JavaScript
var o = 0, r = "";
function i(e) {
    return c(a(d(e)))
}
function c(e) {
    for (var n, t = o ? "0123456789ABCDEF" : "0123456789abcdef", r = "", i = 0; i < e.length; i++)
        n = e.charCodeAt(i),
        r += t.charAt(n >>> 4 & 15) + t.charAt(15 & n);
    return r
}
function a(e) {
    return f(m(p(e), 8 * e.length))
}
function f(e) {
    for (var n = "", t = 0; t < 32 * e.length; t += 8)
        n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
    return n
}
function d(e) {
    for (var n, t, o = "", r = -1; ++r < e.length; )
        n = e.charCodeAt(r),
        t = r + 1 < e.length ? e.charCodeAt(r + 1) : 0,
        55296 <= n && n <= 56319 && 56320 <= t && t <= 57343 && (n = 65536 + ((1023 & n) << 10) + (1023 & t),
        r++),
        n <= 127 ? o += String.fromCharCode(n) : n <= 2047 ? o += String.fromCharCode(192 | n >>> 6 & 31, 128 | 63 & n) : n <= 65535 ? o += String.fromCharCode(224 | n >>> 12 & 15, 128 | n >>> 6 & 63, 128 | 63 & n) : n <= 2097151 && (o += String.fromCharCode(240 | n >>> 18 & 7, 128 | n >>> 12 & 63, 128 | n >>> 6 & 63, 128 | 63 & n));
    return o
}
function m(e, n) {
    e[n >> 5] |= 128 << n % 32,
    e[14 + (n + 64 >>> 9 << 4)] = n;
    for (var t = 1732584193, o = -271733879, r = -1732584194, i = 271733878, a = 0; a < e.length; a += 16) {
        var s = t
            , c = o
            , l = r
            , u = i;
        o = y(o = y(o = y(o = y(o = b(o = b(o = b(o = b(o = v(o = v(o = v(o = v(o = g(o = g(o = g(o = g(o, r = g(r, i = g(i, t = g(t, o, r, i, e[a + 0], 7, -680876936), o, r, e[a + 1], 12, -389564586), t, o, e[a + 2], 17, 606105819), i, t, e[a + 3], 22, -1044525330), r = g(r, i = g(i, t = g(t, o, r, i, e[a + 4], 7, -176418897), o, r, e[a + 5], 12, 1200080426), t, o, e[a + 6], 17, -1473231341), i, t, e[a + 7], 22, -45705983), r = g(r, i = g(i, t = g(t, o, r, i, e[a + 8], 7, 1770035416), o, r, e[a + 9], 12, -1958414417), t, o, e[a + 10], 17, -42063), i, t, e[a + 11], 22, -1990404162), r = g(r, i = g(i, t = g(t, o, r, i, e[a + 12], 7, 1804603682), o, r, e[a + 13], 12, -40341101), t, o, e[a + 14], 17, -1502002290), i, t, e[a + 15], 22, 1236535329), r = v(r, i = v(i, t = v(t, o, r, i, e[a + 1], 5, -165796510), o, r, e[a + 6], 9, -1069501632), t, o, e[a + 11], 14, 643717713), i, t, e[a + 0], 20, -373897302), r = v(r, i = v(i, t = v(t, o, r, i, e[a + 5], 5, -701558691), o, r, e[a + 10], 9, 38016083), t, o, e[a + 15], 14, -660478335), i, t, e[a + 4], 20, -405537848), r = v(r, i = v(i, t = v(t, o, r, i, e[a + 9], 5, 568446438), o, r, e[a + 14], 9, -1019803690), t, o, e[a + 3], 14, -187363961), i, t, e[a + 8], 20, 1163531501), r = v(r, i = v(i, t = v(t, o, r, i, e[a + 13], 5, -1444681467), o, r, e[a + 2], 9, -51403784), t, o, e[a + 7], 14, 1735328473), i, t, e[a + 12], 20, -1926607734), r = b(r, i = b(i, t = b(t, o, r, i, e[a + 5], 4, -378558), o, r, e[a + 8], 11, -2022574463), t, o, e[a + 11], 16, 1839030562), i, t, e[a + 14], 23, -35309556), r = b(r, i = b(i, t = b(t, o, r, i, e[a + 1], 4, -1530992060), o, r, e[a + 4], 11, 1272893353), t, o, e[a + 7], 16, -155497632), i, t, e[a + 10], 23, -1094730640), r = b(r, i = b(i, t = b(t, o, r, i, e[a + 13], 4, 681279174), o, r, e[a + 0], 11, -358537222), t, o, e[a + 3], 16, -722521979), i, t, e[a + 6], 23, 76029189), r = b(r, i = b(i, t = b(t, o, r, i, e[a + 9], 4, -640364487), o, r, e[a + 12], 11, -421815835), t, o, e[a + 15], 16, 530742520), i, t, e[a + 2], 23, -995338651), r = y(r, i = y(i, t = y(t, o, r, i, e[a + 0], 6, -198630844), o, r, e[a + 7], 10, 1126891415), t, o, e[a + 14], 15, -1416354905), i, t, e[a + 5], 21, -57434055), r = y(r, i = y(i, t = y(t, o, r, i, e[a + 12], 6, 1700485571), o, r, e[a + 3], 10, -1894986606), t, o, e[a + 10], 15, -1051523), i, t, e[a + 1], 21, -2054922799), r = y(r, i = y(i, t = y(t, o, r, i, e[a + 8], 6, 1873313359), o, r, e[a + 15], 10, -30611744), t, o, e[a + 6], 15, -1560198380), i, t, e[a + 13], 21, 1309151649), r = y(r, i = y(i, t = y(t, o, r, i, e[a + 4], 6, -145523070), o, r, e[a + 11], 10, -1120210379), t, o, e[a + 2], 15, 718787259), i, t, e[a + 9], 21, -343485551),
        t = _(t, s),
        o = _(o, c),
        r = _(r, l),
        i = _(i, u)
    }
    return Array(t, o, r, i)
}
function p(e) {
    for (var n = Array(e.length >> 2), t = 0; t < n.length; t++)
        n[t] = 0;
    for (t = 0; t < 8 * e.length; t += 8)
        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
    return n
}
function y(e, n, t, o, r, i, a) {
    return h(t ^ (n | ~o), e, n, r, i, a)
}
function _(e, n) {
    var t = (65535 & e) + (65535 & n);
    return (e >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t
}
function b(e, n, t, o, r, i, a) {
    return h(n ^ t ^ o, e, n, r, i, a)
}
function h(e, n, t, o, r, i) {
    return _((a = _(_(n, e), _(o, i))) << (s = r) | a >>> 32 - s, t);
    var a, s
}
function g(e, n, t, o, r, i, a) {
    return h(n & t | ~n & o, e, n, r, i, a)
}
function v(e, n, t, o, r, i, a) {
    return h(n & o | t & ~o, e, n, r, i, a)
}
```

调用方法

```JavaScript
console.log(i("11111"));
```

整个过程用 PHP 写了一下，挺简单的，测试接口地址：http://47.115.40.125:1234/duanku.php?url=https://t.kugou.com/1VN2Ga8wlV3

## 写在结尾

网页调试很容易被表象迷惑，先看参数后找方法，不然就会被一些看似繁琐的代码带偏。
网页调试：断点看过程->不懂就替换->参数都输出->CV 大法直接用
