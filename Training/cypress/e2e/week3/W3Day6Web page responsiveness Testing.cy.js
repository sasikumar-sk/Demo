describe('Practice Test Automation - Login Tests', () => {
  
    beforeEach(() => {
        
        // Intercept and block images, fonts, and other non-essential resources
        cy.intercept('**/*.png', { statusCode: 200, body: {} }).as('blockImages');
        cy.intercept('**/*.jpg', { statusCode: 200, body: {} }).as('blockImages');
        cy.intercept('**/*.jpeg', { statusCode: 200, body: {} }).as('blockImages');
        cy.intercept('**/*.gif', { statusCode: 200, body: {} }).as('blockImages');
        cy.intercept('**/*.svg', { statusCode: 200, body: {} }).as('blockImages');
        cy.intercept('**/ads/*', { statusCode: 200, body: {} }).as('blockAds');
      
        // Visit the page with the blocked resources
        cy.visit('https://practicetestautomation.com/practice-test-login/');
      });
  

    const devices = [
      { name: 'iPhone 6', width: 375, height: 667 }, // Mobile device in portrait
      { name: 'iPhone 6 Landscape', width: 667, height: 375 }, // Mobile device in landscape
      { name: 'iPad', width: 768, height: 1024 }, // Tablet
      { name: 'iPad Landscape', width: 1024, height: 768 }, // Tablet Landscape
      { name: 'Desktop', width: 1280, height: 800 } // Desktop screen
    ];
  
  // Test Case 1: Positive Login Test
    it('Positive Login Test - should log in successfully and show the correct page', () => {
      // Type valid username and password
      cy.get('#username').clear().type('student');  // Username field
      cy.get('#password').clear().type('Password123');  
      cy.get('#submit').click();   
      // Verify the new page URL contains 'logged-in-successfully'
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');   
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');  
      // Verify that the Log Out button is displayed
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
    });
  
    // Test Case 2: Negative Username Test
    it('Negative Username Test - should show error message for invalid username', () => {
      // Type invalid username and valid password
      cy.get('#username').clear().type('incorrectUser');   
      cy.get('#password').clear().type('Password123');  
      cy.get('#submit').click(); 
      cy.get('#error').should('be.visible');
  
      // Verify error message text is 'Your username is invalid!'
      cy.get('#error').should('have.text', 'Your username is invalid!');
    });
  
    // Test Case 3: Negative Password Test
    it('Negative Password Test - should show error message for invalid password', () => {
      // Type valid username and invalid password
      cy.get('#username').clear().type('student'); 
      cy.get('#password').clear().type('incorrectPassword'); 
      cy.get('#submit').click(); 
      // Verify error message is displayed
      cy.get('#error').should('be.visible');  
      // Verify error message text is 'Your password is invalid!'
      cy.get('#error').should('have.text', 'Your password is invalid!');
    });
  
    // Test Case 4: Positive Login Test on Different Devices
    devices.forEach(device => {
      it(`Positive Login Test - should work correctly on ${device.name}`, () => {
        // Emulate device using cy.viewport()
        cy.viewport(device.width, device.height);
        cy.get('#username').clear().type('student');  
        cy.get('#password').clear().type('Password123');  
        cy.get('#submit').click(); 
        cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
        // Verify the page contains the text 'Congratulations' or 'successfully logged in'
        cy.contains('Congratulations').should('exist');
        cy.contains('successfully logged in').should('exist');
        // Verify that the Log Out button is displayed
        cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
      });
    });
  
    // Test Case 5: Custom Viewport Sizes
    it('Positive Login Test - Custom viewport sizes', () => {
      cy.viewport(1024, 768);  // Custom tablet size
      cy.get('#username').clear().type('student');  
      cy.get('#password').clear().type('Password123'); 
      cy.get('#submit').click(); 
  
      // Verify successful login page
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
    });
  
    // Test Case 6: Check Portrait and Landscape Orientations
    it('Positive Login Test - Check Portrait and Landscape Orientations', () => {
      // Check in Portrait
      cy.viewport(375, 667); // Mobile Portrait
      cy.get('#username').clear().type('student');  
      cy.get('#password').clear().type('Password123'); 
      cy.get('#submit').click(); 
      // Verify successful login page
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
      // Check in Landscape
      cy.viewport(667, 375); // Mobile Landscape
      cy.get('#username').clear().type('student');  
      cy.get('#password').clear().type('Password123'); 
      cy.get('#submit').click();  
  
      // Verify successful login page
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
    });
  
    // Test Case 7: Adapt to Dynamic Viewport Changes
    it('Positive Login Test - Adapt to dynamic viewport change', () => {
      // Start with desktop view
      cy.viewport(1280, 800);  // Desktop screen
      cy.get('#username').clear().type('student'); 
      cy.get('#password').clear().type('Password123');  
      cy.get('#submit').click();  
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible').click();
      // Dynamically change viewport to mobile
      cy.viewport(375, 667);  // Mobile Portrait
      cy.get('#username').clear().type('student');  
      cy.get('#password').clear().type('Password123'); 
      cy.get('#submit').click(); 
      // Verify successful login page
      cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');
      cy.contains('Congratulations').should('exist');
      cy.contains('successfully logged in').should('exist');
      cy.get('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').should('be.visible');
    });
  
  });
  