//File upload

describe('Fileupload', () => {
  it('SITE -1 file upload - images png', () => {
    cy.visit('https://practice.expandtesting.com/upload');
    cy.title().should('contain', 'Upload');
    cy.on('uncaught:exception', (err) => {
      return false;
    });
    const upload = 'image.png';
    cy.get('[data-testid="file-input"]').selectFile('cypress/fixtures/' + upload); // Relative path to file   
    cy.get('[data-testid="file-submit"]').click();
    cy.get("div[class='container'] h1").should('have.text', 'File Uploaded!');
  });


  it('SITE -1 : file upload1 - images123', () => {
    cy.visit('https://practice.expandtesting.com/upload');
    cy.title().should('contain', 'Upload');
    cy.on('uncaught:exception', (err) => {
      return false;
    });
    const upload1 = 'images123.jpg';
    cy.get('[data-testid="file-input"]').selectFile('cypress/fixtures/' + upload1); // Relative path to file 
    cy.get('[data-testid="file-submit"]').click();
    cy.get("div[class='container'] h1").should('have.text', 'File Uploaded!');
  });


  it('SITE -1 : uploads a VALID file via API', () => {
    const filePath = 'sample-file.txt';  // file is in cypress/fixtures/ 
    cy.fixture(filePath).then(fileContent => {
      const formData = new FormData();
      formData.append('file', new Blob([fileContent], { type: 'text/plain' }), filePath);
      // Send a POST request with the file
      cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/upload',
        headers: {
          'Content-Type': 'image/png'
        },
        body: formData
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/html');

      });

    });
  });

  it('SITE -2 : file upload2', () => {
    cy.visit('https://blueimp.github.io/jQuery-File-Upload/');

    const upload = 'image.png';
    const upload1 = 'images123.jpg';

    cy.get("input[name='files[]']")
      .should('be.enabled')
      .selectFile('cypress/fixtures/' + upload, { force: true });

    cy.get('.size').should('have.text', '295.99 KB');
    cy.get('.name').should('have.text', 'image.png');
    cy.get(':nth-child(1) > :nth-child(4) > .btn-warning').click();
    cy.get("input[name='files[]']")
      .should('be.enabled')
      .selectFile('cypress/fixtures/' + upload1, { force: true });

    cy.get('.size').should('have.text', '7.91 KB');
    cy.get('.col-lg-7 > .btn-warning').click();
  });


  it('SITE -2 : multiple file upload', () => {
    cy.visit('https://blueimp.github.io/jQuery-File-Upload/');

    const uploadFiles = ['image.png', 'images123.jpg']; // Multiple files
    uploadFiles.map(file => {
      const path = 'cypress/fixtures/' + file;
      cy.log(path);  // This will log the path to the console for debugging
      return path;
    });
    // Upload multiple files by providing the correct path to files in the fixtures folder
    cy.get("input[name='files[]']")
      .selectFile(uploadFiles.map(file => 'cypress/fixtures/' + file), { force: true });

    // Check if files have been uploaded successfully by verifying the file names
    cy.get('body > div:nth-child(1) > form:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > p:nth-child(1)').should('have.text', 'image.png');
    cy.get('body > div:nth-child(1) > form:nth-child(4) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > p:nth-child(1)').should('have.text', 'images123.jpg');
  });

});