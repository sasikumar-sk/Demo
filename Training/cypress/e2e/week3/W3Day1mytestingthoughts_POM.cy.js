import mytestingthoughtsPOM from '../../support/pages/mytestingthoughtsPOM';
describe('User Registration Test', () => { 
  const userData = {
    firstName: "PASO",
    lastName: "Leo",
    gender: "Male",
    hobbies: "Reading",
    department: "Department of Engineering",
    username: "test test",
    password: "Password123",
    confirmPassword: "Password123",
    email: "sasi@example.com",
    contactNo: "977876578787",
    additionalInfo: "This is some additional info."
  };

  beforeEach(() => { 
    mytestingthoughtsPOM.visit();
  });

  it('should successfully submit the registration form', () => { 
    mytestingthoughtsPOM.fillOutRegistrationForm(userData); 
    mytestingthoughtsPOM.submitForm();
    cy.get('#success_message').contains('Success').should('be.visible');
    // Check that the first name in the table matches the entered first name
    cy.get('tbody > :nth-child(2) > :nth-child(1)')
      .should('have.text', userData.firstName);

    // Check that the last name in the table matches the entered last name
    cy.get('tbody > :nth-child(2) > :nth-child(2)')
      .should('have.text', userData.lastName);

    // Check that the department in the table matches the entered department
    cy.get('tbody > :nth-child(2) > :nth-child(3)')
      .should('have.text', userData.department);

    // Check that the email in the table matches the entered email
    cy.get('tbody > :nth-child(2) > :nth-child(4)')
      .should('have.text', userData.email);
  });
});
