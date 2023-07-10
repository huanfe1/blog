import Header from './header';
import Footer from './footer';
import Top from './top';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
            <Top />
        </div>
    );
}
