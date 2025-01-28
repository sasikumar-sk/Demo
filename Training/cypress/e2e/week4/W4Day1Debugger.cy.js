describe.skip('Login Form Test with Debugging and Automatic Continuation', () => { 
  it('should fill the login form, submit it, and validate results', () => {  
    cy.visit('https://testyou.in/Login.aspx');
     
    cy.get('#ctl00_CPHContainer_txtUserLogin')  
      .type('testuser')  
      .should('have.value', 'testuser')  
      .debug();  
    
    // Fill out the password field
    cy.get('#ctl00_CPHContainer_txtPassword') 
      .type('password123')  
      .should('have.value', 'password123');
    
    // Click the login button
    cy.get('#ctl00_CPHContainer_btnLoginn')  
      .click();
  
     cy.get('#ctl00_CPHContainer_lblOutput')
      .should('be.visible')
      .contains('Userid or Password did Not Match !!')
      .debug();
      cy.pause();    
  });
});
