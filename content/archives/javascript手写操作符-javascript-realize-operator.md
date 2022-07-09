---
title: javascript手写操作符
date: 2021-09-17 13:23:28.0
updated: 2021-09-17 13:28:46.0
url: https://www.ufec.cn/archives/javascript-realize-operator.html
featuredImage:
categories:
  - 代码
  - 日常
tags:
  - JavaScript
---

# 手写 JavaScript 中的操作符

## 手写 new 操作符

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 中对 `new` 运算符是这么介绍的：**`new` 运算符**创建一个**用户定义的对象类型的实例** 或 **具有构造函数的内置对象的实例**。

总的来说，`new` 要返回一个对象实例，如何实现呢？`MDN` 已经给出了 `new` 运算符的作用

1. 创建一个空的简单 JavaScript 对象（即`**{}**`）；
2. 为步骤 1 新创建的对象添加属性**`__proto__`**，将该属性链接至构造函数的原型对象 ；
3. 将步骤 1 新创建的对象作为`**this**`的上下文 ；
4. 如果该函数没有返回对象，则返回`**this**`。

那我们就根据这 4 步来实现，即可完成一个基础的 `new` 运算符

```javascript
function myNew(fn, ...agrs) {
  if (typeof fn !== "function") {
    throw new Error("The first args must be a function");
  }
  // 1、创建一个空的简单JavaScript对象（即{}）；
  let obj = {};
  // 2、为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
  obj.__proto__ = fn.prototype;
  // 3、将步骤1新创建的对象作为this的上下文 ；
  const res = fn.apply(obj, agrs);
  // 4、如果该函数没有返回对象，则返回this。
  return typeof res === "object" ? res : obj;

  // obj.constructor(...agrs); // 3、4步 也可以直接调用构造函数获取值返回
}
```

## 手写 `instanceof` 操作符

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，常用于检测 **`引用类型`** 变量的数据类型

JavaScript 的原型链，用如下图来表示

![JavaScript的原型链](https://gitee.com/ufec/myimg/raw/master/image//202109171312849.png)

代码解释

```javascript
function Person() {} // 定义一个Person构造函数
var person = new Person(); // 通过构造函数实例化一个对象

// 实例对象的__proto__属性指向了实例原型prototype
console.log(person.__proto__ === Person.prototype);
// 通过 Object.getPrototypeOf 获取 对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype);

// 这三行就揭示了原型链
console.log(person.__proto__ === Person.prototype);
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);

console.log(person instanceof Person);
console.log("instanceof_f", instanceof_f(person, null));

// 手写实现instanof运算符
function instanceof_f(l, r) {
  if (!Object.prototype.hasOwnProperty("prototype") || !r.prototype) {
    return false;
  }
  if (l.__proto__ === r.prototype) {
    return true;
  } else {
    // 使用递归代码清晰易懂
    return instanceof_f(l.__proto__, r);
  }
}

Person.prototype.name = "K";
person.name = "G";
Object.prototype.name = "V";

console.log(person.name);
delete person.name;
console.log(person.name);
delete Person.prototype.name;
console.log(person.name);
delete Object.prototype.name;
console.log(person.name);
```
