import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'build/**',
      '.github/**',
      'analyze/**',
      'README.md',
      'yarn.lock',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
      'no-shadow': 'off',
      'no-console': 'off',
      'no-import-assign': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      '@next/next/no-img-element': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['*.config.js', '*.config.cjs', 'postcss.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

export default config
