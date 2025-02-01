describe('eBay Shopping Flow', () => {

  // Test 1: Test Password was incorrect error when entering the invalid password
  it('should show error when entering invalid password', () => {
    cy.visit('https://www.ebay.com/signin');
    
    cy.get('#userid').type('qa_Master123@protonmail.com');
    cy.get('[data-testid="signin-continue-btn"]').click();
    cy.get('#pass').type('wrongPassword123');
    cy.get('#sgnBt').click();
    
    cy.get('#signin-error-msg').should('contain', 'This password is incorrect. Try again or reset password.');
  });

  // Test 2: Click 'All Categories' selector, choose Books, check title 'Books & Magazines'
  it('should select Books category and verify title', () => {
    cy.visit('https://www.ebay.com/');
    cy.get('#userid').type('qa_Master123@protonmail.com');
    cy.get('[data-testid="signin-continue-btn"]').click();
    cy.get('#pass').type('qa1@protonmail.com');
    cy.get('#sgnBt').click();

    cy.get('#gh-shop-a').click();  // Click All Categories
    cy.contains('Books').click(); // Select 'Books'

    cy.get('h1').should('contain', 'Books & Magazines');
  });

  // Test 3: Search for 'Na.Muthukumar Kavithaigal by Muthukumar', click on the result, check new tab details
  it('should search for "Na.Muthukumar Kavithaigal by Muthukumar" and check details in new tab', () => {
    cy.visit('https://www.ebay.com/');
    
    cy.get('#gh-ac').type('Na.Muthukumar Kavithaigal by Muthukumar');  // Search term
    cy.get('#gh-btn').click();  // Click search
    
    cy.contains('Na.Muthukumar Kavithaigal by Muthukumar').should('be.visible')
      .click();  // Click the link from search result
    
    // Handle new tab
    cy.window().then((win) => {
      const newTab = win.open('', '_blank');
      cy.wrap(newTab.document).should('exist'); // Ensure new tab exists
      
      // Verify details in the new tab (could be specific to the page you're targeting)
      cy.get('h1').should('contain', 'Na.Muthukumar Kavithaigal by Muthukumar'); // Check page title
      
      // Switch to the original tab (if needed, as per Cypress documentation)
      cy.window().then((win) => win.close());  // Close the new tab
    });
    
    // Back to search results breadcrumb and click Books
    cy.get('.breadcrumb').contains('Books, Movies & Music').click();
    cy.get('.category-header').contains('Books & Magazines').click();
    
    // Add to cart
    cy.contains('Add to cart').click();
    
    // Verify Shopping Cart page details
    cy.get('.cart-subtotal').should('contain', 'AU $51.76');
    cy.get('.checkout-btn').click();  // Click Go to checkout
  });

  // Test 4: Update quantity to 3 and check the updated subtotal
  it('should update the quantity to 3 and verify the amount', () => {
    cy.visit('https://www.ebay.com/cart');
    
    cy.get('select[name="quantity"]').select('3');  // Change quantity to 3
    cy.get('.cart-subtotal').should('contain', 'AU $155.28'); // Verify updated subtotal
  });

  // Test 5: Add shipping address and verify
  it('should fill shipping details and proceed', () => {
    cy.visit('https://www.ebay.com/checkout');
    
    // Fill in shipping address details
    cy.get('#ship-to-name').type('fas haer');
    cy.get('#ship-to-address1').type('test, test');
    cy.get('#ship-to-address2').type('test, LD 469787');
    cy.get('#ship-to-country').select('India');
    cy.get('#ship-to-phone').type('9842603347');
    
    // Confirm details or click next
    cy.get('.next-btn').click();
  });

  // Test 6: Remove item from Shopping Cart
  it('should remove item from Shopping Cart and verify', () => {
    cy.visit('https://www.ebay.com/cart');

    // Verify cart has items before removing
    cy.get('.cart-item').should('have.length.greaterThan', 0);
    
    // Click "Remove" button for the item
    cy.get('.cart-item').first().find('.cart-remove').click();

    // Verify the item was removed
    cy.get('.cart-item').should('have.length', 0);  // Verify no items left in cart
  });

});
