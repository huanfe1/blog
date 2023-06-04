import Link from 'next/link';
import { nav } from '@/styles/module/header.module.scss';
import Color from './color';

const development = process.env.NODE_ENV === 'development';

export default function header() {
    return (
        <nav className={nav}>
            <div>
                <Link href="/">幻非</Link>
            </div>
            <div>
                <Link href="/">首页</Link>
                <Link href="/tags">标签</Link>
                <Link href="/archives">归档</Link>
                {development && <Link href="/admin">管理</Link>}
                <Link href="/atom.xml" target="_blank" className="flex items-center">
                    <Rss />
                </Link>
                <Color />
            </div>
        </nav>
    );
}

const Rss = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
            </g>
        </svg>
    );
};
