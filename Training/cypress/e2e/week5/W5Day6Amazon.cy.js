Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("amazon", function () {

  before(() => {
    cy.session('amazon-login', () => {
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

  it.skip("title", function () {
    cy.visit("https://www.amazon.in/");
    cy.title().should(
      "eq",
      "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in"
    );
    cy.url().should("include", "amazon");
  });

  it("home page", function () {
    cy.visit("https://www.amazon.in/");
    cy.get("#nav-hamburger-menu").should("be.visible");
    cy.get("#nav-xshop > a:nth-child(2)").should("be.visible");
    cy.get("#nav-xshop > a:nth-child(3)").should("be.visible");
    cy.get("#nav-xshop > a:nth-child(4)").should("be.visible");
    cy.get("#nav-xshop > a:nth-child(5)").should("be.visible");
    cy.get("#nav-xshop > a:nth-child(6)").should("be.visible");
  });

  it.skip("Search", function () {
    cy.visit("https://www.amazon.in/");
    cy.url().should("include", "amazon");
    cy.get("#twotabsearchtextbox").type("Headphones");
    cy.get("#nav-search-submit-button").click();
    cy.go(-1);

    cy.get("#twotabsearchtextbox").type("Laptop");
    cy.get("#nav-search-submit-button").click();
    cy.go(-1);

  });

 
  it('should validate cart item details', function () {
    cy.visit("https://www.amazon.in/");

    //select the dropdown >> select alexa
    cy.get('.nav-search-scope')
      .click();
    cy.get('#searchDropdownBox')
      .select('search-alias=alexa-skills', { force: true });
    cy.get("#twotabsearchtextbox").type("polo t shirt");
    cy.get("#nav-search-submit-button").click();
    cy.get('.sg-col-14-of-20 > .sg-col-inner')
      .should('contain.text', '1-16 of over 30,000 results for "polo t shirt"');
     // Add item to the cart
cy.get('#a-autoid-1-announce').click();  // Click to add to cart
cy.wait(1000);
cy.get('.puis-atc-variation-element-B076CNJ1YN > .a-row > [data-cy="add-to-cart"] > .puis-atcb-add-container > .a-declarative > div > .a-button > .a-button-inner > .a-button-text').click();  // Confirm add to cart
cy.get('.a-changeover-inner').should('contain.text', 'Item Added');  // Verify the item is added
cy.wait(1000);

// Ensure the overlay is gone or close it
cy.get('.a-modal-scroller').should('not.exist');  // Wait for overlay to disappear (or close the modal if necessary)

// Click on the cart link
cy.get('#nav-cart').click();  // Click the cart link

    cy.get('.sc-product-title')
      .should('have.text', "Van Heusen Men's Regular Fit Polo T-Shirt");
      cy.get('#sc-subtotal-amount-activecart > .a-size-medium')
      .should('contain.text', '₹679.00');
    cy.get('.sc-badge-basis-price')
      .should('contain.text', 'M.R.P.: ₹1,799.00');
      cy.get('#sc-subtotal-label-activecart').should('contain.text', 'Subtotal (1 item)');
    // Validate quantity
    cy.get('.sc-quantity-stepper')
      .find('div[role="spinbutton"]')
      .should('have.text', '1');



    // Validate "Delete" button
    cy.get('[aria-label="Decrease quantity by one"] > .a-icon').click();
    cy.get('.sc-subtotal-text')
      .should('have.text', 'Subtotal (0 items): ₹0.00');
  });

});
