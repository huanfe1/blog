import { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';
import Top from './top';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between bg-content1 text-foreground transition-transform-background">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
            <Top />
        </div>
    );
}
