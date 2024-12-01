 
describe('Form Submission Tests', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('https://mytestingthoughts.com/Sample/home.html');
  });

  it('should fill out and submit the form correctly', () => {
    // Load the Day4-Fixtures form2-Data.json data
    cy.fixture('Day4_Fixtures_form2_Data.json').then((data) => {
      // Fill in First Name
      cy.get('input[name="first_name"]').type(data.firstName);

      // Fill in Last Name
      cy.get('input[name="last_name"]').type(data.lastName);

      // Select Gender radio button (Male or Female)
      cy.get('#inlineRadioMale').check();

    

      // Check Hobbies checkboxes (Reading, Sports)
      cy.get('#exampleFormControlSelect2 > :nth-child(1)').click()


      // Select Department from dropdown
      cy.get('select[name="department"]').select(data.department);

      // Fill in Username
      cy.get('input[placeholder="Username"]')   
      .clear()                               
      .type(data.username); 

      // Fill in Password
      cy.get('input[name="user_password"]').type(data.password);

      // Fill in Confirm Password
      cy.get('input[name="confirm_password"]').type(data.confirmPassword);

      // Fill in Email
      cy.get('input[name="email"]').type(data.email);

      // Fill in Contact No.
      cy.get('input[name="contact_no"]').type(data.contactNo);

      // Fill in Additional Info
      cy.get('#exampleFormControlTextarea1').type(data.additionalInfo);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert the form is submitted successfully (adjust the message as needed)
      cy.get('#success_message').should('contain', 'Success');

    });
  });
});
