module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
  ],
  'src/**/*.{json,css,scss,md}': ['prettier --write'],
}
