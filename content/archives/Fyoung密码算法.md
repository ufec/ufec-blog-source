---
title: Fyoung密码算法
date: 2022-09-03 10:17:40.0
updated: 2022-09-03 10:17:40.0
slug: fyoung-password-algorithm
thumbnail:
categories:
  - 代码
tags:
  - fyoung
  - 逆向
---

# Fyoung密码算法

## 前言

Fyoung最近在部分学校更新了新的认证方式，貌似认证变简单了(使用的网页认证，没有什么加密)，但是加强了检测，一旦检测到共享网络，就会封号一段时间，需要联系客服解封。

但博主的学校没有更新，依然使用的旧的认证方式，对于新飞Young还得靠其他大佬的破解，不过这个算法还是很有意思的，所以就记录一下。

当然本文只是记录了密码的算法，对于参数、日志等算法想必大家也不需要，所以就不记录了。

同时也在我的 [GitHub](https://github.com/ufec/CampusNet) 上开源了这个算法的实现，欢迎大家Star。

如果有需要参数、日志等的，可以私我，我会尽量提供。

## 算法

```js
const md5 = require("js-md5");

const DateEnum = [
	"5084972163",
	"9801567243",
	"7286059143",
	"1850394726",
	"1462578093",
	"5042936178",
	"0145937682",
	"0964238571",
	"3497651802",
	"9125780643",
	"8634972150",
	"5924673801",
	"8274053169",
	"5841792063",
	"2469385701",
	"8205349671",
	"7429516038",
	"3769458021",
	"5862370914",
	"8529364170",
	"7936082154",
	"5786241930",
	"0728643951",
	"9418360257",
	"5093287146",
	"5647830192",
	"3986145207",
	"0942587136",
	"4357069128",
	"0956723814",
	"1502796384",
];

class MyEncrypt {
	CounterByteArr = [];
	keyToByteArr = [];
	byteArrLenth = 0;
	constructor(byteArr = []) {
		if (byteArr.length > 0 && byteArr.length < 256) {
			this.byteArrLenth = byteArr.length;
			for (let i = 0; i < 256; i++) {
				this.CounterByteArr[i] = i <= 127 ? i : i - 256;
				this.keyToByteArr[i] = byteArr[i % this.byteArrLenth];
			}
			let i = 0;
			for (let j = 0; j < 256; j++) {
				i = (i + this.CounterByteArr[j] + this.keyToByteArr[j]) & 255;
				let temp = this.CounterByteArr[i];
				this.CounterByteArr[i] = this.CounterByteArr[j];
				this.CounterByteArr[j] = temp;
			}
		}
	}

	static encryptPassword(key, password) {
		let strCharArr = this.strToCharArr(key);
		let this_instance = new MyEncrypt(strCharArr);
		let passwordToByte = this.strToUtf8Bytes(password);
		let password_bytes = this_instance.swapCounterXORPass(passwordToByte);
		let crypt_pass = this_instance.encodeChangePass(password_bytes);
		return crypt_pass.length === 32 ? crypt_pass.substring(8, 24) : crypt_pass;
	}

	static charToInt(char) {
		switch (char) {
			case "0":
				return 0;
			case "1":
				return 1;
			case "2":
				return 2;
			case "3":
				return 3;
			case "4":
				return 4;
			case "5":
				return 5;
			case "6":
				return 6;
			case "7":
				return 7;
			case "8":
				return 8;
			case "9":
				return 9;
			case "A":
				return 10;
			case "B":
				return 11;
			case "c":
				return 12;
			case "D":
				return 13;
			case "E":
				return 14;
			case "F":
				return 15;
			default:
				return 0;
		}
	}

	static strToCharArr(str) {
		let res = [];
		for (let i = 0; i < str.length; i++) {
			res.push(this.charToInt(str.charAt(i)));
		}
		return res;
	}

	static strToUtf8Bytes(str) {
		const utf8 = [];
		for (let ii = 0; ii < str.length; ii++) {
			let charCode = str.charCodeAt(ii);
			if (charCode < 0x80) utf8.push(charCode);
			else if (charCode < 0x800) {
				utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
			} else if (charCode < 0xd800 || charCode >= 0xe000) {
				utf8.push(
					0xe0 | (charCode >> 12),
					0x80 | ((charCode >> 6) & 0x3f),
					0x80 | (charCode & 0x3f)
				);
			} else {
				ii++;
				// Surrogate pair:
				// UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
				// splitting the 20 bits of 0x0-0xFFFFF into two halves
				charCode =
					0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
				utf8.push(
					0xf0 | (charCode >> 18),
					0x80 | ((charCode >> 12) & 0x3f),
					0x80 | ((charCode >> 6) & 0x3f),
					0x80 | (charCode & 0x3f)
				);
			}
		}
		//兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
		for (let jj = 0; jj < utf8.length; jj++) {
			var code = utf8[jj];
			if (code > 127) {
				utf8[jj] = code - 256;
			}
		}
		return utf8;
	}

	swapCounterXORPass(strBytes) {
		let res = [];
		let i = 0,
			j = 0;
		for (let k = 0; k < strBytes.length; k++) {
			i = (i + 1) & 255;
			j = (j + this.CounterByteArr[i]) & 255;
			// 交换值
			let temp = this.CounterByteArr[j];
			this.CounterByteArr[j] = this.CounterByteArr[i];
			this.CounterByteArr[i] = temp;
			let res_temp =
				this.CounterByteArr[
					(this.CounterByteArr[i] + this.CounterByteArr[j]) & 255
				] ^ strBytes[k];
			res[k] = res_temp <= 127 ? res_temp : res_temp - 256; // 转byte操作
		}
		return res;
	}

	unswapCounterXORPass(strBytes) {
		let res = [];
		let i = 0,
			j = 0;
		for (let k = 0; k < strBytes.length; k++) {
			i = (i + 1) & 255;
			j = (j + this.CounterByteArr[i]) & 255;
			// 交换值
			let temp = this.CounterByteArr[j];
			this.CounterByteArr[j] = this.CounterByteArr[i];
			this.CounterByteArr[i] = temp;
			let res_temp =
				strBytes[k] ^
				this.CounterByteArr[
					(this.CounterByteArr[i] + this.CounterByteArr[j]) & 255
				];
			res[k] = res_temp <= 127 ? res_temp : res_temp - 256; // 转byte操作
		}
		return res;
	}

	encodeMD5(bArr) {
		let str = "";
		for (const item of bArr) {
			let temp = (item & 255).toString(16);
			if (temp.length === 1) {
				temp = "0" + temp;
			}
			str += temp.toLowerCase();
		}
		return str;
	}

	encodeChangePass(password) {
		let md5s = md5.digest(password);
		md5s.forEach((item, index) => {
			if (item > 127) {
				md5s[index] = item - 256;
			}
		});
		return this.encodeMD5(md5s);
	}
}

module.exports = {
	MyEncrypt,
	DateEnum,
};
```

> 声明：代码中除了 `strToUtf8Bytes` 函数和 `md5` 库外，其他函数均为自己实现，`strToUtf8Bytes` 函数为网上找到的，并做了一部分修改，用于将字符串转为 UTF-8 字节码来兼容汉字，不过看起来好像有点儿多余，因为密码不会是汉字，但是为了保险起见还是加上了。

> 如需转载请注明出处


## 使用

使用也是非常简单的


```js
const { MyEncrypt, DateEnum, DateEnum2 } = require("./fyoung.js");
let daykey = DateEnum[new Date().getDate() - 1];
console.log(MyEncrypt.encryptPassword(daykey, "你的Fyoung密码"));
```


## 结语

可能 `java` 版本的代码大家都有，就不发了，没什么意思。这里只是分享一下 `js` 版本的，`go` 语言版本不太好放出来(因为那已经是一个完整的项目了，不管会不会都可以非常方便的打包出可执行文件)，后续会单独抽出沃派`WeNet`的加密算法，至于认证我就不发了，还是得要留一些门槛的。
