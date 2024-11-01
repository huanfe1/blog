import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'inherit',
                        '--tw-prose-headings': 'inherit',
                        '--tw-prose-code': 'inherit',
                        '--tw-prose-bold': 'inherit',
                        '--tw-prose-invert-body': 'inherit',
                        '--tw-prose-invert-headings': 'inherit',
                        '--tw-prose-invert-code': 'inherit',
                        '--tw-prose-invert-bold': 'inherit',
                    },
                },
            },
        },
    },
    plugins: [
        iconsPlugin({
            collections: getIconCollections(['mingcute']),
        }),
        typography(),
    ],
    darkMode: 'class',
};
