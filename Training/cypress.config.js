const { defineConfig } = require("cypress");
const rimraf = require("rimraf");
const mochawesome = require("mochawesome");
const mochawesomeMerge = require("mochawesome-merge");
const mochawesomeReportGenerator = require("mochawesome-report-generator");
const xlsx = require("xlsx"); // Import the xlsx library to read Excel files
 
const fs = require("fs");


 
const path = require('path');

module.exports = {
  projectId: 'prudws',//live
  downloadsFolder: 'cypress/downloads', 
  e2e: {
    supportFile: false,
    pageLoadTimeout: 120000,
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

 
 