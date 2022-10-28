/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        // Break line
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // Add color schemes
            },
            fontFamily: {
                // Add custom fonts
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: false,
        base: true,
        utils: true,
        logs: false,
        rtl: false,
        prefix: "",
        darkTheme: "dark"
    }
};
