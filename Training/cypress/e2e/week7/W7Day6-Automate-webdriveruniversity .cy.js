describe('Contact Us Page Automation', () => {
    it('should submit a contact form', () => {
      // Visit the page
      cy.visit('http://webdriveruniversity.com/Contact-Us/contactus.html');
  
      // Fill out the contact form
      cy.get('input[name="first_name"]').type('sasi');
      cy.get('input[name="last_name"]').type('das');
      cy.get('input[name="email"]').type('sasi@example.com');
      cy.get('textarea[name="message"]').type('This is a test message.');
  
      // Submit the form
      cy.get('input[type="submit"]').click();
  
      // Verify that the success message appears
      cy.get('h1').should('contain', 'Thank You for your Message!');
    });
  }); 

  describe('Login Portal Automation', () => {
    it('should log in with valid credentials', () => {
      // Visit the page
      cy.visit('http://webdriveruniversity.com/Login-Portal/index.html');
  
      // Fill out the login form
      cy.get('#text').type('TestUser');
      cy.get('#password').type('TestPassword123');
  
      // Submit the form
      cy.get('#login-button').click();
  
      
    });
  });
  

  describe('Click Buttons Page Automation', () => {
    it('should click a button and verify alert', () => {
      // Visit the page
      cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html');
  
      // Click the button that triggers the alert
      cy.get('#button1').click();
  
      // Verify the alert text
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('You pressed a button!');
      });
    });
  });
  