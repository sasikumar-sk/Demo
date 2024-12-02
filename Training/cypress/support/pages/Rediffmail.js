// cypress/support/pages/Rediffmail.js
class Rediffmail { 
  // Full Name - Matching with the "name" attribute (starts with "name")
  get fullNameField() {
    return cy.get('input[name^="name"]'); // Matches any input where name attribute starts with "name"
  }

  // Rediffmail ID - Matching with the "login" attribute (starts with "login")
  get rediffmailIdField() {
    return cy.get('input[name^="login"]'); // Matches any input where name attribute starts with "login"
  }

  // Check Availability Button - Matching with the "value" attribute (exact match)
  get checkAvailabilityButton() {
    return cy.get('input[value="Check availability"]');  
  }

  // Error Message - Matching based on the class of the error message (Contains "error")
  get availabilityErrorMessage() {
    return cy.get('#check_availability');  
  }

  // Password Field - Matching based on the "passwd" name (exact match)
  get passwordField() {
    return cy.get('input[name^="passwd"]');  
  }

  // Retype Password - Matching based on the "confpass" name (exact match)
  get retypePasswordField() {
    return cy.get('input[name^="confirm_passwd"]');  
  }

  // Alternate Email Field - Matching based on the "altemail" name (exact match)
  get alternateEmailField() {
    return cy.get('input[name^="altemail"]');  
  }

  // Mobile Number Field - Matching based on the "mobile" name (exact match)
  get mobileNumberField() {
    return cy.get('input[name^="mobno"]');  
  }

  // Date of Birth - Day Dropdown - Matching based on "DOB_Day" name (starts with "DOB_Day")
  get dayField() {
    return cy.get('select[name^="DOB_Day"]');  
  }

  // Date of Birth - Month Dropdown - Matching based on "DOB_Month" name (starts with "DOB_Month")
  get monthField() {
    return cy.get('select[name^="DOB_Month"]'); 
  }

  // Date of Birth - Year Dropdown - Matching based on "DOB_Year" name (starts with "DOB_Year")
  get yearField() {
    return cy.get('select[name^="DOB_Year"]');  
  }

  // Gender Radio Button - Matching based on the "gender" name (starts with "gender")
  get genderRadioButton() {
    return cy.get('input[name^="gender"][value="m"]');   }

  // Country Dropdown - Matching based on the "country" name (exact match)
  get countryDropdown() {
    return cy.get('select[name^="country"]');  
  }

  // Create Account Button - Matching based on the "value" attribute (exact match)
  get createAccountButton() {
    return cy.get('#Register') 
  }

  // Verification Code Alert - Using window:alert to capture the alert text
  get verificationCodeAlert() {
    return cy.on('window:alert', (alertText) => {
      return alertText === 'Verification code field cannot be blank';
    });
  }

  // Method to fill out the registration form with user details
  fillRegistrationForm(userDetails) {
    this.fullNameField.type(userDetails.fullName);
    this.rediffmailIdField.type(userDetails.rediffmailId);
    this.passwordField.type(userDetails.password);
    this.retypePasswordField.type(userDetails.retypePassword);
    this.alternateEmailField.type(userDetails.alternateEmail);
    this.mobileNumberField.type(userDetails.mobileNumber);
    this.dayField.select(userDetails.dobDay);   // Select day from the dropdown
    this.monthField.select(userDetails.dobMonth);  
    this.yearField.select(userDetails.dobYear);   
    this.genderRadioButton.check();
    this.countryDropdown.select(userDetails.country);
  }

  // Method to check availability of Rediffmail ID
  checkRediffmailIdAvailability() {
    this.checkAvailabilityButton.click();
  }

  // Method to submit the registration form
  submitForm() {
    this.createAccountButton.click();
  }

  // Method to verify the availability error message
  verifyAvailabilityErrorMessage(expectedMessage) {
    this.availabilityErrorMessage.should('be.visible').and('contain.text', expectedMessage);
  }
}

export default new Rediffmail();
