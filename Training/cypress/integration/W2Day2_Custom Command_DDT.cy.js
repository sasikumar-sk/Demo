describe('Login Form Error Handling - Invalid Username and Password', () => {
  const loginUrl = 'https://petstore.octoperf.com/actions/Account.action?signonForm=';  

  beforeEach(() => {
    cy.visit(loginUrl);  
  });

  it('should show an error message for both invalid username and password', () => {
    cy.fixture('W2D2CCDDT.json').then((W2D2CCDDT) => {
      // Find the case where both username and password are invalid
      W2D2CCDDT.filter((data) => data.username === "invalidUser" && data.password === "invalidPassword123")
        .forEach((data) => {
          cy.login(data.username, data.password); // Use custom login command 
          // Assert that the error message is shown
          cy.get('.error-message').should('be.visible').and('contain', data.errorMessage);
        });
    });
  });

  it('should show an error message for invalid password', () => {
    cy.fixture('W2D2CCDDT.json').then((W2D2CCDDT) => {
      // Find the case where the password is invalid
      W2D2CCDDT.filter((data) => data.username === "validUser" && data.password === "invalidPassword123")
        .forEach((data) => {
          cy.login(data.username, data.password);   
          cy.get('.error-message').should('be.visible').and('contain', data.errorMessage);
        });
    });
  });

  it('should show an error message for invalid username', () => {
    cy.fixture('W2D2CCDDT.json').then((W2D2CCDDT) => {
      // Find the case where the username is invalid
      W2D2CCDDT.filter((data) => data.username === "invalidUser" && data.password === "validPassword123")
        .forEach((data) => {
          cy.login(data.username, data.password);  
          cy.get('.error-message').should('be.visible').and('contain', data.errorMessage);
        });
    });
  });
});
