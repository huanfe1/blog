'use client';

import { config } from '@/blog.config';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();

    if (!config.comment) return null;
    return (
        <div className={className}>
            <Giscus theme={resolvedTheme} {...config.comment} />
        </div>
    );
}
