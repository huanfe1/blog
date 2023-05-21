import '@/styles/globals.scss';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
    const router = useRouter();
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
            <DefaultSeo title="幻非" description="幻非的个人博客" />
            <Component {...pageProps} />
        </>
    );
}
