import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'primary': '#00F5FF',
        'secondary': '#A855F7',
        'tertiary': '#ADFF2F',
        'neutral': '#0F172A',
        'neutral-light': '#1E293B',
        'neutral-lighter': '#334155',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
      },
    },
  },
  plugins: [],
};

export default config;
