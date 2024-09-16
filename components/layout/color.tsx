'use client';

import { useTheme } from 'next-themes';

export default function Color() {
    const { setTheme, systemTheme, resolvedTheme } = useTheme();
    const click = () => {
        const toTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(toTheme === systemTheme ? 'system' : toTheme);
    };
    return (
        <a className="flex cursor-pointer items-center">
            <span className="i-mingcute-sun-line text-xl dark:i-mingcute-moon-line" onClick={click}></span>
        </a>
    );
}
