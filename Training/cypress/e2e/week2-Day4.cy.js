describe('Test for Sample Form week 2 -Day 4', () => {
  const url = 'https://mytestingthoughts.com/Sample/home.html';

  beforeEach(() => {
      cy.visit(url);
  });

  it('should validate the form and submit successfully', () => {
        // Validate initial page elements
    cy.get('h2').contains('Registration Form').should('be.visible');
    cy.get('#fname').should('be.visible');  
    cy.get('#lname').should('be.visible');  
    cy.get('#age').should('be.visible'); 
    cy.get('input[type="radio"]').should('have.length.at.least', 2);  
    cy.get('#submitButton').should('be.visible').and('be.disabled'); 

    //  Fill in the form fields
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#age').type('30');
    cy.get('input[type="radio"]').first().check(); 
    cy.get('#submitButton').should('be.enabled');  

    // Submit the form
    cy.get('#submitButton').click();

    // Verify the submission success message
    cy.get('#message')
      .should('be.visible')
      .and('contain.text', 'Form submitted successfully!');
  });

  it('should validate required fields', () => {
    // Attempt to submit the form without filling it
    cy.get('#submitButton').should('be.disabled');

    // Validate error message for First Name
    cy.get('#lname').type('Doe');  
    cy.get('#submitButton').click();
    cy.get('#fname-error').should('contain.text', 'First Name is required');

    // Validate error message for Age
    cy.get('#fname').type('John');  
    cy.get('#submitButton').click();
    cy.get('#age-error').should('contain.text', 'Age is required');
  });

  it('should validate invalid input for age', () => {
    cy.get('#age').type('abc');
    cy.get('#age-error').should('contain.text', 'Please enter a valid age');
  });
});
