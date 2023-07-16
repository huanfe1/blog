import Footer from './footer';
import Header from './header';
import Top from './top';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
            <Top />
        </div>
    );
}
