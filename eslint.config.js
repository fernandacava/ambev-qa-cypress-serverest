const js = require('@eslint/js');
const globals = require('globals');
const cypress = require('eslint-plugin-cypress');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'cypress/reports/**',
      'cypress/screenshots/**',
      'cypress/videos/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...cypress.configs.globals.languageOptions.globals
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
];
