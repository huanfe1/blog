import Analytics from '@/components/analytics';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                {process.env.NODE_ENV !== 'development' && <Analytics />}
                <link rel="icon" href="/favicon.ico" type="image/ico" />
                <link rel="icon" href="/avatar.png" type="image/png" sizes="96x96" />
                <link rel="alternate" type="application/atom+xml" title="幻非" href="/atom.xml" />
                <link rel="sitemap" type="application/xml" title="Huanfei's Blog Site Map" href="/sitemap.xml" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
