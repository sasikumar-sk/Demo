describe('Automation Testing Registration Page', () => {
    before(() => {
      // Handle uncaught exceptions
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
  
      // Visit the page
      cy.visit('https://demo.automationtesting.in/Register.html');
      cy.wait(2000); 
      cy.viewport(1000, 750);
    });
  
    it('Fills out the registration form', () => {
      // Input fields
      cy.get('input[placeholder="First Name"]').type('John');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.get('textarea[ng-model="Adress"]').type('123 Elm Street, Springfield');
      cy.get('input[type="email"]').type('john.doe@example.com');
      cy.get('input[type="tel"]').type('9876543210');
  
      // Gender and Hobbies
      cy.get('input[value="Male"]').check();
      cy.get('#checkbox1').check();
      cy.get('#checkbox2').check();
  
      // Dropdown selections
      cy.get('#msdd').click();
      cy.get('.ui-corner-all').contains('English').click();
      cy.get('#Skills').select('JavaScript');
      cy.get('#countries').select('India');
      cy.get('.select2-selection').click();
      cy.get('.select2-results__option').contains('India').click();
  
      // Date of birth
      cy.get('#yearbox').select('1990');
      cy.get('select[ng-model="monthbox"]').select('April');
      cy.get('#daybox').select('15');
  
      // Password fields
      cy.get('#firstpassword').type('Password@123');
      cy.get('#secondpassword').type('Password@123');
  
      // Submit
      cy.get('#submitbtn').click();
    });
  });
  