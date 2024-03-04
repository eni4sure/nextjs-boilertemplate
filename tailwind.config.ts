import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        // break line
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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

                    // TODO: update as needed
                    "info": "#22D3EE",
                    "success": "#15803D",
                    "warning": "#FBBF24",
                    "error": "#DC2626",
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

export default config;
