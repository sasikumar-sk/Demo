describe('Data-Driven Login Tests', () => {
  beforeEach(() => {
    // Visit the correct page
    cy.visit('https://mytestingthoughts.com/Sample/home.html');
  });

  it('Performs login tests with multiple data sets from testdataWeek2Day4 fixture', () => {
    // Load the test data from the testdataWeek2Day4.json fixture
    cy.fixture('testdataWeek2Day4').then((testData) => {
      testData.forEach((data) => {
        // Ensure the username input field is available
        cy.get('input[name="username"]', { timeout: 10000 })
          .should('be.visible')
          .type(data.username);

        // Enter password and submit
        cy.get('input[name="password"]').type(data.password);
        cy.get('button[type="submit"]').click();

        // Validate the result
        cy.get('.message').should('contain', data.expectedMessage);

        // Reload the page for the next iteration
        cy.reload();
      });
    });
  });
});
