import type { Config } from "tailwindcss";
import { black, white, transparent, gray, blue, orange } from "tailwindcss/colors"
import plugin from "@tailwindcss/typography"

const config: Config = {
    darkMode: "selector",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            "sm": "481px",
            "md": "981px",
            "lg": "1280px",
            "xl": "1536px",
            "2xl": "1701px",
        },
        colors: {
            black,
            white,
            transparent,
            blue,
            // red,
            gray,
            // green,
            orange,
            primary: "#318CE7",
            "bg_primary": "var(--bg-primary)",
            "bg_secondary": "var(--bg-secondary)",
            "bg_tertiary": "var(--bg-tertiary)",
            "text_primary": "var(--text-primary)",
            "red": "#DC2626",
            "green": "#16A34A"
        },
        extend: {
            transitionProperty: {
                "height": "height"
            },
            flex: {
                "auto-0": "0 0 auto"
            }
        },
    },
    plugins: [
        plugin,
    ],
};

export default config;
