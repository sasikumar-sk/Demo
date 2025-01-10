// cypress/plugins/index.js

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  // Register a custom task to delete a file
  on('task', {
    deleteFile(filePath) {
      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(null); // File deleted successfully
          }
        });
      });
    }
  });
};
