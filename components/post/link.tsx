import Link from 'next/link';
import React from 'react';

function isExternalLink(url: string): boolean {
    if (url.startsWith('#') || url.startsWith('/')) return false;
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

export default function CustomLink(props: React.AnchorHTMLAttributes<HTMLElement>) {
    const { href } = props;

    if (isExternalLink(href)) {
        return <a {...props} target="_blank" rel="noopener noreferrer external nofollow" />;
    }

    return <Link href={href} {...props} />;
}
