context('Demo.guru99 site-- Radio Buttons and Checkboxes', () => {
  it('Tests Single Radio Buttons and Checkboxes', () => {
      cy.visit('https://demo.guru99.com/test/radio.html');

      // Test Single Radio Buttons
      cy.get('input[type="radio"]').each(($radio) => { 
          cy.wrap($radio).check().should('be.checked');
      });
 
      cy.get('input[type="radio"]:checked').should('exist');
      cy.get('input[type="checkbox"]').first().check().should('be.checked');
      cy.get('input[type="checkbox"]').first().should('be.checked');
      cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked');
      cy.get('input[type="checkbox"]').check().should('be.checked');
      cy.get('input[type="checkbox"]').each(($checkbox) => {
          cy.wrap($checkbox).should('be.checked');
      });
      cy.get('input[type="checkbox"]').uncheck().should('not.be.checked');
  });
});
