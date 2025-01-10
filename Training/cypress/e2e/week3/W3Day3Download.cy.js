// Test the download funstion

 
describe('Download and Delete Excel File Test', () => {
    it('1. Download the Excel file and delete it', () => {
      // Define the path to the downloaded file
      const filePath = 'cypress/downloads/sample.xlsx'; 
         cy.visit('https://letcode.in/file'); 
      // Trigger the download by clicking the link
      cy.get('a#xls').click();
      // Wait for the file to be downloaded (adjust time as needed)
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
  


describe('Test : Download the XML file and read then extract 2 values', () => {
    it('1. should extract the number, enter it, and verify the popup', () => { 
        cy.visit('https://obstaclecourse.tricentis.com/Obstacles/72946/retry');
        cy.get('#downloadSolution').click();
        cy.wait(2000);  

        // Read the XML file (it's saved in cypress/downloads/sample.xml)
        cy.readFile('cypress/downloads/Catalog.xml').then((xmlContent) => {
            // Parse the XML content
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

            // Find the <number id="Sue"> element and extract the prefix and number
            const sueNumberNode = xmlDoc.querySelector('number[id="Sue"]');  // Find <number id="Sue">

            if (sueNumberNode) {
                const prefix = sueNumberNode.querySelector('prefix').textContent;  // Get prefix value
                const number = sueNumberNode.querySelector('number').textContent;  // Get number value

                // Combine the prefix and number to form the complete number
                const completeNumber = `${prefix}${number}`;

                // Enter the complete number into the 'NumberSue' field
                cy.get('#NumberSue').type(completeNumber);
                cy.wait(2000);


                // Verify the popup content 
                // Check if <h2> with text "Good job!" is inside the visible sweet-alert pop-up
                cy.get('.sweet-alert.showSweetAlert.visible').within(() => {
                    cy.get('h2').should('have.text', 'Good job!');
                });


                // Verify the additional text in the popup
                cy.get('p[style="display: block;"]')
                    .should('have.text', 'You solved this automation problem.');
            }
        });
    });
});
