//1.Interact with buttons using different locators like ID, link text, class name, and name.
//2.Test the functionality of simple controls like buttons and links,
//3.verify common scenarios such as clicking to login or navigating to a login page 

describe("1. Button Interaction Tests", () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });

  it("Clicks button using ID", () => {
    // Find the button by ID and click it
    cy.get("#idExample").click();
    // Verify the page URL or any other element to ensure the click was successful
    cy.url().should("include", "/button-success");
    cy.go("back");
    cy.get('a[href="../link-success/"]') // Select the <a> tag with the specific href
      .click(); // Click the link
    cy.url().should("include", "/link-success");
  });

  it("Clicks button using Class Name", () => {
    // Find the button by its class and click it
    cy.get(".buttonClass").click();
    // Verify the page URL or any other element to ensure the click was successful
    cy.url().should("include", "/button-success");
  });

  it("Clicks button using Name attribute", () => {
    // Find the button by its name attribute and click it
    cy.get('button[name="button1"]').click();
    // Verify the page URL or any other element to ensure the click was successful
    cy.url().should("include", "/button-success");
  });
});

describe("2. Simple and Link Test", () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });
  it("Simple Controls - Click Button", () => {
    // Click the "Click Me" button
    cy.get('a.et_pb_button.et_pb_promo_button[href="/button-success"]').click();
    cy.url().should("include", "/button-success"); 
  });
 
    it('Link - Click "Click this link" and verify redirection', () => {
      cy.get("#simpleElementsLink") // Select the <a> tag using its id
        .click(); // Click the link
      cy.url().should("include", "/link-success");
      cy.go("back");
      // Click the clickable icon link
      cy.get(".et-waypoint").click();
      cy.url().should("include", "/link-success");
    });
  });
 

  describe("3 Common Scenarios Test", () => {
    beforeEach(() => {
      cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
    });
    it('Common Scenarios - Click "Go to login page" button', () => {
      // Click the "Go to login page" button in Common Scenarios
      cy.get("div.et_pb_button_wrapper a.et_pb_button.et_pb_promo_button")
        .contains("Go to login page") // Target the button with the text "Go to login page"
        .click(); // Click it
      
      // Wait for the navigation (optional, only if needed, for example, on slow navigation)
      cy.url().should("include", "/users/sign_in");  // Ensure the URL includes '/users/sign_in'
      
      // Now, verify elements on the login page
      cy.get("article.sign-in__form h2.page__heading")
        .should("include.text", "Welcome Back!"); // Verify the heading text on the login page
    });
    
  });
