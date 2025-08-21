// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/specs/**/*.cy.js",
    video: false,
    setupNodeEvents(on, config) {
      // empty
      return config;
    },
  },
});
