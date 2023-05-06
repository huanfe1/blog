import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import Top from './top';

export default function Layout({ children, title = '标题测试' }) {
    return (
        <>
            <Head>
                <title>{title + ' - 幻非'}</title>
            </Head>
            <div className="flex min-h-screen w-full flex-col justify-between">
                <Header />
                <main className="mx-auto mb-auto py-6">{children}</main>
                <Footer />
                <Top />
            </div>
        </>
    );
}
