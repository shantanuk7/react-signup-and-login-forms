import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,          // ~50 core JS rules (no-unused-vars, no-undef, etc.)
      tseslint.configs.recommended,    // TypeScript rules (@typescript-eslint/*)
      reactHooks.configs.flat.recommended, // rules-of-hooks + exhaustive-deps
      reactRefresh.configs.vite,       // Ensures only components are exported for HMR
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',

      // Best Practices
      'eqeqeq': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      'no-throw-literal': 'error',

      // Imports
      'no-duplicate-imports': 'error',
    },
  },
])
