const config = {
  'src/**/*.{js,jsx,ts,tsx}': ['pnpm eslint --fix', 'prettier --write'],
  '*.{json,css,md,yml}': 'prettier --write',
};

export default config;
