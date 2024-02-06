import { NextUIProvider } from '@nextui-org/react';
import { DefaultSeo, NextSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const is404 = Component.name === 'Custom404';
    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            NProgress.start();
        });
        router.events.on('routeChangeComplete', () => {
            NProgress.done();
        });
        router.events.on('routeChangeError', () => {
            NProgress.done();
        });
    }, []);
    return (
        <>
            <DefaultSeo
                title="幻非"
                description="幻非的个人博客，记录一些技术或者想法"
                canonical={`https://www.huanfei.top${router.asPath}`}
                openGraph={{
                    siteName: '幻非',
                    url: `https://www.huanfei.top${router.asPath}`,
                    type: 'website',
                    images: [{ url: 'https://www.huanfei.top/avatar.png' }],
                }}
            />
            <NextSeo titleTemplate="%s - 幻非" noindex={is404 ? false : true} nofollow={is404 ? false : true} />

            <NextUIProvider>
                <ThemeProvider attribute="class">
                    <Component {...pageProps} />
                </ThemeProvider>
            </NextUIProvider>
        </>
    );
}
