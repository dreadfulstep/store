import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					a0: 'hsl(var(--dark-a0))'
				},
				light: {
					a0: 'hsl(var(--light-a0))'
				},
				primary: {
					a0: 'rgba(var(--primary-a0))',
					a10: 'rgba(var(--primary-a10))',
					a20: 'rgba(var(--primary-a20))',
					a30: 'rgba(var(--primary-a30))',
					a40: 'rgba(var(--primary-a40))',
					a50: 'rgba(var(--primary-a50))',
					a60: 'rgba(var(--primary-a60))',
					a70: 'rgba(var(--primary-a70))',
					a80: 'rgba(var(--primary-a80))',
					a90: 'rgba(var(--primary-a90))',
					a100: 'rgba(var(--primary-a100))',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				surface: {
					a0: 'rgba(var(--surface-a0))',
					a10: 'rgba(var(--surface-a10))',
					a20: 'rgbahsl(var(--surface-a20))',
					a30: 'rgba(var(--surface-a30))',
					a40: 'rgba(var(--surface-a40))',
					a50: 'rgbahsl(var(--surface-a50))'
				},
				surfaceTonal: {
					a0: 'rgba(var(--surface-tonal-a0))',
					a10: 'rgba(var(--surface-tonal-a10))',
					a20: 'rgba(var(--surface-tonal-a20))',
					a30: 'rgba(var(--surface-tonal-a30))',
					a40: 'rgba(var(--surface-tonal-a40))',
					a50: 'rgba(var(--surface-tonal-a50))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
	plugins: [tailwindcssAnimate],
}} satisfies Config;
