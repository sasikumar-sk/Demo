 
import './commands';
// cypress/support/commands.js or cypress/support/index.js
import 'cypress-file-upload';
 
 

// cypress/plugins/index.js
const path = require('path');
const xlsx = require('xlsx');  // Make sure to install xlsx using `npm install xlsx`

module.exports = (on, config) => {
  on('task', {
    readExcelData({ filePath }) {
      const fullPath = path.resolve(filePath);  // Resolve the full path
      console.log('Full path to file:', fullPath);  // Log the full path to debug

      try {
        const workbook = xlsx.readFile(fullPath);
        const sheetName = workbook.SheetNames[0]; // You can specify the sheet name if needed
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        return data;
      } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
      }
    }
  });
};

