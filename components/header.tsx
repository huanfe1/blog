import Link from 'next/link';

export default function header() {
    return (
        <div className="flex h-20 justify-center bg-white shadow-sm">
            <nav className="flex w-full max-w-6xl items-center justify-between">
                <h1>
                    <Link href="/" className="flex items-center hover:text-[--link-hover]">
                        <img src="/avatar.png" alt="幻非" className="hidden h-8 w-8 sm:block" />
                        <span className="text-lg sm:ml-3 sm:hidden">幻非</span>
                    </Link>
                </h1>
                <div className="space-x-6 rounded-full px-5 py-2 sm:bg-[--main] lg:space-x-10">
                    <Link className="hover:text-[--link-hover]" href="/">
                        首页
                    </Link>
                    <Link className="hover:text-[--link-hover]" href="/archives">
                        归档
                    </Link>
                    <Link className="hover:text-[--link-hover]" href="/about">
                        关于
                    </Link>
                </div>
                <div className="hidden items-center space-x-4 sm:flex">
                    <Link href="/atom.xml" target="_blank" className="hover:text-[--link-hover]">
                        <Rss />
                    </Link>
                </div>
            </nav>
        </div>
    );
}

const Rss = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
            </g>
        </svg>
    );
};
