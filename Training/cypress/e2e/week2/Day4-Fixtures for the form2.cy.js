
//Fixtures for the form2 --mytestingthoughts.com

describe('Data-Driven Login Tests', () => {
  beforeEach(() => { 
    cy.visit('https://mytestingthoughts.com/Sample/home.html');
  });

  it('Performs login tests with multiple data sets from testdataWeek2Day4 fixture', () => {
    // Load the test data from the Day4-Fixtures form2-Data.json fixture
    cy.fixture('Day4-Fixtures form2-Data').then((testData) => {
      testData.forEach((data) => {
        // Ensure the username input field is available
        cy.get('input[name="username"]', { timeout: 10000 })
          .should('be.visible')
          .type(data.username);

        // Enter password and submit
        cy.get('input[name="password"]').type(data.password);
        cy.get('button[type="submit"]').click();
 
        cy.get('.message').should('contain', data.expectedMessage); 
        cy.reload();
      });
    });
  });
});
