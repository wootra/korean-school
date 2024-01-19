import tailwindcssAnimate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
];
export const prefix = '';
export const theme = {
    container: {
        center: true,
        padding: '2rem',
        screens: {
            '2xl': '1400px',
        },
    },
    extend: {
        colors: {
            border: 'var(--border)',
            input: 'var(--input)',
            ring: 'var(--ring)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            'ks-red': 'var(--red-background)',
            'ks-blue': 'var(--blue-background)',
            'ks-red-link': 'var(--red-link-background)',
            primary: {
                DEFAULT: 'var(--primary)',
                foreground: 'var(--primary-foreground)',
            },
            secondary: {
                DEFAULT: 'var(--secondary)',
                foreground: 'var(--secondary-foreground)',
            },
            destructive: {
                DEFAULT: 'var(--destructive)',
                foreground: 'var(--destructive-foreground)',
            },
            muted: {
                DEFAULT: 'var(--muted)',
                foreground: 'var(--muted-foreground)',
            },
            accent: {
                DEFAULT: 'var(--accent)',
                foreground: 'var(--accent-foreground)',
            },
            popover: {
                DEFAULT: 'var(--popover))',
                foreground: 'var(--popover-foreground))',
            },
            card: {
                DEFAULT: 'var(--card))',
                foreground: 'var(--card-foreground))',
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
        },
        animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
        },
    },
};
export const plugins = [tailwindcssAnimate];
