import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

function isExternalLink(url: string): boolean {
    try {
        const parsedUrl = new URL(url);

        // 检查链接的hostname是否与当前页面的hostname不同
        return parsedUrl.hostname !== 'www.huanfei.top';
    } catch (error) {
        // 处理无效链接的情况
        console.error('Invalid URL:', url);
        return false;
    }
}

export default function CustomLink({ href, children }: { href: string; children: ReactNode }) {
    if (href.startsWith('#')) return <a href={href}>{children}</a>;
    if (href.startsWith('/')) return <Link href={href}>{children}</Link>;
    if (isExternalLink(href))
        return (
            <a target="_blank" href={href} rel="noopener noreferrer external nofollow">
                {children}
            </a>
        );
    return <Link href={href}>{children}</Link>;
}
