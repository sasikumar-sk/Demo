const { defineConfig } = require("cypress");
const rimraf = require("rimraf");
const mochawesome = require("mochawesome");
const mochawesomeMerge = require("mochawesome-merge");
const mochawesomeReportGenerator = require("mochawesome-report-generator");

module.exports = defineConfig({
  projectId: '17rni8',
  experimentalStudio: true,
  e2e: {
    experimentalSessionAndOrigin: true,
    
    downloadsFolder: 'cypress/downloads',

    // Update specPattern to match .cy.js files in both 'e2e' and 'integration' folders
    specPattern: [
      'cypress/e2e/**/*.cy.js',    
      'cypress/integration/**/*.cy.js' 
      
    ],

    // Set the mochawesome reporter
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
      
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

      on('task', {          //task for deleteing file from downloads folder
        deleteFile(filePath) {
          return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
              if (err) {
                reject(err); // Reject if an error occurs
              } else {
                resolve(null); // Resolve if the file is deleted successfully
              }
            });
          });
        }
      });
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

 
 