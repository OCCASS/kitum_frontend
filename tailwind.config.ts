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
            // red,
            gray,
            // green,
            orange,
            primary: "#318CE7",
            "bg_primary": "var(--bg-primary)",
            "bg_secondary": "var(--bg-secondary)",
            "bg_tertiary": "var(--bg-tertiary)",
            "bg_codeblock": "var(--bg-codeblock)",
            "text_primary": "var(--text-primary)",
            "red": "#DC2626",
            "blue": "#3285ff",
            "green": "#16A34A",
            // Calendar complnent
            "lesson-event-bg": "rgba(183, 213, 255, 0.7)",
            "homework-event-bg": "rgba(245, 254, 172, 0.7)",
            "completed-event-bg": "rgba(209, 213, 219, 0.7)",
            "holiday-table-item-bg": "rgb(231, 255, 227)",
            "holiday-table-item-text": "rgb(44, 198, 18)",
            "holiday-table-item-text-secondary": "rgb(137, 217, 124)",
        },
        extend: {
            transitionProperty: {
                "height": "height"
            },
            flex: {
                "auto-0": "0 0 auto"
            },
            spacing: {
                "header_height": "64px",
            }
        },
    },
    plugins: [
        plugin,
    ],
};

export default config;
