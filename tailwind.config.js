export default {
  content: [],
  theme: {
    extend: {
      colors: {
        slack: {
          aubergine: '#4A154B',
          'aubergine-dark': '#3F0E40',
          'aubergine-light': '#611f69',
          blue: '#1264A3',
          'blue-light': '#36C5F0',
          green: '#2BAC76',
          yellow: '#ECB22E',
          red: '#E01E5A',
          bg: '#FFFFFF',
          'bg-hover': '#F8F8F8',
          'bg-active': '#1264A3',
          sidebar: '#3F0E40',
          'sidebar-hover': '#350D36',
          'sidebar-active': '#1164A3',
          text: '#1D1C1D',
          'text-secondary': '#616061',
          border: '#DDDDDD',
        },
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.6875rem',
      },
      borderRadius: {
        slack: '0.375rem',
      },
      boxShadow: {
        slack: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'slack-lg': '0 4px 12px rgba(0,0,0,0.15)',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
