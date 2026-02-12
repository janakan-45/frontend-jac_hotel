/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#EDEDED',
        card: '#121212',
        'card-foreground': '#EDEDED',
        primary: '#E35D25',
        'primary-foreground': '#FFFFFF',
        secondary: '#D4AF37',
        accent: '#FF7F50',
        muted: '#525252',
        border: '#262626',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.8) 50%, #050505 100%)',
        'spice-glow': 'radial-gradient(circle at center, rgba(227, 93, 37, 0.15) 0%, rgba(5,5,5,0) 70%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}