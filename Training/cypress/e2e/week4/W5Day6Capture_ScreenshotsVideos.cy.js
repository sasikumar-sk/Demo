describe('Add New Contact Form', () => {
  // Setup before the test starts
  before(() => {
    // Visit the login page
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  });

  it('should log in with valid credentials and submit the contact form with missing fields', () => {
    // Log in with provided credentials
    cy.get('#email').type('qa_Master123@protonmail.com'); // Email field
    cy.get('#password').type('qa_Master123@protonmail.com'); // Password field
    cy.get('#submit').click(); // Click on Login button

    // Validate that login is successful, check URL to ensure successful login
    cy.url().should('include', '/contactList'); // Assuming successful login redirects to the contact list page

    // Now perform the Add New Contact action
    cy.contains('Add a New Contact').click(); // Click the Add New Contact button
    
    // Fill out the form, leaving the phone and postalCode fields empty
    cy.get('#firstName').type('John Doe'); // Name field
    cy.get('#birthdate').type('01/01/1990'); // Birthdate field
    cy.get('#email').type('john.doe@example.com'); // Email field
    // Leaving phone empty
    cy.get('#street1').type('123 Main St'); // Address field
    cy.get('#city').type('Sample City'); // City field
    cy.get('#stateProvince').type('Sample State'); // State field
    // Leaving postalCode empty
    cy.get('#country').type('India'); // Select Country field
    
    // Take a screenshot of the form before submission
    cy.get("body").screenshot("Contact List - Before Submit");

    // Submit the form
    cy.get('#submit').click(); // Submit button

    // Assertions for form fields
    cy.get('#firstName').should('have.value', 'John Doe');
    cy.get('#birthdate').should('have.value', '01/01/1990');
    cy.get('#email').should('have.value', 'john.doe@example.com');
    cy.get('#street1').should('have.value', '123 Main St');
    cy.get('#city').should('have.value', 'Sample City');
    cy.get('#stateProvince').should('have.value', 'Sample State');
    cy.get('#country').should('have.value', 'India');

    // Check that the phone and postalCode fields are still empty
    cy.get('#phone').should('have.value', ''); // Assert that the phone field is empty
    cy.get('#postalCode').should('have.value', ''); // Assert that the postalCode field is empty

       
    // Submit the form
    cy.get('#submit').click(); // Submit button
    cy.get("body").screenshot("Contact List - After Submit");
  
    // Capture a screenshot on failure if needed
    cy.on('fail', (error) => {
      cy.screenshot();  // Capture a screenshot on failure
      throw error; // Rethrow the error to let Cypress know the test failed
    });
  });
});


describe('Add New Contact Form', () => {
  // Setup before the test starts
  before(() => {
    // Visit the login page
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  });

  it('should log in with valid credentials and submit the contact form with missing fields', () => {
    // Log in with provided credentials
    cy.get('#email').type('qa_Master123@protonmail.com'); // Email field
    cy.get('#password').type('qa_Master123@protonmail.com'); // Password field
    cy.get('#submit').click(); // Click on Login button

    // Validate that login is successful, check URL to ensure successful login
    cy.url().should('include', '/contactList'); // Assuming successful login redirects to the contact list page

    // Now perform the Add New Contact action
    cy.contains('Add a New Contact').click(); // Click the Add New Contact button
    
    // Fill out the form, leaving the phone and postalCode fields empty
    cy.get('#firstName').type('John Doe'); // Name field
    cy.get('#birthdate').type('01/01/1990'); // Birthdate field
    cy.get('#email').type('john.doe@example.com'); // Email field
    // Leaving phone empty
    cy.get('#street1').type('123 Main St'); // Address field
    cy.get('#city').type('Sample City'); // City field
    cy.get('#stateProvince').type('Sample State'); // State field
    // Leaving postalCode empty
    cy.get('#country').type('India'); // Select Country field
    
    // Take a screenshot of the form before submission
    cy.get("body").screenshot("Contact List - Before Submit");

    // Submit the form
    cy.get('#submit').click(); // Submit button

    // Assertions for form fields
    cy.get('#firstName').should('have.value', 'John Doe');
    cy.get('#birthdate').should('have.value', '01/01/1990');
    cy.get('#email').should('have.value', 'john.doe@example.com');
    cy.get('#street1').should('have.value', '123 Main St');
    cy.get('#city').should('have.value', 'Sample City');
    cy.get('#stateProvince').should('have.value', 'Sample State');
    cy.get('#country').should('have.value', 'India');

    // Check that the phone and postalCode fields are still empty
    cy.get('#phone').should('have.value', ''); // Assert that the phone field is empty
    cy.get('#postalCode').should('have.value', ''); // Assert that the postalCode field is empty

       
    // Submit the form
    cy.get('#submit').click(); // Submit button
    cy.get("body").screenshot("Contact List - After Submit");
  
    // Capture a screenshot on failure if needed
    cy.on('fail', (error) => {
      cy.screenshot();  // Capture a screenshot on failure
      throw error; // Rethrow the error to let Cypress know the test failed
    });
  });
});
