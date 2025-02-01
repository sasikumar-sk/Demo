//Test the form submission on the Contact Us page
//Login Portal Automation
//Click Buttons Page test diffrenct popups
 

describe('Contact Us Page Automation', () => {
    it('should submit a contact form', () => { 
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

    beforeEach(() => {
      // Ignore uncaught exceptions during the test
      cy.on('uncaught:exception', (err, runnable) => {
        console.log('Uncaught exception', err);
        return false; // Prevent test failure on uncaught exceptions
      });
  
      // Visit the page before each test
      cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html');
    });
  
    it('should click button1 and verify the modal content', () => {
      cy.get('#button1').click();
  
      cy.get('#myModalClick').should('be.visible');
      // Verify the modal title
      cy.get('#myModalClick .modal-title').should('have.text', 'Congratulations!');
      cy.get('#myModalClick .modal-body p').should('contain.text', 'Well done for successfully using the click() method!');
      cy.get('#myModalClick > .modal-dialog > .modal-content > .modal-footer > .btn').click(); // Close button is in the modal-footer
    });
  
    it('should click button2 and verify the modal content', () => {
      cy.get('#button2').click();
      cy.get('#myModalJSClick').should('be.visible');
      cy.get('#myModalJSClick .modal-title').should('have.text', 'It’s that Easy!!  Well I think it is.....');
      cy.get('#myModalJSClick .modal-body p').should('contain.text', 'We can use JavaScript code if all else fails!');
      cy.get('#myModalJSClick .modal-body p').should('contain.text', 'Remember always try to use the WebDriver Library method(s) first');
      // Close the modal by clicking the close button
      cy.get('#myModalJSClick > .modal-dialog > .modal-content > .modal-footer > .btn').click();  
    });
  
    it('should click button3 and verify the modal content', () => {
      // Click button3 to trigger the modal
      cy.get('#button3').click();
  
      // Ensure the modal with ID 'myModalMoveClick' is visible
      cy.get('#myModalMoveClick').should('be.visible');  
      // Verify the modal title
      cy.get('#myModalMoveClick .modal-title').should('have.text', 'Well done! the Action Move & Click can become very useful!');
        cy.get('#myModalMoveClick .modal-body p').should('contain.text', 'Advanced user interactions (API) has been developed to enable you to perform more complex interactions such as:');
      cy.get('#myModalMoveClick .modal-body ul').should('contain.text', 'Drag & Drop');
      cy.get('#myModalMoveClick .modal-body ul').should('contain.text', 'Hover & Click');
      cy.get('#myModalMoveClick .modal-body ul').should('contain.text', 'Click & Hold....'); 
      cy.get('#myModalMoveClick .modal-footer .btn').click(); 
    });
  
  });
  