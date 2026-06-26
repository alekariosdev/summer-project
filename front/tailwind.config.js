/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontSize: {
        h1: ['3rem', { lineHeight: '1.2' }], // 48px → use txt-h1 utility
        h2: ['2.5rem', { lineHeight: '1.2' }], // 40px → use txt-h2 utility
        h3: ['2rem', { lineHeight: '1.25' }], // 32px → use txt-h3 utility
        h4: ['1.5rem', { lineHeight: '1.25' }], // 24px → use txt-h4 utility
        h5: ['1.125rem', { lineHeight: '1.5' }], // 18px → use txt-h5 utility
        large: ['1rem', { lineHeight: '1.5' }], // 16px
        medium: ['0.875rem', { lineHeight: '1.25' }], // 14px
        small: ['0.75rem', { lineHeight: '1' }], // 12px
      },
    },
  },
};

export default config;
