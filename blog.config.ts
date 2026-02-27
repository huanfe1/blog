import type { GiscusProps } from '@giscus/react';

type Config = {
    title: string;
    description: string;
    keywords: string[];
    url: string;
    language: string;
    // 评论功能
    comment?: {
        giscus?: GiscusProps;
    };
    github?: string;
    x?: string;
    // 页面分析
    analytics?: {
        google?: string;
        la51?: string;
        umami?: string;
    };
    // https://folo.is/
    folo?: {
        feedId: string;
        userId: string;
    };
};

const config: Config = {
    title: '幻非',
    description: '幻非的个人博客，记录一些技术或者想法',
    keywords: ['blog', '博客', '幻非', '技术', '生活', 'huanfei'],
    url: 'https://www.huanfe1.com',
    language: 'zh-CN',
    github: 'huanfe1',
    x: 'huanfe1',
    comment: {
        giscus: {
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
    },
    analytics: {
        la51: 'JmvyCfPiIR4wTw9W',
        umami: '8727a795-62d6-4c79-9cb0-bdf322099374',
    },
};

export { config };
