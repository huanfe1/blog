'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment() {
    const { theme } = useTheme();

    return (
        <div className="mt-10">
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
                loading="lazy"
            />
        </div>
    );
}
