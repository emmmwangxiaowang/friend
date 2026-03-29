/** Tailwind configuration for SoulMate client */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        soul: {
          primary: '#7c3aed', // purple-500-ish
          surface: '#0b1020',
          text: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
}
