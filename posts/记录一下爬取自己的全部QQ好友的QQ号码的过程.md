---
title: 爬取QQ好友号码
author: 幻非
date: 2022-03-25 22:12:20
tags: [Python, 爬虫]
abbrlink: '49e77776'
cover:
---

记录一下自己获取 QQ 好友号码的过程

首先通过在 QQ 邮箱的写信页面抓包发现了一个 API

![image-20220610210303504](https://img14.360buyimg.com/ddimg/jfs/t1/194441/2/31069/4173/637c4e4cEb00c0adc/150e755c380ed7ee.png)

使用 Python 进行爬取，在添加 cookie 跟 referer 后看到成功返回了内容

![image-20220610205947052](https://img10.360buyimg.com/ddimg/jfs/t1/39635/3/21065/40517/637c4e4fE3e3b32e2/fb49b2dee1fdb4ab.png)

内容结构大致如下

![image-20220610212917901](https://img12.360buyimg.com/ddimg/jfs/t1/197088/30/28120/7861/637c4e52E89d2df45/ddb64759db37cbbb.png)

其中 `sortbyupdatetime` 内存放的为所有的 QQ 联系人，甚至还有曾经删除的好友，在每行的前面为这个 QQ 好友的编号

![image-20220610213426610](https://img10.360buyimg.com/ddimg/jfs/t1/112439/5/32477/30251/637c4e56Eae2ae223/0019b54cbdcc237c.png)

每行具体的样式如下

![image-20220610214357736](https://img11.360buyimg.com/ddimg/jfs/t1/199114/4/29594/10565/637c4e58E3c0e2311/1ca6cd58c42940df.png)

而编号则存放在 `qqgroups` 中，以 QQ 分组的方式排列

![image-20220610213601875](https://img12.360buyimg.com/ddimg/jfs/t1/18885/14/19007/36542/637c4e5bE5aca00ff/85f2014cbbb5beac.png)

于是我们通过提取 `qqgroups` 中的编号，然后按照编号来提取 `sortbyupdatetime` 中的 QQ 邮箱来提取 QQ 号

全部代码如下

```python
import requests
import re

url = ''

headers = {
    "cookie": "",
    "referer": ""
}

response = requests.get(url=url, headers=headers).text

date = re.findall('sortbyupdatetime : \\[\\[(.*?)]],qqgroups', response)[0].split("],[")
qqgroups = re.findall("qqgroups : \\[\\[(.*?)]],groups", response)[0].split("],[")

number = []
for i in qqgroups:
    number.extend(re.findall("\\[(.*?),]", i)[0].split(","))

qqids = []
for i in date:
    i = i.replace('"', '')
    if i.split(",")[0] in number:
        qqids.append(i.split(",")[2].split("@")[0])

with open('QQ号.txt', 'w') as file:
    file.write('\n'.join(qqids))
```

提取结果如下

![image-20220610223808534](https://img13.360buyimg.com/ddimg/jfs/t1/32328/40/19620/8406/637c4e5eE91aaa8af/bfe33692546a8070.png)
