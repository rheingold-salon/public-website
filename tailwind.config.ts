import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                salongreen: "#c0dc04",
            },
        },
        screens: {
            'sm': '40rem',
            'md': '60rem',
            'lg': '64rem',
            'xl': '80rem',
            '2xl': '96rem',
        }
    },
    plugins: [],
} satisfies Config;
