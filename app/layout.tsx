import { Metadata } from 'next';
import React from 'react';

import Analytics from '@/components/analytics';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Top from '@/components/top';
import '@/styles/styles.scss';

import { Providers } from './providers';

export const metadata: Metadata = {
    title: {
        template: '%s - 幻非',
        default: '幻非',
    },
    description: '幻非的个人博客，记录一些技术或者想法',
    keywords: ['Blog', '博客', '幻非', '技术', '生活'],
    metadataBase: new URL('https://www.huanfei.top'),
    openGraph: {
        title: '幻非',
        description: '幻非的个人博客，记录一些技术或者想法',
        url: '/',
        siteName: '幻非',
        locale: 'zh-CN',
        type: 'website',
    },
    archives: ['/archives'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <head>
                {process.env.NODE_ENV !== 'development' && <Analytics />}
                <link rel="icon" href="/favicon.ico" type="image/ico" />
                <link rel="icon" href="/avatar.png" type="image/png" sizes="96x96" />
                <link rel="alternate" type="application/atom+xml" title="幻非" href="/atom.xml" />
                <link rel="sitemap" type="application/xml" title="Huanfei's Blog Site Map" href="/sitemap.xml" />
            </head>
            <body>
                <Providers>
                    <header>
                        <Header />
                    </header>
                    <main className="my-10">{children}</main>
                    <Top />
                </Providers>
            </body>
        </html>
    );
}
