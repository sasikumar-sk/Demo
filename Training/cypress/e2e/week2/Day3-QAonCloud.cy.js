describe('QAonCloud Home Page - All Sections', () => {
  it('should validate all sections on the home page', () => {
    // Visit the QAonCloud Home page
    cy.visit('https://www.qaoncloud.com/');
 
    // What QAonCloud Offers section
    cy.get('.what-offers') // Replace with the actual selector for this section
      .should('be.visible')
      .and('contain.text', 'Our Services'); // Adjust based on actual text

    // "We Love To Help Craft Quality Software" section
    cy.get('.quality-software') // Replace with the correct selector
      .should('be.visible')
      .and('contain.text', 'We Love To Help'); // Adjust based on actual text

    // Why QAonCloud section
    cy.get('.why-qaoncloud') // Replace with actual selector
      .should('be.visible')
      .and('contain.text', 'Why Choose Us'); // Adjust based on actual text

    // How It Works section
    cy.get('.how-it-works') // Replace with actual selector
      .should('be.visible')
      .and('contain.text', 'How Our Process Works'); // Adjust based on actual text

    // How We Help section
    cy.get('.how-we-help') // Replace with the actual selector
      .should('be.visible')
      .and('contain.text', 'Our Assistance'); // Adjust based on actual text

    // Key Milestones section
    cy.get('.key-milestones') // Replace with the actual selector
      .should('be.visible')
      .and('contain.text', 'Milestones'); // Adjust based on actual text

    // Blogs and Resources section
    cy.get('.blogs-resources') // Replace with the correct selector
      .should('be.visible')
      .and('contain.text', 'Latest Articles'); // Adjust based on actual content

    // Footer section
    cy.get('footer') // Ensure footer is visible
      .should('be.visible')
      .and('contain.text', 'Copyright'); // Adjust based on actual footer content
  });
});
