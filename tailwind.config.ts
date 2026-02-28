import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "var(--color-primary-dark)",
                },
                accent: "var(--color-accent)",
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                error: "var(--color-error)",
                bg: "var(--color-bg)",
                surface: "var(--color-surface)",
                border: "var(--color-border)",
                text: {
                    primary: "var(--color-text-primary)",
                    muted: "var(--color-text-muted)",
                },
            },
            spacing: {
                "1": "var(--space-1)",
                "2": "var(--space-2)",
                "3": "var(--space-3)",
                "4": "var(--space-4)",
                "6": "var(--space-6)",
                "8": "var(--space-8)",
                "12": "var(--space-12)",
                "16": "var(--space-16)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                full: "var(--radius-full)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
