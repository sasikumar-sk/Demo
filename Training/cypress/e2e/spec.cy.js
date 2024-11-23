describe('E2E Testing of OpenCart Demo Website', () => {
  beforeEach(() => {
    // Visit the OpenCart demo website
    cy.visit('https://demo.opencart.com/');
  });

  it('Searches for a product and adds it to the cart', () => {
    // Search for a product
    cy.get('input[placeholder="Search"]').type('MacBook');
    cy.get('button[type="button"][class*="btn-primary"]').click(); // Updated selector

    // Verify search results
    cy.get('.product-thumb').should('contain', 'MacBook');
    cy.get('.btn.btn-light.btn-lg').click();

    // Add the product to the cart
    cy.get('.product-thumb')
      .contains('MacBook')
      .parents('.product-thumb')
      .find('button[onclick*="cart.add"]')
      .click();

    // Verify product added to the cart
    cy.get('.alert').should('contain', 'Success: You have added MacBook to your shopping cart!');
  });

  it('Proceeds to checkout from the cart', () => {
    // Add a product to the cart first
    cy.get('input[placeholder="Search"]').type('MacBook');
    cy.get('button[type="button"][class*="btn-primary"]').click(); // Updated selector
    cy.get('.product-thumb')
      .contains('MacBook')
      .parents('.product-thumb')
      .find('button[onclick*="cart.add"]')
      .click();

    // Open the cart
    cy.get('#cart').click();

    // Proceed to checkout
    cy.get('strong').contains('Checkout').click();

    // Verify checkout page
    cy.url().should('include', '/index.php?route=checkout/checkout');
  });

  it('Navigates through categories and views a product', () => {
    // Navigate to a category (Desktops > Mac)
    cy.get('a').contains('Desktops').click();
    cy.get('a').contains('Mac').click(); // Updated selector

    // Verify category page
    cy.get('.breadcrumb').should('contain', 'Mac');

    // Click on the product
    cy.get('.product-thumb').contains('iMac').click();

    // Verify product details page
    cy.get('h1').should('contain', 'iMac');
  });
});
