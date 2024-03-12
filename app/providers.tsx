'use client';

import { NextUIProvider } from '@nextui-org/react';
import HolyLoader from 'holy-loader';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
    return (
        <NextUIProvider>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <HolyLoader height={2}></HolyLoader>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
}
