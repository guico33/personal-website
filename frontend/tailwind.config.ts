import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
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
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Natural Color Palette
        'sage-natural': {
          50: 'hsl(var(--sage-natural-50))',
          100: 'hsl(var(--sage-natural-100))',
          200: 'hsl(var(--sage-natural-200))',
          300: 'hsl(var(--sage-natural-300))',
          400: 'hsl(var(--sage-natural-400))',
          500: 'hsl(var(--sage-natural-500))',
          600: 'hsl(var(--sage-natural-600))',
        },
        sand: {
          50: 'hsl(var(--sand-50))',
          100: 'hsl(var(--sand-100))',
          200: 'hsl(var(--sand-200))',
          300: 'hsl(var(--sand-300))',
          400: 'hsl(var(--sand-400))',
          500: 'hsl(var(--sand-500))',
          600: 'hsl(var(--sand-600))',
        },
        clay: {
          50: 'hsl(var(--clay-50))',
          100: 'hsl(var(--clay-100))',
          200: 'hsl(var(--clay-200))',
          300: 'hsl(var(--clay-300))',
          400: 'hsl(var(--clay-400))',
          500: 'hsl(var(--clay-500))',
        },
        moss: {
          50: 'hsl(var(--moss-50))',
          100: 'hsl(var(--moss-100))',
          200: 'hsl(var(--moss-200))',
          300: 'hsl(var(--moss-300))',
          400: 'hsl(var(--moss-400))',
          500: 'hsl(var(--moss-500))',
        },
        cream: {
          50: 'hsl(var(--cream-natural-50))',
          100: 'hsl(var(--cream-natural-100))',
          200: 'hsl(var(--cream-natural-200))',
          300: 'hsl(var(--cream-natural-300))',
          400: 'hsl(var(--cream-natural-400))',
          500: 'hsl(var(--cream-natural-500))',
        },
        // Legacy mappings (now using natural colors)
        stone: {
          50: 'hsl(var(--stone-50))',
          100: 'hsl(var(--stone-100))',
          200: 'hsl(var(--stone-200))',
          300: 'hsl(var(--stone-300))',
          400: 'hsl(var(--stone-400))',
          500: 'hsl(var(--stone-500))',
          600: 'hsl(var(--stone-600))',
        },
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--radius)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--radius)) rotate(-360deg)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        float: 'float 3s ease-in-out infinite',
        orbit: 'orbit 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config