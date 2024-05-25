'use client';

import HolyLoader from 'holy-loader';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange>
            <HolyLoader height={2}></HolyLoader>
            {children}
        </ThemeProvider>
    );
}
