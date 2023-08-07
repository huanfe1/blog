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
        require('tailwindcss/plugin')(({ matchUtilities }) => {
            matchUtilities({
                x: value => ({
                    [`@apply ${value.replaceAll(',', ' ')}`]: {},
                }),
            });
        }),
    ],
    darkMode: 'class',
};
