module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
   "eslint --fix --max-warnings=0",
    'eslint --fix',
  ],
  'src/**/*.{json,css,scss,md}': ['prettier --write'],
}
