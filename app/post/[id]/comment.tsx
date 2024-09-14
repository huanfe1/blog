'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Comment() {
    const { theme } = useTheme();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            const scroll = document.documentElement.scrollHeight;
            const scrollPlace = Math.round(document.documentElement.scrollTop + document.documentElement.clientHeight);
            if (scroll - scrollPlace < 500) setStatus(true);
        };
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div className="mt-10">
            {status && (
                <Giscus
                    repo="huanfe1/blog"
                    repoId="R_kgDOJfgQ9g"
                    mapping="pathname"
                    category="Announcements"
                    categoryId="DIC_kwDOJfgQ9s4Cdhrx"
                    lang="zh-CN"
                    strict="1"
                    reactionsEnabled="0"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={theme === 'system' ? 'preferred_color_scheme' : theme}
                />
            )}
        </div>
    );
}
