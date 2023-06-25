---
title: React 事件独特的触发方式
author: 幻非
abbrlink: 7ef72f18
date: 2022-12-17 19:22:04
tags: [前端, React]
cover: https://pic.bibiu.cc/2023/06/25/6497a4feaa53c.png
---

今天在逛知乎的时候发现顶部出现了广告横幅，并且并没有被我写的油猴脚本清除掉，于是便想把它添加到油猴脚本规则中去。

![banner](https://img11.360buyimg.com/ddimg/jfs/t1/120039/23/29311/85906/639da806E4ae9f876/68899361bbc772dd.png)

最开始想着通过更改 CSS 样式的方法解决，却发现他顶部文字处理起来及其麻烦。于是我便改变思路，通过点击右上角的按钮让他自己关闭。本以为这个方法实施起来应该没啥难度，获取元素通过 click 方法点击即可。可当我把代码敲上后却发现并没有找到 click 方法，这让我很是疑惑，试了下别的通过绑定 click 触发事件的元素也同样无法使用 click 方法。

![error](https://img12.360buyimg.com/ddimg/jfs/t1/197226/4/30996/6401/639da8aeE6d2d5899/a71dc581b75d1ff8.png)

这让我更加疑惑，我寻思这不是显示绑定着方法吗？

![listener](https://img10.360buyimg.com/ddimg/jfs/t1/137709/11/31530/14479/639da9c9E0990dd54/136c7486c4c9ee06.png)

于是我便点击进去看看到底绑定的什么函数，可看到函数却傻了眼，它绑定的函数是空的。

![function](https://img13.360buyimg.com/ddimg/jfs/t1/137420/1/30467/14231/639daa58E7ecc927f/952719d611b04227.png)

![???](https://img14.360buyimg.com/ddimg/jfs/t1/209448/27/29124/12344/639de2b6E60cd7c2b/c44ebe18cff64468.jpg)

这是啥情况？

在我不知所措，胡乱翻看时发现知乎采用了 React 框架。

![react](https://img11.360buyimg.com/ddimg/jfs/t1/199103/11/28652/38088/639dabd6E0b9d38bf/54af37416e77559f.png)

莫非这是 React 导致的？一番疯狂查阅后大概明白了什么情况。但由于之前没学过 React ，所以只了解到了个皮毛，可能有不对的地方。

在 React 中，我们给元素绑定的事件并没有绑定到元素本身上，而是绑定在了 document 上进行统一管理，元素本身绑定的函数被替换成了空函数，这在 React 中被称为**合成事件**。

> 与原生事件直接在元素上注册的方式不同的是，React 的合成事件不会直接绑定到目标 DOM 节点上，而是用事件委托机制，以队列的方式，从触发事件的组件向父组件回溯，直到 Root 节点。因此，React 组件上声明的事件最终绑定到了 Root 对象 (React17 之前是 document) 上。

因为知乎 React 版本号没有到 17 所以可以发现在 document 中绑定了许多的 click 事件。

![document](https://img14.360buyimg.com/ddimg/jfs/t1/205774/20/29353/11544/639db56bE1bb8663e/aa8627f2454c16c7.png)

这样在点击元素时会触发 document 绑定的统一事件，并在冒泡阶段来逐个触发每个元素所绑定的函数。而函数的触发在 React 中是由 dispatchEvent 函数进行处理，所以我可以通过它来出触发元素绑定的事件。

```javascript
document.querySelector('.Topstory>div:not([class]) svg').dispatchEvent(
    new MouseEvent('click', {
        bubbles: true,
    })
);
```

至此，问题解决。

---

-   [「React 进阶」一文吃透 react 事件原理](https://www.51cto.com/article/659948.html)
