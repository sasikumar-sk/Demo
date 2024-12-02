const { defineConfig } = require("cypress");
const rimraf = require("rimraf");
const mochawesome = require("mochawesome");
const mochawesomeMerge = require("mochawesome-merge");
const mochawesomeReportGenerator = require("mochawesome-report-generator");

module.exports = defineConfig({
  projectId: '17rni8',
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,

    // Update specPattern to match .cy.js files in both 'e2e' and 'integration' folders
    specPattern: [
      'cypress/e2e/**/*.cy.js',    
      'cypress/integration/**/*.cy.js'   
    ],

    // Set the mochawesome reporter
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory where reports will be saved
      overwrite: false,             // Don't overwrite reports
      html: true,                   // Generate HTML report
      json: true,                   // Generate JSON report
    },

    setupNodeEvents(on, config) {
      // Clean up old reports before running tests (optional)
      rimraf.sync('cypress/reports/*');

      // Hook into the after:run event to generate the HTML report after the test run
      on('after:run', (results) => {
        // Merge individual test run JSON reports
        mochawesomeMerge([`${results.reporterOptions.reportDir}/*.json`])
          .then((mergedJson) => {
            // Generate HTML report from merged JSON
            mochawesomeReportGenerator.create(mergedJson, {
              reportDir: results.reporterOptions.reportDir,
              overwrite: false, // Prevent overwriting previous reports
            });
          });
      });
    },
  },
});
