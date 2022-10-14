module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-typescript/base',
    'eslint-config-prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 'consistent-return': 'warn',
    'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    // 'no-nested-ternary': 'off',
    // 'no-underscore-dangle': 'off',

    '@typescript-eslint/naming-convention': 'off',
  },
};
