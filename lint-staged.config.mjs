import path from 'path';
const buildEslintCommand = (filenames) => {
  return `pnpm eslint --fix ${filenames
    .filter((f) => f.includes('/src/'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
};

const config = {
  'src/**/*.{js,jsx,ts,tsx}': ["pnpm eslint --fix", 'prettier --write'],
  '*.{json,css,md,yml}': 'prettier --write',
};

export default config;
