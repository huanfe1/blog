'use client';

import HolyLoader from 'holy-loader';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange>
            <HolyLoader height={1.5}></HolyLoader>
            {children}
        </ThemeProvider>
    );
}
