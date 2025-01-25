const { defineConfig } = require("cypress");
const rimraf = require("rimraf");
const mochawesome = require("mochawesome");
const mochawesomeMerge = require("mochawesome-merge");
const mochawesomeReportGenerator = require("mochawesome-report-generator");
const xlsx = require("xlsx"); // Import the xlsx library to read Excel files
 
const fs = require("fs");


module.exports = defineConfig({
  projectId: '17rni8',
  experimentalStudio: true,
  e2e: {
    pageLoadTimeout: 180000,  // Increase page load timeout to 180 seconds

    experimentalSessionAndOrigin: true,
    env: {
      "authToken": "NA3A8Y6UjAvrBDY341pFfSM1"
    },
    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',

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

      on('task', {
        readExcelData({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const fullPath = path.resolve(filePath);  // Ensure correct file path resolution
              const workbook = xlsx.readFile(fullPath);
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const data = xlsx.utils.sheet_to_json(worksheet);
              resolve(data);  // Return the data
            } catch (error) {
              reject(error);  // Reject in case of error
            }
          });
        }
      });

      const outputPath = path.resolve(__dirname, 'output');  
      console.log('Output Path:', outputPath);

      // Example cleanup task (replace rimraf usage)
      const fs = require('fs');
      if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true, force: true }); // Deletes the directory if it exists
      } 
      return config;
      
    },
  },
};

 
 