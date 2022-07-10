---
title: Pyppeteer常见问题整理
date: 2020-05-09 15:27:18.0
updated: 2020-05-11 14:36:24.0
url: https://www.ufec.cn/archives/pyppeteererrors.html
thumbnail: https://my-static.ufec.cn/blog/2020/04/timg-97d283f09f9f4ddc896ea6ea715b2380.webp
categories:
  - Bug
tags:
  - Python
  - pyppeteer
---

## 记录 Bug

### Pyppeteer 0.0.2

这个一般你使用清华源就会自动装这个，踩过很多坑，这东西 Bug 的确多

问题一：

```shell
pyppeteer.errors.TimeoutError: Navigation Timeout Exceeded: 30000 ms exceeded
```

造成原因：网页打开速度慢，或者用了代理啥的，速度慢，没设置超时时间(当然也有其他原因，遇到在更新)
解决方案：

```python
##可以先尝试降低websockets版本到6.0
pip uninstall websockets #卸载websockets
pip install websockets==6.0 #指定安装6.0版本

await page.setDefaultNavigationTimeout(timeout)
await page.goto(url, {'timeout': 1000*30})
await page.waitForNavigation({'timeout': 1000*30})
##三者可能是其中某一个，也可能都有，每个人的代码逻辑不同
```

### Pyppeteer 0.2.2

这个是[官网](https://pypi.org/project/pyppeteer/#files)最新版(2020-05-09),
问题一：

```shell
create_connection() got an unexpected keyword argument 'ping_interval'
```

这个问题一般是由于手动降低了 websockets 的版本，这个好像是必须要 8.0 以上，但你装 pyppeteer 0.2.2 这个新版本时，会自动装上，
解决办法：

```shell
pip install -U websockets
```
