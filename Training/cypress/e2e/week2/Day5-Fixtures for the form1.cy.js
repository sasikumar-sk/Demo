//Day 5 ---- Fixtures for the form1

describe('Rediff Registration Form Tests', () => {
  beforeEach(() => {
    // Visit the Rediff registration page
    cy.visit('https://register.rediff.com/register/register.php?FormName=user_details');
  });

  it('Validates registration form with multiple data sets', () => {
    // Load test data from fixture
    cy.fixture('Day5-Fixtures form1-Data').then((registrationData) => {
      registrationData.forEach((data) => {
        // Enter full name
        cy.get('input[name="name"]').clear().type(data.fullName);

        // Enter email ID
        cy.get('input[name="login"]').clear().type(data.email);

        // Enter password
        cy.get('input[name="passwd"]').clear().type(data.password);

        // Enter confirm password
        cy.get('input[name="confirm_passwd"]').clear().type(data.confirmPassword);

        // Enter mobile number
        cy.get('input[name="mobno"]').clear().type(data.mobile);

        // Select DOB (Day, Month, Year)
        cy.get('select[name="DOB_Day"]').select(data.day);
        cy.get('select[name="DOB_Month"]').select(data.month);
        cy.get('select[name="DOB_Year"]').select(data.year);

        // Select Gender
        cy.get(`input[value="${data.gender}"]`).check();

        // Submit the form
        cy.get('input[type="submit"]').click();

        // Validate the result (mocked as "Registration successful!")
        cy.get('.confirmationMessage')  
          .should('contain', data.expectedMessage);
        cy.reload();
      });
    });
  });
});
