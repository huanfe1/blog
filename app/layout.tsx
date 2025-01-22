import { config } from '@/blog.config';
import type { Metadata } from 'next';
import React from 'react';

import Analytics from '@/components/layout/analytics';
import Header from '@/components/layout/header';
import Top from '@/components/layout/top';
import '@/styles/index.scss';

import { Providers } from './providers';

export const metadata: Metadata = {
    title: {
        template: `%s - ${config.title}`,
        default: config.title,
    },
    authors: { url: config.url, name: config.title },
    description: config.description,
    keywords: config.keywords,
    metadataBase: new URL(config.url),
    openGraph: {
        title: config.title,
        description: config.description,
        url: '/',
        siteName: config.title,
        locale: config.language,
        type: 'website',
        images: '/og.jpg',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang={config.language} suppressHydrationWarning>
            <head>
                {process.env.NODE_ENV !== 'development' && <Analytics />}
                <link rel="icon" href="/favicon.ico" type="image/ico" />
                <link rel="icon" href="/avatar.png" type="image/png" sizes="96x96" />
                <link rel="alternate" type="application/atom+xml" title={config.title} href="/atom.xml" />
                <link rel="sitemap" type="application/xml" title="Site Map" href="/sitemap.xml" />
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
