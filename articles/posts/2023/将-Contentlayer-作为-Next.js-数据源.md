---
title: 将 Contentlayer 作为 Next.js 数据源
date: 2023-06-03 09:20:41
abbrlink: 7f9134c6
author: 幻非
cover: https://pic.bibiu.cc/2023/06/29/649c5e93bb62a.png
tags: [Next.js, React, Contentlayer, 前端]
---

Hexo 是我博客创立之初时便使用的框架，在博客经过几次框架更换后，整体框架已经由 Next.js 负责，Hexo 仅作为后台数据源使用，之所以还在使用是因为一直没有找到合适的替代品。

Hexo 作为一个博客框架，让许多人也包括我成功搭建出了属于自己人生中的第一个博客，其提供了全方位的博客处理。但是当其只作为数据处理工具时，其提供的全方位的支持不免便显得有些沉重了。并且让一个博客框架只担任数据处理的功能，显得有点杀鸡用宰牛刀。

于是，在一番对比下来，我选择了用 [Contentlayer](https://www.contentlayer.dev) 代替它的位置

## 何为 Contentlayer

官网介绍到 Contentlayer 是一个 **Content SDK** ，用于验证内容并将其转化为类型安全的 JSON 数据。

其创立于 2022 年，目前还处于测试阶段，仅支持处理本地 **MD/MDX** 文件，且仅支持对接 Next.js，但据文档所写已经对 Next.js 完全支持，并且还很自信写出了想要成为管理 Next.js 项目内容的首选工具。

![Snipaste_2023-11-17_19-38-38.jpg](https://img10.360buyimg.com/ddimg/jfs/t1/237043/20/3286/13645/655750dfF125bed87/49b8a24d82b531b5.jpg)

目前为止项目共发布了两篇文章介绍 Contentlayer 的优点。

[Introducing Contentlayer (Beta): Content Made Easy for Developers](https://www.contentlayer.dev/blog/beta)

[Why Working with Content is Hard for Developers](https://www.contentlayer.dev/blog/working-with-content-is-hard-for-developers)

这里结合自己的使用体验说一下我感觉相对于 Hexo 来说的优点：

-   支持 TypeScript ，并能根据配置文件自动生成相应的类型文件
-   更快的处理速度，采取了增量更新和并行构建，并加入了缓存系统
-   可以监控文件修改，并实时刷新页面内容
-   重量轻，所需编写代码较少，上手容易

## 项目上手

首先需要在本地配置好基本的类型定义以及项目目录。

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Post = defineDocumentType(() => ({
    name: 'Post',
    // 获取文章目录下所有的 mdx 文件
    filePathPattern: `**/*.mdx`,
    // 启用 mdx 解析
    contentType: 'mdx',
    // 定义文章的 frontmatter 类型
    fields: {
        title: {
            type: 'string',
            description: 'The title of the post',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the post',
            required: true,
        },
    },
    // 解析文章后，数据后续处理
    computedFields: {
        url: { type: 'string', resolve: doc => `/posts/${doc._raw.flattenedPath}` },
    },
}));

export default makeSource({
    // 定义文章目录地址
    contentDirPath: 'posts',
    documentTypes: [Post],
});
```

紧接着 Contentlayer 会把项目目录下的 Markdown 文件转化为 JSON 文件并保存到项目根目录下的 `.contentlayer` 文件夹内。

在自动生成的 `index.mjs` 文件内通过 `import` 的方式导入这些 `JSON` 文件并将数据合并导出以便外部引用。

```javascript
import changeMeMdx from './change-me.mdx.json' assert { type: 'json' };
import clickMeMdx from './click-me.mdx.json' assert { type: 'json' };
import whatIsContentlayerMdx from './what-is-contentlayer.mdx.json' assert { type: 'json' };

export const allPosts = [changeMeMdx, clickMeMdx, whatIsContentlayerMdx];
```

之后便可在文件内导入。

```javascript
import { allPosts } from 'contentlayer/generated';

export function getStaticProps({ params }) {
    return { props: { posts: allPosts.find(post => post.slug === params.slug) } };
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

![image.png](https://img11.360buyimg.com/ddimg/jfs/t1/222086/2/34131/54836/655751ebFcadf78b2/eb49c384b89aed9b.jpg)

经过此次更新，博客的文章处理和构建速度以及使用体验都得到了较大提升。在博客框架经历了 Hexo、Astro、Nuxt.js、Next.js 的迭代后，发现还是 Next.js 更合自己胃口，其在各个方面的使用体验都感到很满意，以后可能会在很长一段时间内继续使用，不再变更。
