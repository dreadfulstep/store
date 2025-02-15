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
        /** Base colors */
        dark: {
          a0: 'hsl(var(--dark-a0))',
        },
        light: {
          a0: 'hsl(var(--light-a0))',
        },

        /** Primary colors */
        primary: {
          a0: 'rgba(var(--primary-a0))',
          a10: 'rgba(var(--primary-a10))',
          a20: 'rgba(var(--primary-a20))',
          a30: 'rgba(var(--primary-a30))',
          a40: 'rgba(var(--primary-a40))',
          a50: 'rgba(var(--primary-a50))',
        },

        /** Surface colors */
        surface: {
          a0: 'rgba(var(--surface-a0))',
          a10: 'rgba(var(--surface-a10))',
          a20: 'rgbahsl(var(--surface-a20))',
          a30: 'rgba(var(--surface-a30))',
          a40: 'rgba(var(--surface-a40))',
          a50: 'rgbahsl(var(--surface-a50))',
        },

        /** Tonal surface colors */
        surfaceTonal: {
          a0: 'rgba(var(--surface-tonal-a0))',
          a10: 'rgba(var(--surface-tonal-a10))',
          a20: 'rgba(var(--surface-tonal-a20))',
          a30: 'rgba(var(--surface-tonal-a30))',
          a40: 'rgba(var(--surface-tonal-a40))',
          a50: 'rgba(var(--surface-tonal-a50))',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
