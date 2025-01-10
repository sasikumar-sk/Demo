class UserRegistrationPage {
  // Selectors for form fields
  get firstName() {
    return cy.get("input[placeholder='First Name']");
  }

  get lastName() {
    return cy.get('[data-bv-field="last_name"]');
  }

  get genderMale() {
    return cy.get('#inlineRadioMale');
  }

  get genderFemale() {
    return cy.get('#inlineRadioFemale');
  }

  get hobbiesSelect() {
    return cy.get('#exampleFormControlSelect2');
  }

  get department() {
    return cy.get('select[name="department"]');
  }

  get username() {
    return cy.get("input[placeholder='Username']");
  }

  get password() {
    return cy.get("input[placeholder='Password']");
  }

  get confirmPassword() {
    return cy.get("input[placeholder='Confirm Password']");
  }

  get email() {
    return cy.get("input[placeholder='E-Mail Address']");
  }

  get contactNo() {
    return cy.get("input[placeholder='(639)']");
  }

  get additionalInfo() {
    return cy.get('#exampleFormControlTextarea1');
  }

  get submitButton() {
    return cy.get("button[type='submit']");
  }

  // Actions
  visit() {
    cy.visit('https://mytestingthoughts.com/Sample/home.html');
  }

  fillOutRegistrationForm(userData) {
    this.firstName.type(userData.firstName);
    this.lastName.type(userData.lastName);

    // Select gender
    if (userData.gender === 'Male') {
      this.genderMale.check();
    } else {
      this.genderFemale.check();
    }

   // Select hobbies (from multi-select dropdown)
   if (userData.hobbies.includes('Reading')) {
    this.hobbiesSelect.select('Reading');
  } 

    // Select department
    this.department.select(userData.department);

    // Fill in other fields
    this.username.type(userData.username);
    this.password.type(userData.password);
    this.confirmPassword.type(userData.confirmPassword);
    this.email.type(userData.email);
    this.contactNo.type(userData.contactNo);
    this.additionalInfo.type(userData.additionalInfo);
  }

  submitForm() {
    this.submitButton.click();
  }
}

export default new UserRegistrationPage();
