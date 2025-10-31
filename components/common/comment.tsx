'use client';

import { config } from '@/blog.config';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();

    const giscus = config.comment?.giscus;

    if (!giscus || process.env.NODE_ENV === 'development') return null;

    return (
        <div className={className}>
            <Giscus theme={resolvedTheme} {...giscus} />
        </div>
    );
}
