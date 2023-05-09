import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import Top from './top';
import { NextSeo } from 'next-seo';

export default function Layout({ children, title }) {
    return (
        <>
            <NextSeo title={title + ' - 幻非'} />
            <div className="flex min-h-screen w-full flex-col justify-between">
                <Header />
                <main className="mx-auto mb-auto py-6">{children}</main>
                <Footer />
                <Top />
            </div>
        </>
    );
}
