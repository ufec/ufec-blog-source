---
title: 生成免费且支持泛域名的的SSL证书
date: 2020-06-23 15:33:08.0
updated: 2020-06-24 18:25:31.0
url: https://www.ufec.cn/archives/acme-free-ssl.html
thumbnail: https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/6276462b84dbf1a17105d26bac1e7e53.webp
categories:
  - 日常
tags:
  - SSL
---

# 使用 acme 为域名生成免费的通配符 SSL

## 安装`acme.sh`

```shell
curl  https://get.acme.sh | sh
# 创建命令快捷方式
alias acme.sh=~/.acme.sh/acme.sh
```

## 生成证书

### HTTP 方式

##### 使用的 apache 或 nginx

```shell
acme.sh --issue  -d mydomain.com   --apache/nginx
```

会自动读取配置来验证域名

##### 没有使用这些服务器软件

```shell
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

需要指定域名, 并指定域名所在的网站根目录. acme.sh 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件

### DNS 方式

这种方式的好处是, 你不需要任何服务器, 不需要任何公网 ip, 只需要 dns 的解析记录即可完成验证. 坏处是，如果不同时配置 Automatic DNS API，使用这种方式 acme.sh 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。

```shell
acme.sh  --issue  --dns   -d mydomain.com
```

然后, acme.sh 会生成相应的解析记录显示出来, 你只需要在你的域名管理面板中添加这条 txt 记录即可.等待解析完成之后, 重新生成证书:

```shell
acme.sh  --renew   -d mydomain.com
```

也可以使用域名解析商提供的 api 来实现，并且能自动更新

这里以[DNSPOD](https://www.dnspod.cn)为例，打开[密钥管理](https://console.dnspod.cn/account/token)，密钥只会显示一次，不记得只能重新创建，创建完成记得保存

```shell
export DP_Id="your api id"
export DP_Key="your api token"
acme.sh   --issue   --dns dns_dp   -d aa.com  -d www.aa.com
#以上信息自行替换
#生成通配符SSL
acme.sh   --issue   --dns dns_dp   -d aa.com  -d *.aa.com
```

这一步的过程就类似于在站长平台提交网站时，要验证域名所有者，推荐使用 API 的方式来部署，简单快捷

这里以本站域名作为示范
![111.webp](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/e152c5912e7b4007d567648fa63b2997.webp)
这样的话基本就可以

## 安装证书

默认生成的证书都放在安装目录下: `~/.acme.sh/`, 请不要直接使用此目录下的文件, 例如: 不要直接让 nginx/apache 的配置文件使用这下面的文件. 这里面的文件都是内部使用, 而且目录结构可能会变化.

正确的使用方法是使用 `--install-cert` 命令,并指定目标位置, 然后证书文件会被 copy 到相应的位置, 例如:

### Apache example:

```shell
acme.sh --install-cert -d example.com \
--cert-file      /path/to/certfile/in/apache/cert.pem  \
--key-file       /path/to/keyfile/in/apache/key.pem  \
--fullchain-file /path/to/fullchain/certfile/apache/fullchain.pem \
--reloadcmd     "service apache2 force-reload"
```

### Nginx example:

```shell
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

宝塔的话直接就可以复制证书内容，生成证书，并被存在证书夹里，根域名的任何子域名(二级域名，不支持大于二级以上的域名)都可以一键部署，很方便的。
宝塔操作示例

```shell
#创建文件夹
mkdir /www/server/panel/vhost/cert/www.yourdomain.com
#制作证书
acme.sh --install-cert -d yourdomain.com -d www.yourdomain.com \
--key-file "/www/server/panel/vhost/cert/www.yourdomain.com/privkey.pem" \
--fullchain-file "/www/server/panel/vhost/cert/www.yourdomain.com/fullchain.pem" \
--reloadcmd "service nginx force-reload"
#将www.yourdomain.com换成你的域名(多个域名就要写多次，这里用宝塔的话还是推荐手动复制到ssl配置里，可以生成通配符证书夹，其他子域名直接点部署即可，更加方便)
```

宝塔效果
![444.webp](https://ghproxy.com/https://raw.githubusercontent.com/ufec/picGoImg/main/blog/c36f6f7437469c7a03ad456129664bbb.webp)

## 更新证书

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

## 更新 acme.sh

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步.

升级 acme.sh 到最新版 :

```
acme.sh --upgrade
```

如果你不想手动升级, 可以开启自动升级:

```
acme.sh  --upgrade  --auto-upgrade
```

之后, acme.sh 就会自动保持更新了.

你也可以随时关闭自动更新:

```
acme.sh --upgrade  --auto-upgrade  0
```

## 出错怎么办

如果出错, 请添加 debug log：

```
acme.sh  --issue  .....  --debug
```

或者：

```
acme.sh  --issue  .....  --debug  2
```

请参考： https://github.com/Neilpang/acme.sh/wiki/How-to-debug-acme.sh

最后, 本文并非完全的使用说明, 还有很多高级的功能, 更高级的用法请参看其他 wiki 页面.

https://github.com/Neilpang/acme.sh/wiki

## 证书检测

查看本站在[又拍云](https://console.upyun.com/register/?invite=B1NqHP-K8)的[检测结果](https://www.upyun.com/detect?domain=www.ufec.cn&port=443)，跟免费单域名的 SSL 证书一样，在其他平台的需要手动续签，宝塔的需要实名认证，而这个支持泛域名，还能自动续签，一个字：香！

## 其他

还有一个网站也能免费生成通配符 SSL，但那个在又拍云检测结果是 B，不如这个，就不推荐了。
可以配合[又拍云](https://console.upyun.com/register/?invite=B1NqHP-K8)的 CDN 还是很不错的，又拍云联盟的活动也很可
