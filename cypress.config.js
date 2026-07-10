const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    env: {
      apiUrl: 'https://serverest.dev'
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      return config;
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/.jsons',
    overwrite: false,
    html: false,
    json: true,
    quiet: true
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  viewportWidth: 1440,
  viewportHeight: 900
});
