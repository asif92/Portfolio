/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        void: {
          DEFAULT: '#050811',
          50: '#0B111E',
          100: '#0D1628',
          200: '#111B30',
          300: '#162035',
        },
        ceramic: {
          DEFAULT: '#F8FAFC',
          dim: '#E2E8F0',
          muted: '#94A3B8',
        },
        cyan: {
          core: '#00F0FF',
          bright: '#00E5FF',
          soft: '#0088FF',
          dim: '#0055AA',
          glow: 'rgba(0, 240, 255, 0.15)',
        },
        carbon: {
          DEFAULT: '#1E232F',
          light: '#2A3042',
          dark: '#141820',
        },
        amber: {
          signal: '#FFB800',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0,240,255,0.12) 0%, transparent 65%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 60%, rgba(0,136,255,0.08) 0%, rgba(5,8,17,0) 70%)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'blink': 'blink 4s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 90%, 100%': { opacity: '1' },
          '95%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cyan-sm': '0 0 8px rgba(0, 240, 255, 0.3)',
        'cyan-md': '0 0 20px rgba(0, 240, 255, 0.4)',
        'cyan-lg': '0 0 40px rgba(0, 240, 255, 0.3)',
        'cyan-xl': '0 0 80px rgba(0, 240, 255, 0.2)',
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)',
        'glass-lg': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 48px rgba(0,0,0,0.6)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
