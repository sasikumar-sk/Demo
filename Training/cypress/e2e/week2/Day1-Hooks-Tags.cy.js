describe('Magento "What Is New" Page', () => {

    // Run this once before all tests
    before(() => {
      cy.log('Visiting "What Is New" page');
      cy.visit('https://magento.softwaretestingboard.com/what-is-new.html', { timeout: 10000 });
    });
  
    // Hook that runs before each test
    beforeEach(() => {
      cy.clearCookies();  
      cy.clearLocalStorage();  
      cy.visit('https://magento.softwaretestingboard.com/what-is-new.html', { timeout: 10000 });
      cy.wait(5000);
      // Check that the URL and title are correct after loading
      cy.url().should('include', 'what-is-new');
      cy.title().should('include', "What's New");
  
      // Ensure that the products are visible
      cy.get('.products-grid').should('be.visible');
    });
  
    it('should have the correct title', () => {
      cy.title().should('include', "What's New");
    });
  
    it('should display products', () => {
      cy.get('.products-grid .product-item').should('have.length.greaterThan', 0);
    });
  
    it('should navigate to product details when clicking on a product', () => {
      cy.get('.products-grid .product-item').first().click();
      cy.url().should('include', 'wayfarer-messenger-bag.html'); 
    });
  
    // After each test
    afterEach(() => {
      cy.clearCookies();  
      cy.clearLocalStorage();  
    });
  
    // After all tests
    after(() => {
      cy.log('All tests complete');
    });
  });
  