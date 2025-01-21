//Test the search functionality in Amazon
//Add one Product to the cart and validate the cart item details
//Validate the quantity of the product in the cart
//Validate the price of the product in the cart when increase and Decrease the quantity
//Delete the product from the cart and validate the cart item details

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("amazon", function () {
  before(() => {
    cy.session("amazon-login", () => {
      cy.visit("https://www.amazon.in/");
      cy.get("#nav-link-accountList").should("be.visible").click("center");
      cy.wait(1000);
      cy.get("#ap_email").should("be.visible").type("9842603347");
      cy.get("#continue").should("be.visible").click("center");
      cy.get("#ap_password").clear();
      cy.get("#ap_password").should("be.visible").type("sasi*123.");
      cy.get("#signInSubmit").click({ force: true });

      cy.get("#nav-link-accountList").should("contain", "Hello, Sasikuma");
    });
  });

  it("Search Headphones,Laptop", function () {
    cy.visit("https://www.amazon.in/");
    cy.url().should("include", "amazon");
    /*  cy.get("#twotabsearchtextbox").type("Headphones");
    cy.get("#nav-search-submit-button").click();
    cy.get('.sg-col-14-of-20 > .sg-col-inner > .a-size-base')
      .should('be.visible')
      .should('include.text', '1-16 of')
      .and('include.text', 'results for "Headphones"');

    cy.go(-1);
    cy.get("#twotabsearchtextbox").type("Laptop");
    cy.get("#nav-search-submit-button").click();
    cy.get('h2.a-size-base.a-spacing-small.a-spacing-top-small.a-text-normal')
      .should('be.visible')
      .and('include.text', '1-16 of')
      .and('include.text', 'results for "Laptop"');
    cy.go(-1);
*/
    //'Validate cart item details'
    //select the dropdown >> select computers
    cy.get(".nav-search-scope").click();
    cy.get("#searchDropdownBox").select("search-alias=computers", {
      force: true,
    });
    cy.get("#twotabsearchtextbox").type(
      "Foundations of Software Testing: ISTQB Certification"
    );
    cy.get("#nav-search-submit-button").click();
    cy.get(".a-color-state").should(
      "contain.text",
      '"Foundations of Software Testing: ISTQB Certification"'
    );
    // Add item to the cart
    cy.get("#a-autoid-1-announce").click();
    cy.wait(2000);
    // Click on the cart link
    cy.get("#nav-cart").click(); // Click the cart link
    cy.wait(2000);
    cy.get("#sc-subtotal-amount-activecart > .a-size-medium").should(
      "contain.text",
      "₹500"
    ); // Verify the price
    cy.get("span[data-a-selector='value']").should("contain.text", "1");
    // Validate quantity
    cy.get(".sc-quantity-stepper")
      .find('div[role="spinbutton"]')
      .should("have.text", "1");

    /*// Click the 'Increment quantity' button with data-action="a-stepper-increment"
    cy.get('[aria-label="Increase quantity by one"]').click();

    cy.get("#sc-subtotal-amount-activecart > .a-size-medium").should(
      "have.text",
      "₹1,39,980.00"
    );

    // Click the 'Decrease quantity by one' button
    cy.get('[aria-label="Decrease quantity by one"]').click();
    cy.get("#sc-subtotal-amount-activecart > .a-size-medium").should(
      "contain.text",
      "₹500.00"
    );*/

    // Validate "Delete" item from the cart selection
    cy.get('[name="sc-quantity"] > [aria-label="Delete Foundations of Software Testing: ISTQB Certification"]').click();
    cy.get("#sc-subtotal-label-activecart").should(
      "contain.text","Subtotal (0 items):"
    );
  });
});
