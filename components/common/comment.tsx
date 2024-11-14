'use client';

import { config } from '@/blog.config';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment() {
    const { theme } = useTheme();
    if (!config.comment) return null;
    return (
        <div className="mt-20">
            <Giscus theme={theme === 'system' ? 'preferred_color_scheme' : theme} {...config.comment} />
        </div>
    );
}
