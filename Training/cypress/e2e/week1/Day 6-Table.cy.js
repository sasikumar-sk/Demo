describe('Fixed Fee Table Validation on Flipkart Seller Page', () => {
  before(() => { 
    cy.visit('https://seller.flipkart.com/fees-and-commission#paymentCycle');
  });

  it('should verify the table headers', () => { 
    cy.get('.styles__TableHeaderCell-sc-1d66s2n-2').eq(0)
      .should('have.text', 'Darwin tier'); // First header
    cy.get('.styles__TableHeaderCell-sc-1d66s2n-2').eq(1)
      .should('have.text', 'Non FBF');    // Second header
    cy.get('.styles__TableHeaderCell-sc-1d66s2n-2').eq(2)
      .should('have.text', 'FBF ');        // Third header 
    // Validate the first row  
    cy.get('.styles__TableDataRow-sc-1d66s2n-4').eq(0).within(() => {
      cy.get('td').eq(0).should('have.text', 'Platinum');  
      cy.get('td').eq(1).should('have.text', '63');        
      cy.get('td').eq(2).should('have.text', '55');        
    });

    // Validate the second row 
    cy.get('.styles__TableDataRow-sc-1d66s2n-4').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Gold');    
      cy.get('td').eq(1).should('have.text', '65');        
      cy.get('td').eq(2).should('have.text', '57');        
    });

    // Validate the third row  
    cy.get('.styles__TableDataRow-sc-1d66s2n-4').eq(2).within(() => {
      cy.get('td').eq(0).should('have.text', 'Silver');   
      cy.get('td').eq(1).should('have.text', '69');       
      cy.get('td').eq(2).should('have.text', '61');       
    });

    // Validate the fourth row 
    cy.get('.styles__TableDataRow-sc-1d66s2n-4').eq(3).within(() => {
      cy.get('td').eq(0).should('have.text', 'Bronze');    
      cy.get('td').eq(1).should('have.text', '69');       
      cy.get('td').eq(2).should('have.text', '61');       
    });
  });
});
