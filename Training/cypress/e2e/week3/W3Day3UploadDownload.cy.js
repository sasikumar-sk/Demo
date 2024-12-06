
const path = require('path');
const fs = require('fs');

describe('Download and Validate File', () => {
  it('Clicks download link and validates the file content', () => {
    // Visit the page
    cy.visit('https://practice.expandtesting.com/download');     
    cy.get('[data-testid="some-file.txt"]')
    //cy.contains('some-file.txt').click(); 
    const downloadsFolder = Cypress.config('downloadsFolder');  
    const filePath = path.join(downloadsFolder, 'some-file.txt');

    cy.readFile(filePath, { timeout: 10000 }).should('exist');
    cy.readFile(filePath).then((text) => {
      expect(text).to.include('Expected content of the file');
    });
  });
});
