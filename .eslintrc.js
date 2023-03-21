module.exports = {
  // "engines": {
  //   "node": ">=12.13.0"
  //  },
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "impliedStrict": false
  },
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['jest']
};
