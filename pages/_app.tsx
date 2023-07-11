import '@/styles/globals.scss';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { DefaultSeo, NextSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
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
                canonical={`https://blog.huanfei.top${router.asPath}`}
                openGraph={{
                    siteName: '幻非',
                    url: `https://blog.huanfei.top${router.asPath}`,
                    type: 'website',
                    images: [{ url: 'https://blog.huanfei.top/avatar.png' }],
                }}
            />
            <NextSeo titleTemplate="%s - 幻非" noindex={is404 ? false : true} nofollow={is404 ? false : true} />
            <Component {...pageProps} />
        </>
    );
}
