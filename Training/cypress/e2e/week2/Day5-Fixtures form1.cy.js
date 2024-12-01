describe('Book a Free Demo Form', () => {
  beforeEach(() => {
    // Handle uncaught exceptions and prevent Cypress from failing the test
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('popover is not a function') || err.message.includes('oldInputs is not defined')) {
        // Ignore these specific errors
        return false;
      }
      return true;
    });

    // Visit the demo form page before each test
    cy.visit('https://www.orangehrm.com/en/book-a-free-demo');
    cy.viewport(1200, 850)
    cy.wait(2000)
  });

  it('should fill out and submit the form with valid data', () => {
    // Load the fixture Day5_Fixtures_form1_Data.json data
    cy.fixture('Day5_Fixtures_form1_Data.json').then((data) => { 
      cy.get('input[name="FullName"]').type(data.fullName); 
      cy.get('#Form_getForm_Contact').type(data.phoneNumber); 
      cy.get('#Form_getForm_Email').type(data.email); 
      cy.get('#Form_getForm_CompanyName').type(data.companyName); 
      cy.get('select[name="Country"]').select(data.country); 
      cy.get('#Form_getForm_NoOfEmployees').select(data.employees); 
      cy.get('#Form_getForm_action_submitForm').click(); 
      cy.url().should('include', '/thank-you');
      // Or if there's a success message:
      // cy.contains('Thank you for your interest').should('be.visible');
    });
  });
});
