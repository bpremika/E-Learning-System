/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                offwhite: "#F6F5F4",
                greyry: "#E0E0E0",
            },
            fontFamily: {
                dela: ["Dela Gothic One , sans-serif"],
            },
            fontSize: {
                sm: ["14px", "20px"],
                base: ["16px", "24px"],
            },
        },
    },
    plugins: [],
};
