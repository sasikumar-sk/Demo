describe('Navigation Test - Flipkart Seller to Shopsy and Start Selling Page', () => {
    it('Navigates to Shopsy and Start Selling page', () => {
        cy.visit('https://seller.flipkart.com/');
        cy.viewport(1200, 850)
        //Navigate to shopsy page
        cy.contains('Flipkart Seller Hub').should('be.visible');
        cy.get('ul.sd-header-list-container li#Shopsy a.sd-header-link').click();
        cy.url().should('include', '/shopsy');  
        cy.contains('Start selling on Shopsy today').should('be.visible');
        cy.go('back');
        cy.url().should('include', 'seller.flipkart.com');
        cy.contains('14 Lakh+Seller community').should('be.visible');
          //Navigate to sell-online page
        cy.get("ul[class='sd-header-list-container clearfix'] li[id='Sell Online'] a[class='sd-header-link']").click();
        cy.url().should('include', '/sell-online'); 
        cy.contains('Sell Online with Flipkart').should('be.visible'); 
        cy.go('back');
        cy.url().should('include', 'seller.flipkart.com');
        cy.contains('Why do sellers love selling on ️Flipkart?').should('be.visible');
       
    });
});
