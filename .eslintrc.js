module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};
