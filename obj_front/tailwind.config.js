/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray: '#555555',
      white: '#ffffff',
      back: '#fef9f6',
      beige: '#D8C4B6',
      light: '#9596A2',
      mint: '#27E1C1',
      'mint-em': '#0EA293',
      pink: '#d058a8',
      warning: '#ca445a',
    },
    screens: {
      mob: '375px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      body: ['15px', 1.7],
    },
    extend: {},
    fontFamily: {
      gothic: 'PuradakGentleGothicR',
      pretendard: 'Pretendard-Regular',
    },
  },
  plugins: [],
};
