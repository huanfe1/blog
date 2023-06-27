---
title: Python模块 Python-Dotenv
author: 幻非
date: 2022-03-28 20:14:20
tags: [Python]
abbrlink: e622ce8
cover:
---

这几天看到 Github 上面的一个 Python 模块`python-dotenv`，他可以帮你把 Python 项目中的一些账号，密码等敏感信息存放在环境变量中，防止泄露。而我之前一般是用`.ini`文件来储存的，而现在新学到的这个方法似乎更简单、便捷、安全

[Github 仓库](https://github.com/theskumar/python-dotenv)

1. 安装这个模块
   `pip install python-dotenv `

2. 要使用这个模块我们需要在项目根目录下创建一个`.env`文件跟一个`.py`文件

    ```
    .
    ├── .env
    ├── main.py
    ```

3. `.env`文件中填写我们的敏感配置信息

    ```
    # .env
    ACCOUNT=ADMIN
    PASSWORD=123456
    ```

4. `.py`文件中调用`load_dotenv`函数

    这个函数的作用是解析`.env`文件，然后将里面的变量加载为环境变量

    ```python
    # main.py

    import dotenv

    dotenv.load_dotenv()
    ```

    之后就可以在函数里面使用`os.environ`或`os.getenv`来调取环境变量了

    ```python
    import os

    print(os.environ['ACCOUNT'])
    print(os.getenv('PASSWORD'))

    >>>
    ADMIN
    123456
    ```
