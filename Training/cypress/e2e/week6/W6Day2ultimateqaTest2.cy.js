//Contact Form Validation Tests with leaving and invalid email enter
//submit all the name and email with valid data

describe("Contact Form Validation Tests", () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });

  it("Displays error message when name and email are empty,invalid", () => {
    cy.get(".et_pb_contact_submit").click();
    cy.get(".et-pb-contact-message").should(
      "contain",
      "Make sure you fill in all required fields."
    );

    cy.get("#et_pb_contact_name_0") // Select the name input
      .clear()
      .type("Ioas KAUS"); // Enter a name

    cy.get("#et_pb_contact_email_0") // Select the email input
      .clear(); // Leave the email empty

    cy.get('button[name="et_builder_submit_button"]') // Select the submit button
      .click(); // Click the button

    // Check the error message for missing email
    cy.get(".et-pb-contact-message")
      .should("contain", "Please, fill in the following fields:")
      .and("contain", "Email Address");
    cy.get("#et_pb_contact_name_0") // Select the name input
      .clear(); // Leave the name empty

    cy.get("#et_pb_contact_email_0") // Select the email input
      .clear()
      .type("johndoepias@example.com"); // Enter an email

    cy.get('button[name="et_builder_submit_button"]') // Select the submit button
      .click(); // Click the button

    // Check the error message for missing name 
    cy.get(".et-pb-contact-message")
      .should("contain", "Please, fill in the following fields:")
      .and("contain", "Name");

    cy.get("#et_pb_contact_name_0") // Select the name input
      .clear()
      .type("Iaks aswas"); // Enter a name

    cy.get("#et_pb_contact_email_0") // Select the email input
      .clear()
      .type("invalid-email"); // Enter an invalid email

    cy.get('button[name="et_builder_submit_button"]') // Select the submit button
      .click(); // Click the button

    // Check the error message for invalid email
    cy.get(".et-pb-contact-message").should("contain", "Invalid email");
    //Displays success message when valid name and email are entered
    cy.get("#et_pb_contact_name_0").clear().type("LASas");

    cy.get("#et_pb_contact_email_0").clear().type("lasas@example.com");

    cy.get(".et_pb_contact_submit").click();

    // Check the success message
    cy.get(".et-pb-contact-message").should(
      "contain","Thanks for contacting us" );
  });
});
