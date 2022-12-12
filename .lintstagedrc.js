module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
//    "eslint --fix --max-warnings=0",
    'eslint --fix',
    // 'prettier --write',
  ],
  'src/**/*.{json,css,scss,md}': ['prettier --write'],
}
