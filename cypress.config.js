module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: 'https://webdriveruniversity.com'
    },
  },
};
 
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
    downloadsFolder: 'cypress/downloads',

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

     
  },
});

const path = require('path');

module.exports = {
  projectId: 'prudws',
  downloadsFolder: 'cypress/downloads', 
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      const outputPath = path.resolve(__dirname, 'output'); // Constructs a valid path
      console.log('Output Path:', outputPath);

      // Example cleanup task (replace rimraf usage)
      const fs = require('fs');
      if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true, force: true }); // Deletes the directory if it exists
      }

      // Return config if modified
      return config;
    },
  },
};

module.exports = {
  // ... other configurations
  fixturesFolder: 'cypress/fixtures', // If your fixtures are in a different location
  // ... other configurations
}; 


 
