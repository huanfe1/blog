import Footer from './footer';
import Header from './header';
import Top from './top';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between bg-[--bg]">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
            <Top />
        </div>
    );
}
