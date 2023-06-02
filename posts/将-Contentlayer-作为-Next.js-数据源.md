---
title: 将 Contentlayer 作为 Next.js 数据源
date: 2023-06-01 09:20:41
abbrlink: 7f9134c6
author: 幻非
cover: https://pic.bibiu.cc/2023/05/31/64775e1e45eff.png
comments: true
tags: [Next.js, React, Contentlayer, 前端]
copyright: true
categories: 
---

此前将博客框架由 Nuxt.js 更换到 Next.js 后便一直有过想把后台作为数据源的 Hexo 换掉的想法。

Hexo 是一个博客框架，但我只使用了其提供的数据处理功能，其他功能并没有使用，有点杀鸡用宰牛刀的感觉。并且由于我技术能力的不足，在使用 Hexo 的数据处理功能时，并没有办法原生实现数据监控以及实时刷新的功能。

但由于一直没有找到合适的项目，这个想法便一直没有得到落实，但在前几天逛 GitHub 时偶然发现的名为 [Contentlayer](https://github.com/contentlayerdev/contentlayer) 的项目却很符合我的胃口。

## 何为 Contentlayer 

官网介绍到 Contentlayer 是一个 **Content SDK** ，用于验证内容并将其转化为类型安全的 JSON 数据，使您可以轻易将其导入到应用中去。

此项目起步于 2022 年，目前还处于测试阶段，仅支持处理本地 **MD/MDX** 文件，且只支持 Next.js，但文档所写已经完全支持 Next.js ，并且很自信说出了想要成为管理 Next.js 项目内容的首选工具。

![image-20230530221458703](https://pic.bibiu.cc/2023/05/31/64772d8817e24.png)

为此作者专门发布了两篇文章介绍 Contentlayer 的优点。

[Introducing Contentlayer (Beta): Content Made Easy for Developers](https://www.contentlayer.dev/blog/beta)

[Why Working with Content is Hard for Developers](https://www.contentlayer.dev/blog/working-with-content-is-hard-for-developers)

这里写一下我感觉相对于 Hexo 来说的优点：

-   支持 TypeScript ，并能根据配置文件自动生成相应的类型文件
-   更快的处理速度，采取了增量和并行构建，并加入了缓存系统
-   可以监控文件修改，并实时刷新页面内容
-   所需编写代码较少，上手容易

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

上手需要编写的代码并不算多，具体操作流程可查看官方文档。

## 结语

在搭建 Contentlayer 时还遇到了一个中文语言的 BUG ，在提交 [PR](https://github.com/contentlayerdev/contentlayer/pull/470) 并与开发者一番交流后已成功在新版本中修复。

![image-20230601100233330](https://pic.bibiu.cc/2023/06/01/6477fb5f32c86.png)

弃用 Hexo 后，其提供的一系列扩展或工具便需要自己编写。但此次更新还是较为满意，博客的文章处理和构建速度以及使用体验都得到了较大提升。

在博客框架经历了 Hexo、Astro、Nuxt.js、Next.js 的迭代后，发现还是 Next.js 更适合自己，其在各个方面的编写体验都感到很流畅，以后可能会在很长一段时间内继续使用，不再变更。
