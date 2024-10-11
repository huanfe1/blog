import Link from 'next/link';

import Color from './color';

export default function Header() {
    return (
        <div className="flex justify-between">
            <div>
                <Link href="/">
                    <h1 className="my-4 text-2xl font-bold">幻非</h1>
                </Link>
            </div>
            <nav className="my-4 flex items-center space-x-5 font-medium">
                <Link href="/posts">文章</Link>
                <a
                    aria-label="GitHub"
                    href="https://github.com/huanfe1"
                    target="_blank"
                    rel="noopener noreferrer external nofollow"
                >
                    <span className="i-mingcute-github-line" aria-hidden></span>
                </a>
                <a aria-label="RSS" href="/atom.xml" target="_blank">
                    <span className="i-mingcute-rss-2-fill" aria-hidden></span>
                </a>
                <Color />
            </nav>
        </div>
    );
}
