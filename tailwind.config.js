import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        iconsPlugin({
            collections: getIconCollections(['mingcute']),
        }),
    ],
    darkMode: 'class',
};
