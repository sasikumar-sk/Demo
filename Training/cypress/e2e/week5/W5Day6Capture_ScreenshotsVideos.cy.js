describe('Take screenshot for Add New Contact Form test', () => { 
    before(() => { 
      cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
    });
  
    it('Test log in with invalid credentials, submit the contact form with missing fields, and take screenshots at each step', () => {
  
      // Get the current date and time, formatted as YYYY/MM/DD_HH-MM
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 8) + '_' + now.getHours().toString().padStart(2, '0') + '-' + now.getMinutes().toString().padStart(2, '0'); // YYYYMMDD_HH-MM format
  
      // Attempt login with invalid credentials (invalid email and password)
      cy.get('#email').type('invalid_email@example.com'); // Invalid Email
      cy.get('#password').type('invalid_password'); // Invalid Password
      cy.get('#submit').click(); // Click on Login button
  
      // Capture screenshot on login failure (invalid credentials) with timestamp in the file name
      cy.screenshot(`week5/W5Day6Capture_ScreenshotsVideos.cy.js/Login-Failure-${timestamp}`);
      cy.log(`Screenshot saved at: cypress/screenshots/week5/W5Day6Capture_ScreenshotsVideos.cy.js/Login-Failure-Invalid-Credentials-${timestamp}.png`);
  
      // Now log in with valid credentials
      cy.get('#email').clear().type('qa_Master123@protonmail.com'); // Valid Email
      cy.get('#password').clear().type('qa_Master123@protonmail.com'); // Valid Password
      cy.get('#submit').click(); // Click on Login button
   
      cy.url().should('include', '/contactList');  
  
      // Click "Add New Contact" to submit a contact form with missing fields
      cy.contains('Add a New Contact').click();  
  
      // Fill out the form with missing fields (e.g., leaving phone and postalCode empty)
      cy.get('#firstName').type('QA test');  
      cy.get('#birthdate').type('01/01/1990');  
      cy.get('#email').type('fake@example.com');  
      // Leaving phone empty
      cy.get('#street1').type('123 Main St');  
      cy.get('#city').type('Sample City');  
      cy.get('#stateProvince').type('Sample State'); 
      // Leaving postalCode empty
      cy.get('#country').type('India');  
  
      // Submit the form with missing fields and take a screenshot with timestamp
      cy.get('#submit').click();  
  
      // Capture a screenshot of the form after submitting with missing fields, include timestamp
      cy.screenshot(`week5/W5Day6Capture_ScreenshotsVideos.cy.js/Contact-Form Missing-${timestamp}`);
      cy.log(`Screenshot saved at: cypress/screenshots/week5/W5Day6Capture_ScreenshotsVideos.cy.js/Contact-Form-Submitted-Missing-Fields-${timestamp}.png`);
   
      cy.get('#error').should('be.visible');   
  
      // Capture a screenshot on failure with timestamp
      cy.on('fail', (error) => {
        const failureTimestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 8) + '_' + now.getHours().toString().padStart(2, '0') + '-' + now.getMinutes().toString().padStart(2, '0'); // YYYYMMDD_HH-MM format
        cy.screenshot(`week5/W5Day6Capture_ScreenshotsVideos.cy.js/Failure-Screenshot-${failureTimestamp}`);  // Capture a screenshot on failure
        cy.log(`Failure screenshot saved at: cypress/screenshots/week5/W5Day6Capture_ScreenshotsVideos.cy.js/Failure-Screenshot-${failureTimestamp}.png`);  // Log failure screenshot path
        throw error;  
      });
    });
  });
  