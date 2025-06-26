import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import babelParser from '@babel/eslint-parser'
import { defineFlatConfig } from 'eslint-define-config'

export default defineFlatConfig([
  {
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false,
      },
    },
    plugins: {
      vue,
      prettier: pluginPrettier,
    },
    rules: {
      ...vue.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-empty': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },
  prettier,
])
