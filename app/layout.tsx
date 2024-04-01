import React from 'react';

import Analytics from '@/components/analytics';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Top from '@/components/top';
import '@/styles/globals.scss';

import { Providers } from './providers';

export const metadata = {
    title: '幻非',
    description: '幻非的个人博客，记录一些技术或者想法',
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
                    <div className="flex min-h-screen w-full flex-col justify-between bg-content1 text-foreground">
                        <Header />
                        <main className="mb-auto">{children}</main>
                        <Footer />
                        <Top />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
