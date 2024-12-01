const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '17rni8',
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,

    // Update specPattern to match .cy.js files in both 'e2e' and 'integration' folders
    specPattern: [
      'cypress/e2e/**/*.cy.js',    // Match all .cy.js files in the 'e2e' folder
      'cypress/integration/**/*.cy.js'  // Match all .cy.js files in the 'integration' folder
    ],

    setupNodeEvents(on, config) {
      // Setup any custom event listeners if needed
    },
  },
});
