---
title: JavaScript-手写abc函数
date: 2021-09-17 13:23:28.0
updated: 2021-09-17 13:28:54.0
url: https://www.ufec.cn/archives/javascriptapplybindcall.html
featuredImage:
categories:
  - 代码
  - 日常
tags:
  - JavaScript
---

# 手写 abc 函数

## apply

使用方式：`Fn.apply(obj, argArray)`

作用：修改函数 `this` 指向

函数执行时 `this` 指向：谁调用指向谁，直接调用指向全局对象（`window / global`）

应用场景：当我们想把另一个对象的值应用在当前函数中，但又不想让函数成为另一个对象的属性

如下代码：

```javascript
function Fn() {
  console.log(this.name);
  console.log(arguments);
}
var name = "Lily";
Fn(1, 2, 3); // output Lily
let obj = {
  name: "Jack",
};
Fn.apply(obj, [1, 2, 3]); // output Jack
```

手写实现：

```javascript
Function.prototype.myApply = function (obj, argArray) {
  if (!obj || typeof obj === "number") {
    return;
  }
  if (typeof obj === "string") {
    obj = new String(obj);
  }
  if (argArray) {
    if (!Array.isArray(argArray)) {
      throw Error(`The second arg need array, but ${typeof argArray} given`);
    }
  }
  const fn = Symbol("fn");
  obj[fn] = this;
  const res = obj[fn](...argArray);
  delete obj[fn];
  return res;
};
// 测试代码
function Fn() {
  console.log(this.name);
  console.log(arguments);
}
var name = "Lily";
Fn(1, 2, 3); // output Lily
let obj = {
  name: "Jack",
};
Fn.apply(obj, [1, 2, 3]); // output Jack
Fn.myApply(obj, [1, 2, 3]); // output Jack
```

## bind

与 `apply` 和 `call` 不同，它返回的是一个函数，与 `call` 类似，可以传入多个参数，并且支持返回的函数传参

这就需要考虑：this 指向、两个函数的 `arguments` ，内部实现则可以直接调用已经实现的 `apply` 函数

使用方式：`Fn.bind(obj, args1, args2, .....)(args3, args4, ......)`

如下代码：

```javascript
function Fn(a, b, c, d) {
  console.log(this.name);
  console.log(a, b, c, d);
}
var name = "Jack";
let obj = {
  name: "Lily",
};
Fn(1, 2, 3, 4); // output Jack 1, 2, 3, 4

Fn.bind(obj, 1, 2)(3, 4); // output Lily 1, 2, 3, 4
```

手写实现

```javascript
Function.prototype.myBind = function (obj) {
  if (!obj || typeof obj === "number") {
    return;
  }
  if (typeof obj === "string") {
    obj = new String(obj);
  }
  // es5 写法
  let _this = this,
    inArgs = Array.prototype.slice.call(arguments, 1),
    outArgs = null;
  return function () {
    // this != _this 这个函数的this是全局对象，没有对象调用它
    outArgs = Array.prototype.slice.call(arguments);
    _this.apply(obj, inArgs.concat(outArgs));
  };
  // // es6 箭头函数写法
  // let inArgs = Array.prototype.slice.call(arguments, 1);
  // return (...args) => {
  //     this.apply(obj, [...inArgs, ...args]);
  // }
};

function Fn(a, b, c, d) {
  console.log(this.name);
  console.log(a, b, c, d);
}

var name = "Jack";

let obj = {
  name: "Lily",
};

Fn(1, 2, 3, 4); // output Jack 1, 2, 3, 4

Fn.bind(obj, 1, 2)(3, 4); // output Lily 1, 2, 3, 4

Fn.myBind(obj, 1, 2)(3, 4);
```

## call

与 `apply` 相似，`apply`第二个参数为参数数组，`call`为多个参数

使用方式：`Fn.call(obj, arg1, arg2, arg3, ......);`

如下代码

```javascript
var name = "Jack";
function Fn() {
  console.log(this.name);
}
Fn(); // output Jack
var obj = {
  name: "Lily",
};
Fn.call(obj); // output Lily
```

手动实现

```javascript
// obj：需要修改的指向，args：将多个参数合并成
Function.prototype.myCall = function (obj, ...args) {
  if (!obj || typeof obj === "number") {
    return;
  }
  if (typeof obj === "string") {
    obj = new String(obj);
  }
  // 防止覆盖原obj中的fn属性
  const fn = Symbol("fn");
  // 为传入的对象增加一个fn的属性，指向this(this指调用myCall函数的函数)
  obj[fn] = this;
  // args：展开传入的多个参数
  let res = obj[fn](...args); // 获取函数执行结果
  // 传入的obj是引用，不应该修改对象的属性
  delete obj[fn];
  return res;
};

// 测试代码
let obj = {
  name: "lily",
};
var name = "jack";

function Fn() {
  console.log(this.name);
  if (arguments.length > 0) {
    console.log("arguments", arguments);
  }
}

Fn();
Fn.call(obj, 1, 2, 3, 4);
Fn.myCall(obj, 1, 2, 3, 4);
```
