import Link from 'next/link';
import Color from './color';

const development: boolean = process.env.NODE_ENV === 'development';

export default function header() {
    return (
        <nav className="mx-auto flex h-20 w-full items-center justify-between border-b border-[--border] px-5 sm:px-16 xl:max-w-7xl xl:px-0">
            <h1>
                <Link href="/" className="flex items-center hover:text-[--link-hover]">
                    <img src="/avatar.png" alt="幻非" className="hidden h-8 w-8 sm:block" />
                    <span className="ml-3 text-lg">幻非</span>
                </Link>
            </h1>
            <div className="space-x-6 lg:space-x-12">
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
                <Color />
                {development && (
                    <Link href="/admin" className="hover:text-[--link-hover]">
                        <Setting />
                    </Link>
                )}
            </div>
        </nav>
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

const Setting = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"
            />
        </svg>
    );
};
