context('Dropdowns, Radio Buttons, and Checkboxes', () => {
    it('Tests Dropdowns, Radio Buttons, and Checkboxes', () => {
        // Visit the page
        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

        // Test Dropdown - Single Select
        cy.get('#dropdowm-menu-1').select('C#').should('have.value', 'c#');
        cy.get('#dropdowm-menu-1').should('have.value', 'c#');
        

        // Test Dropdown - Multi Select
        cy.get('#dropdowm-menu-2').select(['JUnit']).then(() => {
            cy.get('#dropdowm-menu-2 option:selected').should(($selected) => {
                const values = $selected.map((_, el) => Cypress.$(el).val()).get();
                expect(values).to.deep.eq(['junit']);
            });
        });

        // Test Radio Buttons
        cy.get('input[type="radio"]').each(($radio) => {
            // Only select enabled radio buttons
            if (!$radio.prop('disabled')) { 
                cy.get('[value="yellow"]').check().should('be.checked');
            }
        });
        cy.get('input[type="radio"]:checked').should('exist');

        // Test Checkboxes - Single Select
        cy.get('#checkboxes > :nth-child(1) > input').first().check().should('be.checked');
        cy.get('#checkboxes > :nth-child(1) > input').first().should('exist');

        // Test Checkboxes - Multi Select
        cy.get(':nth-child(5) > input').check().should('be.checked');
        cy.get(':nth-child(5) > input').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked');
        });
        // Test Selected & Disabled radio option
        cy.get("input[value='cabbage']").should('be.disabled');
        cy.get('[value="lettuce"]').check().should('be.checked');
    });
});
