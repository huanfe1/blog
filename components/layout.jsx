import Header from './header';
import Footer from './footer';
import Top from './top';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="mx-auto mb-auto py-6">{children}</main>
            <Footer />
            <Top />
        </div>
    );
}
