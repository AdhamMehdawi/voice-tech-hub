import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				jarvis: {
					blue: '#3B82F6',
					teal: '#0EA5E9',
					dark: '#0F172A',
					light: '#E2E8F0'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.8)', opacity: '0.8' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-slow': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '0.5' },
					'100%': { opacity: '0.3' }
				},
				'pulse-slower': {
					'0%': { opacity: '0.2' },
					'50%': { opacity: '0.4' },
					'100%': { opacity: '0.2' }
				},
				'float': {
					'0%': { transform: 'translateY(0) translateX(0)' },
					'25%': { transform: 'translateY(-10px) translateX(5px)' },
					'50%': { transform: 'translateY(0) translateX(10px)' },
					'75%': { transform: 'translateY(10px) translateX(5px)' },
					'100%': { transform: 'translateY(0) translateX(0)' }
				},
				'blink': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '0.7' },
					'100%': { opacity: '0.3' }
				},
				'blink-slow': {
					'0%': { opacity: '0.2' },
					'50%': { opacity: '0.5' },
					'100%': { opacity: '0.2' }
				},
				'loading-bar': {
					'0%': { width: '0%' },
					'50%': { width: '70%' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'pulse-slower': 'pulse-slower 5s ease-in-out infinite',
				'float': 'float 20s ease-in-out infinite',
				'blink': 'blink 2s ease-in-out infinite',
				'blink-slow': 'blink-slow 3.5s ease-in-out infinite',
				'loading-bar': 'loading-bar 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'jarvis-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
				'grid': 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)'
			},
			backgroundSize: {
				'grid': '30px 30px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
