// Test the download funtion
 
describe('Download and Delete Excel File Test', () => {
    it('1. Download the Excel file and delete it', () => {
      // Define the path to the downloaded file
      const filePath = 'cypress/downloads/sample.xlsx'; 
         cy.visit('https://letcode.in/file'); 
      // Trigger the download by clicking the link
      cy.get('a#xls').click();
      // Wait for the file to be downloaded 
      cy.wait(2000);
      // Assert that the file exists in the downloads folder
      cy.readFile(filePath).should('exist');
      // Delete the file after confirming its existence
      cy.task('deleteFile', filePath).then(() => {
        cy.log('File has been deleted');
      });
      // Optionally, verify the file is deleted (it should no longer exist)
      cy.readFile(filePath, { failOnNonExistence: false }).should('not.exist');
    });

    it('2. Download the pdf file and delete it', () => { 
        const filePath = 'cypress/downloads/sample.pdf'; 
           cy.visit('https://letcode.in/file');  
        cy.get('a#pdf').click(); 
        cy.wait(2000); 
        cy.readFile(filePath).should('exist'); 
        cy.task('deleteFile', filePath).then(() => {
          cy.log('File has been deleted');
        }); 
        cy.readFile(filePath, { failOnNonExistence: false }).should('not.exist');
      });


      it('3. Download the txt file and delete it', () => { 
        const filePath = 'cypress/downloads/sample.txt'; 
           cy.visit('https://letcode.in/file');  
        cy.get('a#txt').click(); 
        cy.wait(2000); 
        cy.readFile(filePath).should('exist'); 
        cy.task('deleteFile', filePath).then(() => {
          cy.log('File has been deleted');
        }); 
        cy.readFile(filePath, { failOnNonExistence: false }).should('not.exist');
      });
  });
  


