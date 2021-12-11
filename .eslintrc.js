module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jasmine: true,
    'jest/globals': true,
  },
  plugins: [
    'jest',
  ],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
  },
};
