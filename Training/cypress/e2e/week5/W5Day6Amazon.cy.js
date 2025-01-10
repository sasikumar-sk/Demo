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

  it("Search Headphones,Laptop", function () {
    cy.visit("https://www.amazon.in/");
    cy.url().should("include", "amazon");
    cy.get("#twotabsearchtextbox").type("Headphones");
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

    //'Validate cart item details'
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
    cy.reload();
    cy.wait(1000);
    
    // Click on the cart link
    cy.get('#nav-cart').click();  // Click the cart link 
  
    cy.get('#sc-subtotal-amount-activecart > .a-size-medium')
      .should('contain.text', '₹679.00'); // Verify the price
    cy.get("span[data-a-selector='value']")
      .should('contain.text', '1');
    cy.get('li.sc-product-variation')
      .find('span.a-size-small')
      .contains('XL')
      .should('be.visible');
    // Validate quantity
    cy.get('.sc-quantity-stepper')
      .find('div[role="spinbutton"]')
      .should('have.text', '1');

    // Click the 'Increment quantity' button with data-action="a-stepper-increment"
    cy.get('[data-action="a-stepper-increment"]')
      .click();

    cy.get('#sc-subtotal-amount-activecart')
      .find('.a-size-medium.a-color-base.sc-price.sc-white-space-nowrap')
      .should('have.text', '₹1,358.00');

    // Click the 'Decrease quantity by one' button
    cy.get('[aria-label="Decrease quantity by one"]')
      .click();
    cy.get('#sc-subtotal-amount-activecart > .a-size-medium')
      .should('contain.text', '₹679.00');


    // Validate "Delete" item from the cart selection
    cy.get('[aria-label="Decrease quantity by one"] > .a-icon').click();
    cy.get('#sc-subtotal-label-activecart')
      .should('contain.text', 'Subtotal (0 items):');
  });

});
