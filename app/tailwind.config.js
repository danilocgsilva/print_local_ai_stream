/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg:       '#f0ebe5',
          surface:  '#e6e0d8',
          border:   '#e8e2da',
          muted:    '#ddd6cd',
          subtle:   '#bfb3a4',
          strong:   '#a89e92',
        },
        dark: {
          bg:       '#4a1f24',
          surface:  '#5e2a2e',
          border:   '#7a2e2e',
          muted:    '#8c3a3a',
          subtle:   '#aaaaaa',
        },
      },
    },
  },
  plugins: [],
}
