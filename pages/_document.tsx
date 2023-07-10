import { Html, Head, Main, NextScript } from 'next/document';
import Analytics from '@/components/analytics';

const theme = `(()=>{void 0===localStorage.theme&&localStorage.setItem("theme","system");const e="system"!==localStorage.theme?localStorage.theme:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(e)})();`;
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
