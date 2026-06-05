export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        beat: {
          dark: '#141416',
          muted: '#92929D',
          accent: '#E97F18',
          dot: '#F24E1E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
        display: ['"Rock Salt"', 'cursive'],
      },
    },
  },
  plugins: [],
}
