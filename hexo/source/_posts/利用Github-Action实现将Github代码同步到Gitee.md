---
title: 利用GitHub Actions实现将GitHub代码同步到Gitee
author: 幻非
abbrlink: 2be65f67
date: 2022-05-29 12:24:20
tags: [Github]
cover: https://img12.360buyimg.com/ddimg/jfs/t1/117849/39/31323/57620/63c130baF7ca348dc/55d957d1c1392617.webp
---

利用 Github Action 实现将 Github 上面的代码同步到 Gitee 中

同步的原理是利用 SSH 公私钥配对的方式拉取 Github 仓库的代码并推送到 Gitee 仓库中，所以我们需要以下几个步骤

1. [生成 SSH 公私钥](#生成ssh-公私钥)
2. [添加公钥](#添加公钥)
3. [添加私钥](#添加私钥)
4. [配置代码](#配置代码)

## 生成 SSH 公私钥

在 git Bash 中输入 `$ ssh-keygen -t ed25519 -C "me@gitee"`

然后按照提示完成三次回车后便会在用户根目录下的 `.ssh` 目录下生成三个文件

![image](https://img14.360buyimg.com/ddimg/jfs/t1/43826/5/21493/6274/637c4d67E33721cab/79428d387f3e470f.png)

打开 `id_ed25519.pub` 获取生成的**公钥**

打开 `id_ed25519` 获取生成的**私钥**

## 添加公钥

将 SSH 生成的**公钥**分别添加到 [Github](https://github.com/settings/ssh/new) 跟 [Gitee ](https://gitee.com/profile/sshkeys) 中

![image-20220529144458777](https://img11.360buyimg.com/ddimg/jfs/t1/114196/39/31107/7478/637c4d84Ecfd6e235/023a2cdfd1a88b4e.png)

![image](https://img13.360buyimg.com/ddimg/jfs/t1/93046/11/33435/8182/637c4d95E976699fd/c187fecf8981491e.png)

## 添加私钥

_如果你还没有生成与 Github 相对应的 Gitee 仓库，记得先创建，推荐使用 url 导入的方式创建_

在需要同步的 Github 仓库里面依次进入 `Settings > Secrets > Actions`

点击 `New repository secret` 按钮

![image](https://img11.360buyimg.com/ddimg/jfs/t1/193661/34/28519/41347/637c4da3E5c0c77ed/993a8dc2e0fa39f3.png)

`name` 这里使用 `GITEE_PRIVATE_KEY`

`Value` 填之前生成的**私钥**

![image](https://img12.360buyimg.com/ddimg/jfs/t1/197658/5/29865/13536/637c4db0Ec575e440/d230f5743d5981ad.png)

## 配置代码

在需要同步的 Github 仓库根目录下创建 `.github/workflows` 文件夹，并在该目录下创建后缀为 `yml` 的文件

这里命名为 `sync-gitee.yml`

该文件里面填入以下内容

```yaml
name: Sync To Gitee

on: [push, delete, create]

jobs:
    sync:
        runs-on: ubuntu-latest
        steps:
            - name: Sync to Gitee
              uses: wearerequired/git-mirror-action@master
              env:
                  SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
              with:
                  source-repo:
                  destination-repo:
```

其中 `source-repo` 为 Github 仓库 SSH 地址

![image](https://img13.360buyimg.com/ddimg/jfs/t1/129691/21/28089/17717/637c4dbcE88ac195c/74d79474c994392a.png)

`destination-repo` 为 Gitee 仓库 SSH 地址

![image](https://img12.360buyimg.com/ddimg/jfs/t1/17721/2/20280/13146/637c4dc5E3cadb03c/7de9de23440e95f6.png)

## 结语

[添加公钥](#添加公钥)的操作只需执行一次，但[添加私钥](#添加私钥)跟[配置代码](#配置代码)需要每个仓库执行一次，**所以请务必保存好私钥**，以备后续使用
