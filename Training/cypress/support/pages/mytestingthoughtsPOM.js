class UserRegistrationPage {
  // Selectors for form fields
  get firstName() {
    return cy.get("input[placeholder='First Name']");
  }

  get lastName() {
    return cy.get('[data-bv-field="last_name"]');
  }

  get genderMale() {
    return cy.get('input[name="gender"][value="Male"]');
  }

  get genderFemale() {
    return cy.get('#inlineRadioMale').check();
  }

  get hobbiesReading() {
    return cy.get('input[name="hobbies"][value="Reading"]');
  }

  get hobbiesSports() {
    return cy.get('input[name="hobbies"][value="Sports"]');
  }

  get department() {
    return cy.get('select[name="department"]');
  }

  get username() {
    return cy.get('input[name="username"]');
  }

  get password() {
    return cy.get('input[name="password"]');
  }

  get confirmPassword() {
    return cy.get('input[name="confirmPassword"]');
  }

  get email() {
    return cy.get('input[name="email"]');
  }

  get contactNo() {
    return cy.get('input[name="contactNo"]');
  }

  get additionalInfo() {
    return cy.get('textarea[name="additionalInfo"]');
  }

  get submitButton() {
    return cy.get('button[type="submit"]');
  }

  // Actions
  visit() {
    cy.visit('https://mytestingthoughts.com/Sample/home.html');
  }

  fillOutRegistrationForm(userData) {
    // Fill in the form with provided user data
    this.firstName.type(userData.firstName);
    this.lastName.type(userData.lastName);

    // Select gender
    if (userData.gender === 'Male') {
      this.genderMale.check();
    } else {
      this.genderFemale.check();
    }

    // Select hobbies
    if (userData.hobbies.includes('Reading')) {
      this.hobbiesReading.check();
    }
    if (userData.hobbies.includes('Sports')) {
      this.hobbiesSports.check();
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
