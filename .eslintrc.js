module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['typescript-sort-keys', 'eslint-plugin-import-helpers', 'prettier'],
  rules: {
    // general
    'prettier/prettier': 'error',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-import-assign': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    // next.js
    '@next/next/no-img-element': 'off',

    // typescript
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: false,
        requiredFirst: false,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
}
