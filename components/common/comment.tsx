'use client';

import { config } from '@/blog.config';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();

    const gicsus = config.comment?.gicsus;

    if (!gicsus || process.env.NODE_ENV === 'development') return null;

    return (
        <div className={className}>
            <Giscus theme={resolvedTheme} {...gicsus} />
        </div>
    );
}
