describe('Zoho Forms - Form Creation Test', () => {

    // Disable uncaught exceptions to prevent cross-origin script errors from failing the tests
    beforeEach(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent the test from failing
        return false;
      });
    });
   
    before(() => {
  
      cy.session('login', () => {
        cy.visit('https://forms.zoho.in/');
        // Click Sign In button
        cy.get('.zgh-utilities > .zgh-accounts > .zgh-login').click();
  
        // Use cy.origin() to handle the login page (this is a different origin)
        cy.origin('https://accounts.zoho.in', () => {
          // Enter email and password
          cy.get('#login_id').type('sasisk@zohomail.in');
          cy.get('#nextbtn').click();
          cy.get('#password').type('tester@123*&');
  
          // Submit login form
          cy.get('#nextbtn').click();
        });
      });
  
    });
  
    it('should login with valid credentials', () => {
        cy.visit('https://forms.zoho.in/sasiskzoho1/home#myforms');     
        cy.visit('https://forms.zoho.in/sasiskzoho1/home#myforms');   
      cy.wait(2000);
      cy.origin('https://forms.zoho.in', () => {
      cy.url().should('include', 'https://forms.zoho.in/sasiskzoho1/home#myforms'); // Ensure user is logged in
      cy.get('#formListingName').contains('My Forms').should('be.visible'); // Check "My Forms" is visible
      cy.get('#noFormsDiv').contains('You don\'t have any forms').should('be.visible'); // Ensure "No Forms" message
    });
});
  
    it('should create a new form ', () => {
      // Click on the 'New form' button
      cy.get('#createFormBtn').click();
  
      // Ensure the form creation page has loaded by checking for the form type selector
      cy.get('.oneFieldFrmLayout.select').should('exist'); // Wait for the form type dropdown
  
      // Check that the 'Standard' form type is selected by default
      cy.get('.oneFieldFrmLayout.select').should('have.value', 'Standard');
      cy.get('#formName').should('be.empty');
      cy.get('#createBtn').click();
  
      // Check that the error message appears
      cy.get('#formNamespn').should('have.value', 'Name your form').should('be.visible');
     
      // Enter a valid title in the form title field
      cy.get('#formName').type('Test Form');
  
      // Click the 'Create' button to create the form
      cy.get('#createBtn').click();
  
      // Wait for the form to be created and ensure the form list is updated
      cy.url().should('include', '/forms'); // Ensure the URL is correct after form creation
      cy.contains('Test Form').should('be.visible'); // Verify that the newly created form is visible
    });
  
  });
  