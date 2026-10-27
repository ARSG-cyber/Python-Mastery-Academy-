/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF9F6',
          100: '#F3F1EC',
          200: '#E8E5DF',
          300: '#D8D4CC',
          400: '#A8A49D',
          500: '#77736D',
          600: '#55514B',
          700: '#3D3A35',
          800: '#2C2A26',
          900: '#242424',
          950: '#181715',
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          muted: '#F3F1EC',
          border: '#E8E5DF',
          text: '#242424',
          secondary: '#77736D',
          accent: '#C96B45',
          accentHover: '#B55A35',
          accentSubtle: '#FAF0EB',
          success: '#287A52',
          successSubtle: '#EBF5F0',
          error: '#B94B45',
          errorSubtle: '#FBF0EF',
        },
        brand: {
          50: '#FAF0EB',
          100: '#F5DFD5',
          200: '#EBC0AF',
          300: '#DF9F84',
          400: '#D47E5B',
          500: '#C96B45',
          600: '#B55A35',
          700: '#944425',
          800: '#75351D',
          900: '#5A2B18',
          950: '#33170B',
        },
        python: {
          blue: '#306998',
          yellow: '#FFD43B',
          darkBlue: '#1e415e',
          lightYellow: '#FFE873',
          gray: '#646464',
        },
        navy: {
          800: '#1f1e1c',
          850: '#1c1b19',
          900: '#181715',
          950: '#121110',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
