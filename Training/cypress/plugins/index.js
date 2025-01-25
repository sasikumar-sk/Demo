// cypress/plugins/index.js

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    readDownloadedFile(fileName) {
      const filePath = path.join(config.downloadsFolder, fileName);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8'); // Return the file content as a string
      }
      
      // If the file doesn't exist, return an error message
      throw new Error(`File ${fileName} not found in downloads folder.`);
    },
  });
};
