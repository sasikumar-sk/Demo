  
import 'cypress-file-upload';
import './commands';

 
 
const fs = require('fs');
const xml2js = require('xml2js');

module.exports = (on, config) => {
  on('task', {
    parseXmlFile(filePath) {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            const parser = new xml2js.Parser();
            parser.parseString(data, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }
        });
      });
    },
  });
};
