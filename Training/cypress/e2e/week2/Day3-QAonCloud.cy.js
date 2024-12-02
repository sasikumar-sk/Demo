describe('QAonCloud Home Page - All Sections', () => {
  it('should validate all sections on the home page', () => { 
    cy.visit('https://www.qaoncloud.com/'); 
    cy.get('.what-offers')  
      .should('be.visible')
      .and('contain.text', 'Our Services');  
    cy.get('.quality-software')  
      .should('be.visible')
      .and('contain.text', 'We Love To Help');   
    cy.get('.why-qaoncloud')  
      .should('be.visible')
      .and('contain.text', 'Why Choose Us');   
    cy.get('.how-it-works')  
      .should('be.visible')
      .and('contain.text', 'How Our Process Works');  
 
    cy.get('.how-we-help')  
      .should('be.visible')
      .and('contain.text', 'Our Assistance');   
    cy.get('.key-milestones')  
      .should('be.visible')
      .and('contain.text', 'Milestones');  
    cy.get('.blogs-resources')  
      .should('be.visible')
      .and('contain.text', 'Latest Articles');  
    cy.get('footer') 
      .should('be.visible')
      .and('contain.text', 'Copyright');  
  });
});
