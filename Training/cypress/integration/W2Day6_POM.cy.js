
import Rediffmail from '../support/pages/Rediffmail';

describe('Registration Page POM Tests', () => {
  beforeEach(() => {
    cy.visit('https://register.rediff.com/register/register.php?FormName=user_details');
  });

  it('should check availability of Rediffmail ID and show error', () => {
    const userDetails = {
      fullName: 'LASLI SA',
      rediffmailId: 'sa_lasli',
      password: 'Password123',
      retypePassword: 'Password123',
      alternateEmail: 'sassa@testin.in',
      mobileNumber: '1234567890',
      dobDay: '01',   
      dobMonth: 'DEC', 
      dobYear: '1990',  
      country: 'Bahrain',  
    };

    Rediffmail.fillRegistrationForm(userDetails);
    Rediffmail.checkRediffmailIdAvailability();
    Rediffmail.verifyAvailabilityErrorMessage("Yippie! The ID you've chosen is available.");
  });

  it('should fill the form and show alert on clicking "Create my account" without entering verification code', () => {
    const userDetails = {
      fullName: 'LASLI SA',
      rediffmailId: 'sa_lasli1', 
      password: 'Password123',
      retypePassword: 'Password123',
      alternateEmail: 'sassa@testin.in',
      mobileNumber: '1234567890',
      dobDay: '15', 
      dobMonth: 'MAY', 
      dobYear: '1992', 
      country: 'Angola',
    };

    Rediffmail.fillRegistrationForm(userDetails);
    cy.window().then((win) => {
      cy.stub(win, 'alert').callsFake((message) => {
        expect(message).to.equal('Verification code field cannot be blank');
      });
    });
    Rediffmail.submitForm();
  });
});
