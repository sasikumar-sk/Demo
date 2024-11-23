describe('WebDriverUniversity - Dropdowns, Radio Buttons, and Checkboxes', () => {
    const url = 'https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html';
  
    before(() => {
      // Visit the WebDriverUniversity page
      cy.visit(url);
    });
  
    context('Dropdowns', () => {
      it('Tests Single Select Dropdown', () => {
        // Select an option from the single select dropdown
        cy.get('#dropdowm-menu-1')
          .select('C#')
          .should('have.value', 'c#'); // Verify selected value
      });
  
      it('Tests Multi-Select Dropdown', () => {
        // Verify multi-select functionality
        cy.get('#dropdowm-menu-3')
          .select(['CSS', 'JavaScript'])
          .then((options) => {
            // Verify selected options
            expect(options[0].value).to.equal('css');
            expect(options[1].value).to.equal('javascript');
          });
      });
    });
  
    context('Radio Buttons', () => {
      it('Tests Radio Buttons Selection', () => {
        // Select each radio button and verify selection
        cy.get('input[type="radio"]').each(($radio) => {
          cy.wrap($radio).check().should('be.checked');
        });
      });
    });
  
    context('Checkboxes', () => {
      it('Tests Single Select Checkbox', () => {
        // Check and uncheck the first checkbox
        cy.get('#checkboxes > input[type="checkbox"]').first().check().should('be.checked');
        cy.get('#checkboxes > input[type="checkbox"]').first().uncheck().should('not.be.checked');
      });
  
      it('Tests Multi-Select Checkboxes', () => {
        // Check all checkboxes
        cy.get('#checkboxes > input[type="checkbox"]').check().should('be.checked');
        // Uncheck all checkboxes
        cy.get('#checkboxes > input[type="checkbox"]').uncheck().should('not.be.checked');
      });
    });
  });
  