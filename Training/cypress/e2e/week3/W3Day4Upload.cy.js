/*

describe('File Upload Test on Test Automation Practice Blog', () => {

  it('should upload a file successfully', () => {
    // Step 1: Visit the page
    cy.visit('https://testautomationpractice.blogspot.com/');

    // Step 2: Locate the file input and upload a file
    cy.get('input[type="file"]') // Select the file input element
      .should('be.visible') // Ensure it's visible
      .attachFile('sample.txt'); // The file is located in 'cypress/fixtures'

    // Step 3: Verify that the file is uploaded by checking the label or success message
    cy.get('#singleFileInput') // This selector may vary depending on the feedback
      .should('have.value', 'C:\\fakepath\\sample.jpg'); // Check if the file name appears (this varies by browser)
  });

});
*/


 