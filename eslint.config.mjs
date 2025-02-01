import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...react.configs.recommended, // Apply recommended React rules
];
