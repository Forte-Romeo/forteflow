import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['**/dist/**', '**/coverage/**']),

  {
    files: ['apps/web/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },

  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['apps/web/vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  eslintConfigPrettier,
]);
