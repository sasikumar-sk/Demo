describe('File Download Test', () => {
  it('should download the sample.txt file', () => { 
    cy.visit('https://letcode.in/file'); 
    cy.get('.file-label > :nth-child(5)').click(); 
    const downloadPath = 'E:/Git/Demo/Training/cypress/downloads/sample.txt';
    cy.readFile(downloadPath).should('exist');
  });
});
