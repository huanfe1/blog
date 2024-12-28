'use client';

import { useTheme } from 'next-themes';

export default function Color() {
    const { setTheme, systemTheme, resolvedTheme } = useTheme();
    const click = () => {
        const toTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(toTheme === systemTheme ? 'system' : toTheme);
    };
    return (
        <div aria-hidden className="cursor-pointer" onClick={click}>
            <span className="i-mingcute-sun-line dark:i-mingcute-moon-line"></span>
        </div>
    );
}
