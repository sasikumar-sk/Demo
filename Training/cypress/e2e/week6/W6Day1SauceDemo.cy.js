//Check login and logout
//Add item to the cart complte the checkout 
//Check the filters got error when user error_user




describe('Adds product, Remove product and Logout Flow', () => {

  it("Proceeds through checkout and verifies all steps", () => { 
   
    cy.intercept('GET', '**/*.jpg', { statusCode: 200, body: {} }).as('images');
    cy.intercept('GET', '**/*.png', { statusCode: 200, body: {} }).as('images');
    cy.intercept('GET', '**/*.css', { statusCode: 200, body: '' }).as('css');  // Optionally block CSS
    cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' }).as('js'); // Optionally block JavaScript
    cy.visit("https://www.saucedemo.com/", {
      timeout: 60000, // Ensure that timeout is long enough
    });
    
      cy.get("#user-name").type("standard_user", { delay: 50 }); // Typing delay  
      cy.get("#password").type("secret_sauce", { delay: 50 });
      cy.get("#login-button").click();
      cy.url().should("include", "/inventory.html");
     

    // Add item to the cart
    cy.contains(".inventory_item_name", "Test.allTheThings() T-Shirt (Red)")
      .should("be.visible")
      .then(($product) => {
        cy.wrap($product)
          .closest(".inventory_item")
          .find(".btn_inventory")
          .click();
      });

    // Click on the cart and proceed to checkout
    cy.get("#shopping_cart_container").click();
    cy.contains("Test.allTheThings() T-Shirt (Red)").should("be.visible"); // Validate product in the cart
    cy.get("#checkout").click();

    // Checkout: Your Information - Validation without values
    cy.url().should("include", "/checkout-step-one.html");
    cy.get("#continue").click(); // Click continue without filling out form
    cy.get('[data-test="error"]').should(
      "contain",
      "Error: First Name is required"
    ); 

    // Checkout: Your Information - Fill in the details and continue
    cy.get("#first-name").type("John", { delay: 50 });
    cy.get("#last-name").type("Doe", { delay: 50 });
    cy.get("#postal-code").type("12345", { delay: 50 });
    cy.get("#continue").click();

    // Checkout: Overview - Validate information
    cy.url().should("include", "/checkout-step-two.html");

    // Validate Payment Information
    cy.get(".summary_value_label")
      .contains("SauceCard #31337")
      .should("be.visible");

    // Validate Shipping Information
    cy.contains("Free Pony Express Delivery!").should("be.visible");

    // Validate Price Information
    cy.get(".summary_info").within(() => {
      cy.contains("Item total: $15.99").should("be.visible");
      cy.contains("Tax: $1.28").should("be.visible");
      cy.contains("Total: $17.27").should("be.visible");
    });

    // Click Finish to complete the order
    cy.get("#finish").click();

    // Checkout Complete - Validate success message
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should(
      "contain","Thank you for your order!"
    );
    cy.get('[data-test="complete-text"]').should(
      "contain","Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );

    // Click "Back Home" to return to the inventory page
    cy.get("#back-to-products").click();
    cy.url().should("include", "/inventory.html");
  }); 





    it('Adds product to the cart, removes it, and logs out', () => { 
      cy.visit("https://www.saucedemo.com/", {
        timeout: 60000, // Increase the page load timeout to 60 seconds
        retryOnStatusCodeFailure: true, // Retry if the status code indicates failure
        waitForAnimations: false, // Skip waiting for animations 
      });
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
      
      //  Add Sauce Labs Backpack to the cart
      cy.contains('.inventory_item_name', 'Sauce Labs Backpack') 
      .should("be.visible")
      .then(($product) => {
        cy.wrap($product)
          .closest(".inventory_item")
          .find(".btn_inventory")
          .click();
      });
   
      // Go to the cart page
      cy.get('#shopping_cart_container').click();
      cy.url().should('include', '/cart.html');  
  
      // Remove Sauce Labs Backpack from the cart
      cy.get('[data-test="remove-sauce-labs-backpack"]').click(); 
  
      // Click Continue Shopping button
      cy.get('#continue-shopping').click();
      cy.url().should('include', '/inventory.html');  
      // Open the menu by clicking the hamburger menu button
      cy.get('#react-burger-menu-btn').click();
      
      // Logout // Ensure we're back at the login page
      cy.get('#logout_sidebar_link').click(); 
      cy.url().should('eq', 'https://www.saucedemo.com/'); 
      
    });
  });  
  
  describe('Login with different users', () => {
    const users = [
      { username: 'standard_user', password: 'secret_sauce' },
      { username: 'locked_out_user', password: 'secret_sauce' },
      { username: 'problem_user', password: 'secret_sauce' },
      { username: 'performance_glitch_user', password: 'secret_sauce' },
      { username: 'visual_user', password: 'secret_sauce' },
    ];
  
    // Test for general users
    users.forEach(user => {
      if (user.username !== 'error_user') { // Skip 'error_user' for this block
        it(`Logs in as ${user.username}`, () => {
          cy.visit('https://www.saucedemo.com/');
          cy.get('#user-name').type(user.username);
          cy.get('#password').type(user.password);
          cy.get('#login-button').click();  
          if (user.username === 'locked_out_user') {
            // Expect error message for locked out user
            cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
          } else { 
            cy.url().should('include', '/inventory.html');
          }
        });
      }
    });
  
    // Test for error_user to handle sorting issue 
    it('Logs in as error_user and verifies sorting error message and filter options', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('error_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('[data-test="product-sort-container"]').should('be.visible');
       
        cy.on('window:alert', (str) => {
          // Check if the alert message is the expected one
          expect(str).to.include('Sorting is broken! This error has been reported to Backtrace.');
        });
        // Sorting by Name (A to Z)
        cy.get('[data-test="product-sort-container"]').select('az');   
        cy.on('window:alert', (str) => {
            expect(str).to.include('Sorting is broken! This error has been reported to Backtrace.');
          });
        // Sorting by Name (Z to A)
        cy.get('[data-test="product-sort-container"]').select('za'); 
        cy.on('window:alert', (str) => {
            expect(str).to.include('Sorting is broken! This error has been reported to Backtrace.');
          });
        // Sorting by Price (low to high)
        cy.get('[data-test="product-sort-container"]').select('lohi');      
        cy.on('window:alert', (str) => { 
          expect(str).to.include('Sorting is broken! This error has been reported to Backtrace.');
        });
        // Sorting by Price (high to low)
        cy.get('[data-test="product-sort-container"]').select('hilo');
        cy.on('window:alert', (str) => { 
            expect(str).to.include('Sorting is broken! This error has been reported to Backtrace.');
          });
      });
    });


    describe(" Purchase 2 Products with Price Calculation", () => {
      beforeEach(() => {
        cy.visit("http://saucedemo.com");
      });
    
      it("Select products, add 2 items to cart, checkout and validate amount calculation", () => {
        // 1. Login with valid credentials
        cy.get('[data-test="username"]').type("standard_user");
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();
    
        // 2. Verify login was successful
        cy.url().should("include", "/inventory.html");
        cy.get(".title").should("have.text", "Products");
    
        // 3. Dynamically get the price of 'Sauce Labs Backpack' and 'Sauce Labs Bike Light'
        cy.get("body")
          .find("div.inventory_item")
          .eq(0) // Selects the first product (Sauce Labs Backpack)
          .find(".inventory_item_price")
          .invoke("text")
          .then((text1) => {
            const product1Price = parseFloat(text1.replace("$", "").trim()); // Extracts the price of Sauce Labs Backpack
            cy.log("Product 1 Price (Sauce Labs Backpack): $" + product1Price);
    
            cy.get("body")
              .find("div.inventory_item")
              .eq(1) // Selects the second product (Sauce Labs Bike Light)
              .find(".inventory_item_price")
              .invoke("text")
              .then((text2) => {
                const product2Price = parseFloat(text2.replace("$", "").trim()); // Extracts the price of Sauce Labs Bike Light
                cy.log("Product 2 Price (Sauce Labs Bike Light): $" + product2Price);
    
                // Calculate the item total and the final amount
                const itemTotal = product1Price + product2Price;
                cy.log("Item Total: $" + itemTotal.toFixed(2));
    
                const taxAmount = 3.2; // Adding tax  
                cy.log("Total taxAmount : $" + taxAmount.toFixed(2));
    
                const totalAmount = itemTotal + taxAmount;
    
                // Log the total amount
                cy.log("Total Amount (Including Tax): $" + totalAmount.toFixed(2));
    
                // Select 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' and add them to cart
                cy.contains("Sauce Labs Backpack")
                  .parents(".inventory_item")
                  .find("button")
                  .click(); // Add Backpack
                cy.contains("Sauce Labs Bike Light")
                  .parents(".inventory_item")
                  .find("button")
                  .click(); // Add Bike Light
    
                // Check if the cart icon has 2 items (Cart should have 2 products)
                cy.get(".shopping_cart_link").should("have.text", "2");
    
                //Click on the Cart icon to go to the checkout page
                cy.get(".shopping_cart_link").click();
    
                // Verify both products are in the cart
                cy.get(".cart_item").should("have.length", 2);
                cy.contains("Sauce Labs Backpack").should("be.visible");
                cy.contains("Sauce Labs Bike Light").should("be.visible");
    
                //Verify the item total in the cart
                cy.get('[data-test="inventory-item-price"]')
                  .eq(0) // For the first product (Sauce Labs Backpack)
                  .should("contain", `$${product1Price.toFixed(2)}`); // Use the dynamic product1Price
    
                cy.get('[data-test="inventory-item-price"]')
                  .eq(1) // For the second product (Sauce Labs Bike Light)
                  .should("contain", `$${product2Price.toFixed(2)}`); // Use the dynamic product2Price
    
                //Click on the 'Checkout' button
                cy.get('[data-test="checkout"]').click();
    
                // Enter checkout information
                cy.get('[data-test="firstName"]').type("John");
                cy.get('[data-test="lastName"]').type("Doe");
                cy.get('[data-test="postalCode"]').type("90210");
                cy.get('[data-test="continue"]').click();
    
                // Verify the price total and breakdown
                cy.get(".summary_subtotal_label").should("contain", `$${itemTotal.toFixed(2)}`); // Item total
                cy.get(".summary_tax_label").should("contain",`$${taxAmount.toFixed(2)}` ); // Tax
                cy.get(".summary_total_label").should("contain",`$${totalAmount.toFixed(2)}` );  
              });
          });
      });
    });
    