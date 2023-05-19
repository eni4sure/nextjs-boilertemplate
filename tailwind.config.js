/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // break line
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Add color schemes
            },
            fontFamily: {
                // Add custom fonts
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: [
            {
                // docs: https://daisyui.com/theme-generator
                mytheme: {
                    "primary": "#5D5CD6",
                    "secondary": "#0DBA67",
                    "accent": "#FFB800",
                    "neutral": "#010101",
                    "base-100": "#FFFFFF",
                },
            },
            // "dark"
        ],
        base: true,
        utils: true,
        logs: false,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
};
