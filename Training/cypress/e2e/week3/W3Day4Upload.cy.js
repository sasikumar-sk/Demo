describe('File Upload Test', () => {
  beforeEach(() => { 
    cy.visit('https://the-internet.herokuapp.com/upload');
  });

  it('Should upload a file successfully', () => { 
    const filePath = 'test.txt'; 
    cy.get('#file-upload').attachFile(filePath); 
    cy.get('#file-submit').click(); 
    cy.contains('File Uploaded!').should('be.visible');
    cy.get('#uploaded-files').should('contain.text', 'test.txt');
  });
});
