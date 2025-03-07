import { config } from '@/blog.config';
import Link from 'next/link';

import Color from './color';

export default function Header() {
    return (
        <header className="flex justify-between py-4">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-bold">{config.title}</h1>
                </Link>
            </div>
            <nav className="flex items-center space-x-5 font-medium">
                <Link href="/posts">文章</Link>
                {config.github && (
                    <a
                        aria-label="GitHub"
                        href={`https://github.com/${config.github}`}
                        target="_blank"
                        rel="noopener noreferrer external nofollow"
                    >
                        <span className="i-mingcute-github-line" aria-hidden></span>
                    </a>
                )}
                <a aria-label="RSS" href="/atom.xml" target="_blank">
                    <span className="i-mingcute-rss-2-fill" aria-hidden></span>
                </a>
                <Color />
            </nav>
        </header>
    );
}
