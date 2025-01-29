//Negative Scenarios for getting validation for the fields


describe('DummyTicket Visa Application - Negative Scenarios', () => {

  beforeEach(() => {
    cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
  });

  it('show error messages when form is submitted empty', () => {
    // Submit form with all fields empty
    cy.get('#place_order').click();
    
    // Verify if error messages for required fields are displayed
    cy.get('ul[role="alert"]').should('contain', 'Billing Phone is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Billing Email address is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Billing Street address is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Billing Town / City is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Billing State / District / Province is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Billing Postcode / ZIP / PIN code is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Last / Surname is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Date of birth is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Sex is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'From city / Origin is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'To city. /Dest. is a required field.');
    cy.get('ul[role="alert"]').should('contain', 'Departure date is a required field.');
  });

  it('show an error when traveler\'s name is empty', () => {
    // Leave the first name field empty
    cy.get('#travname').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Last / Surname is a required field.');
  });

  it('show an error when traveler\'s last name is empty', () => {
    // Leave the last name field empty
    cy.get('#travlastname').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Last / Surname is a required field.');
  });

  it(' show an error when date of birth is empty', () => {
    // Leave the date of birth field empty 
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Date of birth is a required field.');
  });

  it('show an error when gender is not selected', () => {
    // Ensure no gender is selected
    cy.get('#sex_1').should('not.be.checked');
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Sex is a required field.');
  });

  it('show an error when departure city is empty', () => {
    cy.get('#fromcity').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'From city / Origin is a required field.');
  });

  it('show an error when destination city is empty', () => {
    cy.get('#tocity').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'To city. /Dest. is a required field.');
  });

  it('show an error when departure date is empty', () => { 
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Departure date is a required field.');
  });

  it('show an error when billing name is empty', () => {
    cy.get('#billname').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('not.contain', 'Billing Name is a required field.');
  });

  it('show an error when billing phone number is empty', () => {
    cy.get('#billing_phone').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing Phone is a required field.');
  });

  it('show an error when billing email is empty', () => {
    cy.get('#billing_email').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing Email address is a required field.');
  });

  it('show an error when billing street address is empty', () => {
    cy.get('#billing_address_1').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing Street address is a required field.');
  });

  it('show an error when billing city is empty', () => {
    cy.get('#billing_city').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing Town / City is a required field.');
  });

  it('show an error when billing state is empty', () => { 
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing State / District / Province is a required field.');
  });

  it('show an error when billing postcode is empty', () => {
    cy.get('#billing_postcode').clear();
    cy.get('#place_order').click();
    cy.get('ul[role="alert"]').should('contain', 'Billing Postcode / ZIP / PIN code is a required field.');
  });
});
