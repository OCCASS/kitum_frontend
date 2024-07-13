import type { Config } from "tailwindcss";
import { black, gray, orange, transparent, white } from "tailwindcss/colors"
import { default as typographyPlugin } from "@tailwindcss/typography"

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
            gray,
            orange,
            "primary-bg": "var(--bg-primary)",
            "error-bg": "rgba(220, 38, 38, 0.2)",
            "secondary-bg": "var(--bg-secondary)",
            "tertiary-bg": "var(--bg-tertiary)",
            "codeblock-bg": "var(--bg-codeblock)",
            "primary-text": "var(--text-primary)",
            "primary-border-color": "var(--primary-border-color)",
            "skeleton-bg": "var(--skeleton-bg)",

            "red": "rgb(220, 38, 38)",
            "blue": "#3285ff",
            "green": "#16A34A",

            // Calendar colors
            "primary-table-item-bg": "var(--primary-table-item-bg)",
            "secondary-table-item-bg": "var(--secondary-table-item-bg)",
            "secondary-table-item-text-hover": "var(--secondary-table-item-text-hover)",
            "lesson-event-bg": "var(--lesson-event-bg)",
            "homework-event-bg": "var(--homework-event-bg)",
            "completed-event-bg": "var(--completed-event-bg)",
            "completed-event-text": "var(--completed-event-text)",
            "holiday-table-item-bg": "rgb(var(--holiday-table-item-bg))",
            "holiday-table-item-text": "var(--holiday-table-item-text)",
            "holiday-table-item-text-secondary": "rgb(137, 217, 124)",

            // Edit avatar form
            "camera-button-bg": "var(--camera-button-bg)",

            // UI
            "button-outline-hover-bg": "var(--button-outline-hover-bg)",
            "button-gray-bg": "var(--button-gray-bg)",
            "button-disabled-bg": "var(--button-disabled-bg)",
            "button-disabled-text": "var(--button-disabled-text)",
        },
        extend: {
            transitionProperty: {
                "height": "height"
            },
            flex: {
                "auto-0": "0 0 auto"
            },
            spacing: {
                "header_height": "var(--header-height)",
            },
            boxShadow: {
                "top": "0px -1px 3px 0px rgba(0, 0, 0, 0.1)"
            }
        },
    },
    plugins: [
        typographyPlugin
    ],
};

export default config;
