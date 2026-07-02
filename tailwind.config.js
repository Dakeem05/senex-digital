/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4F9FF', // blue-tinted white
        'paper-dim': '#E6F0FD',
        ink: '#091224', // dark text
        navy: '#121E3C', // from user
        'navy-light': '#1C2F5D',
        'navy-line': 'rgba(255,255,255,0.12)',
        gold: '#3275F2', // main accent (from user)
        'gold-light': '#059BF7', // bright accent / logo (from user)
        'gold-dim': '#1E55C0', // darker accent
        teal: '#059BF7', // secondary accent
        line: '#B8CBE0', // gray-blue outline
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      maxWidth: {
        site: '1240px',
      },
    },
  },
  plugins: [],
}
