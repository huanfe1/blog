import Link from 'next/link';
import { nav } from '@/styles/module/header.module.scss';

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
                <Link href="/atom.xml" target="_blank">
                    订阅
                </Link>
                {development && <Link href="/admin">管理</Link>}
            </div>
        </nav>
    );
}
