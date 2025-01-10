//working with fixtures in Cypress, data-driven testing, and parameterization
//Create a Fixture File(cypress/fixtures/Day5_Fixtures_form1_Data.json)

describe('Contact Form Submission - Data Driven Test', () => {
  beforeEach(() => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  });

  it('should submit the form with multiple contact details from fixture', function () {

    // Log in with provided credentials
    cy.get('#email').type('qa_Master123@protonmail.com'); // Email field
    cy.get('#password').type('qa_Master123@protonmail.com'); // Password field
    cy.get('#submit').click(); // Click on Login button
    cy.url().should('include', '/contactList');
    cy.contains('Add a New Contact').click();

    // Load the contacts data from the fixture
    cy.fixture('Day5_Fixtures_form1_Data.json').then((contacts) => {
      // Loop through each contact in the fixture
      contacts.forEach((contact) => {
        // Fill in the form fields with data from the fixture
        cy.get('#firstName').clear().type(contact.firstName);  // First Name
        cy.get('#lastName').clear().type(contact.lastName);    // Last Name
        cy.get('#birthdate').clear().type(contact.dateOfBirth); // Date of Birth (yyyy-MM-dd)
        cy.get('#email').clear().type(contact.email);           // Email
        cy.get('#phone').clear().type(contact.phone);           // Phone
        cy.get('#street1').clear().type(contact.streetAddress1); // Street Address 1
        cy.get('#street2').clear().type(contact.streetAddress2); // Street Address 2
        cy.get('#city').clear().type(contact.city);              // City
        cy.get('#stateProvince').clear().type(contact.state);    // State or Province
        cy.get('#postalCode').clear().type(contact.postalCode);  // Postal Code
        cy.get('#country').clear().type(contact.country);        // Country 
        cy.get('#submit').click(); // Submit button 
        cy.contains('tr.contactTableBodyRow td', 'LALA Doe').click();

      
        cy.get('#firstName').should('have.text', contact.firstName);  // Validate First Name
        cy.get('#lastName').should('have.text', contact.lastName);    // Validate Last Name
        cy.get('#birthdate').should('have.text', contact.dateOfBirth); // Validate Date of Birth
        cy.get('#email').should('have.text', contact.email);           // Validate Email
        cy.get('#phone').should('have.text', contact.phone);           // Validate Phone
        cy.get('#street1').should('have.text', contact.streetAddress1); // Validate Street Address 1
        cy.get('#street2').should('have.text', contact.streetAddress2); // Validate Street Address 2
        cy.get('#city').should('have.text', contact.city);              // Validate City
        cy.get('#stateProvince').should('have.text', contact.state);    // Validate State/Province
        cy.get('#postalCode').should('have.text', contact.postalCode);  // Validate Postal Code
        cy.get('#country').should('have.text', contact.country);        // Validate Country


        // delete the LALA details
        cy.get('#delete').click();

          cy.contains('Add a New Contact').click();
      });
    });
  });
}); 