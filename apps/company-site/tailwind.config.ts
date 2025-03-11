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
            fontFamily: {
                sans: ['var(--font-roboto)'],
                serif: ['var(--font-roboto-slab)'],
            },
        },
        screens: {
            'sm': '40rem',
            'md': '48rem',
            'lg': '1145px',
            'xl': '80rem',
            '2xl': '96rem',
        }
    },
    plugins: [],
} satisfies Config;
