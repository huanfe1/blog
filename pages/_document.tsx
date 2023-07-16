import Analytics from '@/components/analytics';
import { Head, Html, Main, NextScript } from 'next/document';

const theme = `(() => {void 0 === localStorage.theme && localStorage.setItem('theme', 'auto');document.documentElement.classList.add(localStorage.theme);})();`;

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                {process.env.NODE_ENV !== 'development' && <Analytics />}
                <link rel="icon" href="https://blog.huanfei.top/favicon.ico" type="image/ico" />
                <link rel="icon" href="https://blog.huanfei.top/avatar.png" type="image/png" sizes="96x96" />
            </Head>
            <body>
                <script dangerouslySetInnerHTML={{ __html: theme }} />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
