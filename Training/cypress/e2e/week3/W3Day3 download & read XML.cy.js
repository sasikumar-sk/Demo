
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
                // Check if <h2> with text "Good job!" is inside the visible sweet-alert pop-up
                cy.get('.sweet-alert.showSweetAlert.visible').within(() => {
                    cy.get('h2').should('have.text', 'Good job!');
                }); 
                cy.get('p[style="display: block;"]')
                    .should('have.text', 'You solved this automation problem.');
                    cy.task('deleteFile', 'cypress/downloads/Catalog.xml');//Delete the file

            }
        });
    });
});