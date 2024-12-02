import mytestingthoughtsPOM from '../../support/pages/mytestingthoughtsPOM';
describe('User Registration Test', () => { 
  const userData = {
    firstName: "PASO",
    lastName: "Leo",
    gender: "Male",
    hobbies: ["Reading", "Sports"],
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
 
    cy.contains('Registration successful').should('be.visible');
  });
});
