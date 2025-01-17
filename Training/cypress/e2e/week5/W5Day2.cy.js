// cypress/integration/register.spec.js
describe('Registration Validation Tests', () => {
 
        it('should read data from the Excel file', () => {
            const excelFilePath = 'E:/Git/Demo/Training/cypress/fixtures/Task Read Data.xlsx'; // Corrected path format
      
          cy.task('readExcelData', { filePath: excelFilePath })
            .then((data) => {
              console.log(data); // Log the read data for debugging purposes
              expect(data).to.be.an('array'); // Example assertion to check if the data is an array
              console.log('Full Path:', fullPath);  // Log the full resolved file path

            });
        });
  
      
    it('should show an error if the password does not meet the minimum criteria', () => {
        cy.visit('https://bookcart.azurewebsites.net/register');

        // Use data from Excel file (simulating an example here for the sake of simplicity)
        cy.task('readExcelData', { filePath: 'E:\Git\Demo\Training\cypress\fixtures\Task Read Data.xlsx' }).then((data) => {
            const userData = data[0]; // Get the first user data row

            // Fill in the form with data from the Excel file
            cy.get('#mat-input-0').type(userData['First Name']);
            cy.get('#mat-input-1').type(userData['Last Name']);
            cy.get('#mat-input-2').type(userData['User Name']);

            // Password that does not meet criteria (e.g., too short)
            cy.get('#mat-input-3').type('short');
            cy.get('#mat-input-4').type('short');

            // Submit the form
            cy.get('span.mat-mdc-button-persistent-ripple.mdc-button__ripple') // Select the ripple element
                .parent() // Move up to the parent button element
                .click();

            // Assert error message
            cy.contains('Password must be at least 8 characters long').should('be.visible');
            cy.contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number').should('be.visible');
        });
    }); 
});
