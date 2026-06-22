/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontSize: {
        h1: ['3rem', { lineHeight: '1.2' }], // 48px
        h2: ['2.5rem', { lineHeight: '1.2' }], // 40px
        h3: ['2rem', { lineHeight: '1.25' }], // 32px
        h5: ['1.125rem', { lineHeight: '1.5' }], // 18px
        large: ['1rem', { lineHeight: '1.5' }], // 16px
        medium: ['0.875rem', { lineHeight: '1.25' }], // 14px
        small: ['0.75rem', { lineHeight: '1' }], // 12px
      },
    },
  },
};

export default config;
