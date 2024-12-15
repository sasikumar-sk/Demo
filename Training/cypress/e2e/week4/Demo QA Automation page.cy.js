describe('QA Automation Demo Registration Form Test', () => {
    before(() => {
        // Ignore 'angular is not defined' error and let the test continue
        Cypress.on('uncaught:exception', (err, runnable) => {
          if (err.message.includes('angular is not defined')) {
            return false; // Ignore this specific error
          }
          return true; // Fail the test for other errors
        });
      });
  it('should register successfully with valid data', () => {
    // Intercept network requests made by the page (if any)
    cy.intercept('GET', '**/api/your-api-endpoint').as('apiRequest');
    cy.visit('https://demo.automationtesting.in/Register.html');

    // Wait for the API or resource to load
    cy.wait('@apiRequest'); // Wait for your external request to complete

    // Fill in the form fields
    cy.get('input[placeholder="First Name"]').type('John');
    cy.get('input[placeholder="Last Name"]').type('Doe');
    cy.get('textarea[ng-model="Adress"]').type('1234 Main St, City, Country');
    cy.get('input[type="email"]').type('johndoe@example.com');
    cy.get('input[type="tel"]').type('1234567890');
    cy.get('input[value="Male"]').check();
    cy.get('input[value="Cricket"]').check();
    cy.get('select#countries').select('India');
    cy.get('select#skills').select('Java');
    cy.get('select#languages').select('English');
    cy.get('select#yearbox').select('1990');
    cy.get('select[placeholder="Month"]').select('January');
    cy.get('select[placeholder="Day"]').select('15');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    // Optional: Verify if the user was successfully registered
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });
});
