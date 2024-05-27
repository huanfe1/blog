import type { Metadata } from 'next';

import Markdown from '@/components/markdown';

export const metadata: Metadata = {
    title: '首页 - 幻非',
    alternates: {
        canonical: '/',
    },
};

const text = `
你好，我是幻非

欢迎来到我的博客

遨游互联网十余载，在此留下一点自己的痕迹
`;

export default async function Home() {
    return (
        <div id="post">
            <Markdown>{text}</Markdown>
        </div>
    );
}
