---
title: 你的一句承诺，就能避免很多错
date: 2020-05-11 16:08:00.0
updated: 2020-05-14 10:31:27.0
url: https://www.ufec.cn/archives/promise.html
featuredImage:
categories:
  - 代码
tags:
  - NodeJs
  - Promise
---

## Promise 简介

它允许您将处理程序与异步操作的最终成功值或失败原因相关联。这使异步方法可以像同步方法一样返回值：异步方法返回立即提供最终值的承诺，而不是立即返回最终值。

## 为什么用 Promise

因为 JavaScript 是单线程的，一些 I/O 操作，如网络请求，读写文件等等会使得进程阻塞，使人看起来是无响应状态，但异步操作可以弥补，可是异步操作在某些场景会使得我们得到的结果“不一致”，例如：

```JavaScript
const fs = require('fs');
fs.readFile('./cookie/bilibili.txt', (err, data)=>{
    if (err) throw "error";
    console.log(data);
});

console.log("假如此处是需要等待读取文件完成后才要执行的操作");
```

结果：

![readfile.png](https://www.ufec.cn/upload/2020/05/readfile-4718c7726aab47759c2c1c42626f8c41.png)

当然一般读一些必要文件(如 cookie、配置文件)之类的，用同步可能更好，这里只是做异步操作演示，这使得我们的代码看起来好像不是按照“顺序结构”执行，直接这么用，就会出问题。
异步不会马上返回结果，他会在将来的某个时刻执行完毕后才返回结果，如果按照顺序结构来实现逻辑，必然会出现问题，
在许多时候我们需要嵌套来解决问题，当使用异步回调来嵌套时，一不小心就会踏入[回调地狱](http://callbackhell.com/)，使得代码看起来臃肿，难以维护

### 用 Pormise 来解决有什么好处

- promise 是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
- 代码易读，便于维护
- 多个异步等待合并便于解决
- 并未剥夺函数 return 的能力，因此无需层层传递 callback，进行回调获取数据，无论成功与否，都会将结果与状态联系起来

Promise 三大状态

1. 初始状态(pending)
2. 成功状态(fulfilled)
3. 失败状态(rejected)

只能由初始变为成功或失败状态，状态一经改变不会再变，Promise 是一个构造函数，自身有 all、reject、resolve 等方法，原型上有 then、catch 等方法。
resolve：作为 Promise 的两个参数之一，与异步操作成功相关联，并将成功结果作为参数返回
reject：作为 Promise 的两个参数之一，与异步操作失败相关联，并将失败结果作为参数返回
![resolveandreject.png](https://www.ufec.cn/upload/2020/05/resolveandreject-ed87d2438a614f488d96ac4b682bfded.png)
all：方法执行后返回的依旧是 promise，可以并行多个异步操作，都成功就返回成功，并且在一个回调中处理所有的返回数据。返回的数据与传的参数数组的顺序是一样的。

```JavaScript
function read(content) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(content)
        }, 1000)
    })
}

let result = Promise.all([read(1), read(2)]);
result.then((data) => {
    console.log(data) //[ 1, 2 ]
})
```

then 用于捕获状态的改变，当有多个 then 的时候，如果 then 中返回了一个 promise 会将 promise 的结果继续传给第二 then 中（如果结果是将状态改成成功就走下一个 then 的成功回调，状态改为失败就走下一个 then 的失败回调）
这个部分可参照简书作者新叶子的文章[Promise 的基本用法(一)](https://www.jianshu.com/p/3023a9372e5f)，我就不一一搬过来了

catch 用于捕捉异常，当然单个的情况，也可以将异步操作失败的结果，作为参数放到 catch 中，与放到 then 的第二个参数基本一致，当有多个的时候，catch 用于公共的 error

## 实例场景

这是我自己写一个接口时遇到的场景。
需求：
首先手动获取 cookie，存入文件，当用户访问我的接口时，读取并携带 cookie，对用户传参进行处理请求第三方接口，获取数据。此处 cookie 有效期为两小时，需要服务端在请求第三方接口获取数据时，如果检测到 cookie 过期，去请求 refresh 接口刷新 cookie，先用刷新的 cookie 去请求第三方接口返回成功数据给用户后，在更新本地 cookie 文件，
这其中涉及了两次异步网络请求、一次异步写文件操作，第一次写的时候，没想那么多，直接多次回调，后来便出现了问题，异步网络请求还未完成，代码已经执行到了结尾，重启进程才能继续使用，

初步解决方案：
请求第三方接口作为单独一个 main 函数，刷新 token 作为单独 refresh_token 函数，只需要在检测到 cookie 过期时调用 refresh_token 这个函数，成功后回调 main 函数，后来发现跟初始方案差不多，依然会出问题，想到了当初写领券小程序时候用到的 Promise 解决生成淘口令并提示用户的问题。

最终解决方案：
main 函数和 refresh_token 函数均返回一个 Promise，将成功和失败逻辑处理好，这样一来，在最后返回结果处就一定能保证返回正确结果(这里是第三方接口未失效、网络等一切正常)，至于写文件操作依然用异步，这样能以最快的速度将结果返回给用户，而写文件操作继续执行中

个人愚见，部分来源于网上资料，如有错误请指正！！！
