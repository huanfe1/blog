import { GiscusProps } from '@giscus/react';

type Config = {
    title: string;
    description: string;
    keywords: string[];
    url: string;
    language: string;
    gistId?: string;
    gistToken?: string;
    comment: GiscusProps | false;
};

export const config: Config = {
    title: '幻非',
    description: '幻非的个人博客，记录一些技术或者想法',
    keywords: ['blog', '博客', '幻非', '技术', '生活', 'huanfei'],
    url: 'https://www.huanfei.top',
    language: 'zh-CN',
    gistId: process.env.GIST_ID,
    gistToken: process.env.GIST_TOKEN,
    comment: {
        repo: 'huanfe1/blog',
        repoId: 'R_kgDOJfgQ9g',
        mapping: 'pathname',
        category: 'Announcements',
        categoryId: 'DIC_kwDOJfgQ9s4Cdhrx',
        lang: 'zh-CN',
        strict: '1',
        reactionsEnabled: '0',
        emitMetadata: '0',
        inputPosition: 'top',
        loading: 'lazy',
    },
};
