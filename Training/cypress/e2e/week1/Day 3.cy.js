describe('WebDriverUniversity - Dropdowns, Radio Buttons, and Checkboxes', () => {
    const url = 'https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html';

    beforeEach(() => {
        // Visit the WebDriverUniversity page
        cy.visit(url);
    });

    context('Dropdowns', () => {
        it('Tests Single Select Dropdown', () => {
            // Select an option from the single select dropdown
            cy.get('#dropdowm-menu-1')
                .select('C#')
                .should('have.value', 'c#'); // Verify selected value
            cy.get('#dropdowm-menu-2')
                .select('JUnit')
                .should('have.value', 'junit'); // Verify selected value
            cy.get('#dropdowm-menu-3')
                .select('CSS')
                .should('have.value', 'css'); // Verify selected value
        });

        it('Tests Multi-Select Dropdown', () => { 

            // Verify select functionality
            cy.get('#dropdowm-menu-3')
                .select(['CSS'])
                .then((options) => {
                    // Verify selected options
                    expect(options[0].value).to.equal('css'); 
                });
        });
    });

    context('Radio Buttons', () => {
        it('Tests Radio Buttons Selection', () => {
            // Select each radio button and verify selection
            cy.get('input[type="radio"]').each(($radio) => {
                // Only interact with radio buttons that are not disabled
                if (!$radio.prop('disabled')) {
                    cy.wrap($radio).check().should('be.checked');
                } else {
                    // Log or assert that the radio button is disabled
                    cy.wrap($radio).should('be.disabled');
                }
            });
        });
    });
    
    context('Checkboxes', () => {
        it('Tests Single Select Checkbox', () => {
            // Adjust the selector to match the actual DOM structure
            cy.get('input[type="checkbox"]').first().should('exist').and('be.visible').check().should('be.checked');
            
            // Uncheck the same checkbox and verify
            cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked');
        });
    
        it('Tests Multi-Select Checkboxes', () => {
            // Check all checkboxes
            cy.get('input[type="checkbox"]').check().should('be.checked');
            
            // Uncheck all checkboxes
            cy.get('input[type="checkbox"]').uncheck().should('not.be.checked');
        });
    });
});
