import type { Config } from "tailwindcss";

export const shadcnPreset = {
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "hsl(var(--border))",
        border: "hsl(var(--border))",
      },
      backgroundColor: {
        background: "hsl(var(--background))",
        card: "hsl(var(--card))",
        popover: "hsl(var(--popover))",
        sidebar: "hsl(var(--sidebar))",
      },
      textColor: {
        foreground: "hsl(var(--foreground))",
      },
      ringColor: { 
        ring: "hsl(var(--ring))",
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
      },
      borderRadius: {
        md: "var(--radius)",
        lg: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 8px)",
      },
    },
  },
  content: []
} satisfies Config;
export default shadcnPreset;