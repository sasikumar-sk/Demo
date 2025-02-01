//1.Custom command to interact with elements inside an iframe
//2.Interact elements inside an iframe using Using Direct Iframe Calls
 
describe('Iframe Sorting Test using the Custom command', () => {
  beforeEach(() => {
    cy.visit('https://kitchen.applitools.com/ingredients/iframe'); // Visit the page
  });

  it('sort the table by name', () => {
    cy.getIframeID('#the-kitchen-table').find('#column-button-name').click(); 
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain', 'Apple');
    cy.getIframeID('#the-kitchen-table').find('#column-button-name').click();  
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain', 'Pepper');
  });

  it('sort the table by type', () => {
    cy.getIframeID('#the-kitchen-table').find('#column-button-type').click();
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain','Fruit');
    cy.getIframeID('#the-kitchen-table').find('#column-button-type').click();
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain', 'Vegetable');
  });

  it('sort the table by flavor', () => {
    cy.getIframeID('#the-kitchen-table').find('#column-button-flavor').click();
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain', 'Bitter');
    cy.getIframeID('#the-kitchen-table').find('#column-button-flavor').click();
    cy.getIframeID('#the-kitchen-table').find('table#fruits-vegetables tbody tr').first().should('contain', 'Sweet');

  });
});


 
describe('Iframe Sorting Test using direct Function', () => {
  beforeEach(() => {
    cy.visit('https://kitchen.applitools.com/ingredients/iframe');
  });

  // Function to interact with iframe content
  function getIframeBody() {
    return cy.get('#the-kitchen-table')
      .its('0.contentDocument')
      .its('body')
      .then(cy.wrap);
  }

  it('Sort the table by Name column', () => {
    getIframeBody()
      .find('#fruits-vegetables')
      .should('be.visible') 
      .find('#column-button-name')
      .click() 
      cy.wait(500)   
      getIframeBody()
        .find('tbody tr')
        .should('have.length', 6)  // Ensure there are 6 rows
        .should(($rows) => {
          const rowTexts = $rows.map((i, el) => {
            return Cypress.$(el).find('td').first().text(); // Get the 'Name' value (first column)
          }).get();

          const expectedOrder = ['Apple', 'Banana', 'Carrots', 'Lemon', 'Onion', 'Pepper'];
          expect(rowTexts).to.deep.eq(expectedOrder);  // Validate the rows are sorted by Name
        });
  });

  it('Sort the table by Type column', () => {
    getIframeBody()
      .find('#fruits-vegetables')
      .should('be.visible') 
      .find('#column-button-type')
      .click()
 
      cy.wait(500)
      getIframeBody()
        .find('tbody tr')
        .should('have.length', 6)
        .should(($rows) => {
          const rowTexts = $rows.map((i, el) => {
            return Cypress.$(el).find('td').eq(1).text(); 
          }).get();

          const expectedOrder = ['Fruit', 'Fruit', 'Fruit', 'Vegetable', 'Vegetable', 'Vegetable'];
          expect(rowTexts).to.deep.eq(expectedOrder);  
        });
  });

  it('Sort the table by Flavor column', () => {
    getIframeBody()
      .find('#fruits-vegetables')
      .should('be.visible') 
      .find('#column-button-flavor')
      .click() 
      cy.wait(500)
      getIframeBody()
        .find('tbody tr')
        .should('have.length', 6)
        .should(($rows) => {
          const rowTexts = $rows.map((i, el) => {
            return Cypress.$(el).find('td').eq(2).text();  
          }).get();

          const expectedOrder = ['Bitter', 'Bitter', 'Sweet', 'Sweet', 'Sweet', 'Sweet'];
          expect(rowTexts).to.deep.eq(expectedOrder);  // sorted by Flavor
        });
  });
});
