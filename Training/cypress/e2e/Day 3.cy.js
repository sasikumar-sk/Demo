describe('WebDriverUniversity site - Dropdowns, Radio Buttons, and Checkboxes', () => {
    it('Tests Dropdowns, Radio Buttons, and Checkboxes', () => {
        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        // Verify dropdowm functionality
        cy.get('#dropdowm-menu-1')
            .select('C#').should('have.value', 'c#'); 
        cy.get('#dropdowm-menu-2')
            .select('JUnit').should('have.value', 'junit'); 
        cy.get('#dropdowm-menu-3')
            .select('CSS').should('have.value', 'css'); 

        // Verify select functionality
        cy.get('#dropdowm-menu-3')
            .select(['JQuery'])
            .then((options) => {
                expect(options[0].value).to.equal('jquery');
            });

        // Verify checkboxes
        cy.get('#checkboxes > :nth-child(1) > input').first().should('exist').and('be.visible').check().should('be.checked');
        cy.get(':nth-child(5) > input').check().should('be.checked');
        cy.get(':nth-child(5) > input').uncheck().should('not.be.checked');
        // Select radio button and verify selection
        cy.get('input[type="radio"]').each(($radio) => {
            if (!$radio.prop('disabled')) {
                cy.wrap($radio).check().should('be.checked');
            } else {
                cy.wrap($radio).should('be.disabled');
            }
        });
    });

}); 