describe('Flipkart Login Test', () => {
  it('should log in with dummy credentials', () => {
    cy.visit('https://www.flipkart.com/');
    cy.get('._1jKL3b').click();  
 
   
  });
});
