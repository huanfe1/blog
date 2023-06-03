---
title: 将 Contentlayer 作为 Next.js 数据源
date: 2023-06-03 09:20:41
abbrlink: 7f9134c6
author: 幻非
cover: https://pic.bibiu.cc/2023/05/31/64775e1e45eff.png
comments: true
tags: [Next.js, React, Contentlayer, 前端]
copyright: true
categories: 
---

Hexo 是我博客创立之初时使用的框架，尽管现在前端方面已经由 Next.js 负责，但后台的数据处理还是由 Hexo 负责。

Hexo 作为一个博客框架，其提供了前端页面展示和后台的数据处理以及以及其他一系列的功能。但是当其只作为数据处理工具时，不免便显得有些笨重了，并且其数据监控和实时刷新的功能也无法与 Next.js 进行对接。

于是，其仅剩的数据处理功能被 [Contentlayer](https://github.com/contentlayerdev/contentlayer) 这个年轻人替代，作为「开拓者」的 Hexo 完成了他的使命，退出了历史的舞台。

## 何为 Contentlayer

官网介绍到 Contentlayer 是一个 **Content SDK** ，用于验证内容并将其转化为类型安全的 JSON 数据。

之所以称之为年轻人，是因为此项目起步于 2022 年，目前还处于测试阶段，仅支持处理本地 **MD/MDX** 文件，且仅支持对接 Next.js，但据文档所写 Next.js 已经完全支持，并且还很自信写出了想要成为管理 Next.js 项目内容的首选工具，看来这位年轻人的野心还是很大的。

![image-20230530221458703](https://pic.bibiu.cc/2023/05/31/64772d8817e24.png)

项目从立项到此文章撰写时共发布了两篇文章介绍 Contentlayer 的优点。

[Introducing Contentlayer (Beta): Content Made Easy for Developers](https://www.contentlayer.dev/blog/beta)

[Why Working with Content is Hard for Developers](https://www.contentlayer.dev/blog/working-with-content-is-hard-for-developers)

这里结合自己的使用体验说一下我感觉相对于 Hexo 来说的优点：

-   支持 TypeScript ，并能根据配置文件自动生成相应的类型文件
-   更快的处理速度，采取了增量更新和并行构建，并加入了缓存系统
-   可以监控文件修改，并实时刷新页面内容
-   重量轻，所需编写代码较少，上手容易

## 工作流程

官网大体描述了 Contentlayer 的工作流程。

首先需要在本地配置好基本的类型定义以及项目目录。

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
 
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true }
  },
}))
 
export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post]
})
```

紧接着 Contentlayer 会把项目目录下的 Markdown 文件转化为 JSON 文件并保存到项目根目录下的 `.contentlayer` 文件夹内。

![image-20230530231638302](https://pic.bibiu.cc/2023/05/31/64772dd0bbf3a.png)

在自动生成的 `index.mjs` 文件内通过 `import` 的方式导入这些 `JSON` 文件并将数据合并导出以便外部引用。

![image-20230530233326709](https://pic.bibiu.cc/2023/05/31/64772d883adf6.png)

之后便可在文件内导入。

```javascript
import { allPosts } from 'contentlayer/generated'
 
export function getStaticProps({ params }) {
  return { props: { posts: allPosts.find(post => post.slug === params.slug) } }
}

export function getStaticPaths() {
    return {
        paths: allPosts.map(post => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}
```

就是这么简单，只需编写一个配置文件，之后便可在代码中直接进行导入。

## 结语

在搭建 Contentlayer 时遇到了一个中文语言的 BUG（年轻人终究还是年轻人），在提交 [PR](https://github.com/contentlayerdev/contentlayer/pull/470) 并与开发者一番交流后已成功在新版本中修复。

![image-20230601100233330](https://pic.bibiu.cc/2023/06/01/6477fb5f32c86.png)

经过此次更新，博客的文章处理和构建速度以及使用体验都得到了较大提升。在博客框架经历了 Hexo、Astro、Nuxt.js、Next.js 的迭代后，发现还是 Next.js 更合自己胃口，其在各个方面的使用体验都感到很满意，以后可能会在很长一段时间内继续使用，不再变更。
