import pluginNext from '@next/eslint-plugin-next';
import parser from '@typescript-eslint/parser'; // optional

export default [
  {
    name: 'ESLint Config - nextjs',
    languageOptions: {
      parser, // optional
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@next/next': pluginNext,
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  // solution found in git hub https: //github.com/vercel/next.js/issues/71763#issuecomment-2476838298
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  // ...react.configs.recommended, // Apply recommended React rules
];
