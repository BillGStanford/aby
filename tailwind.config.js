/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyot: {
          black:     '#0A0A0A',
          paper:     '#F5F0E8',
          'paper-dark': '#EDE8DF',
          red:       '#B91C1C',
          'red-dark':'#991B1B',
          'red-light':'#DC2626',
          gold:      '#C9A84C',
          'gold-light':'#D4B96A',
          slate:     '#374151',
          'slate-light': '#6B7280',
          rule:      '#D1C9BC',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Serif 4"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'Menlo', 'monospace'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['3.5rem',  { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'headline-lg': ['2.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'headline-md': ['1.75rem', { lineHeight: '1.18', letterSpacing: '-0.01em' }],
        'headline-sm': ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        'body-lg':     ['1.125rem',{ lineHeight: '1.75' }],
        'body-md':     ['1rem',    { lineHeight: '1.7'  }],
        'body-sm':     ['0.9rem',  { lineHeight: '1.65' }],
        'caption':     ['0.775rem',{ lineHeight: '1.5', letterSpacing: '0.06em' }],
        'label':       ['0.7rem',  { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      maxWidth: {
        'editorial': '1280px',
        'article':   '720px',
        'sidebar':   '320px',
      },
      spacing: {
        'rule': '1px',
      },
      borderWidth: {
        'rule': '1px',
      },
    },
  },
  plugins: [],
}
