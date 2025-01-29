describe('Handle Nested Iframes with Cypress', () => {

 

  it('should interact with the TinyMCE editor and the email subscription iframe', () => {
    // Visit the page containing the iframes
    cy.visit('https://practice.expandtesting.com/iframe');
    cy.getIframe('#mce_0_ifr') // Accessing the TinyMCE iframe
      .within(() => {
        // Focus on the body of the editor and type some text
        cy.get('body')
          .type('Hello, this is a test message!')
          .should('have.text', 'Hello, this is a test message!'); // Verifying text typing
  
        // Perform an action like bold
        cy.get('body').type('{ctrl}b'); // This simulates pressing CTRL+B for bold
        cy.get('body').should('have.css', 'font-weight', '700'); // Check if the text is bold
      });
  
    // Access the internal Email Subscription Iframe and type the email
    cy.getIframe('#email-subscribe') // Accessing the email subscription iframe
      .within(() => {
        // Type an email in the input field
        cy.get('input[type="email"]')
          .type('test@example.com')
          .should('have.value', 'test@example.com'); // Verifying email entry
      });
  });
  
  });