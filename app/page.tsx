import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '首页 - 幻非',
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    return (
        <div id="post">
            <p>你好，我是幻非</p>
            <p>欢迎来到我的博客</p>
        </div>
    );
}
