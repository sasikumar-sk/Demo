describe('JavaScript Alerts, Confirmations, and Prompts - Validate Result Text', () => {
    beforeEach(() => { 
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    });

    it('Validates text for JavaScript Alert', () => {
        cy.contains('Click for JS Alert').click();
        // Automatically accept the alert
        cy.on('window:alert', (text) => {
            expect(text).to.eq('I am a JS Alert');  
        });
        // Verify the "Result:" text
        cy.get('#result').should('contain', 'You successfully clicked an alert');
    });

    it('Validates text for JavaScript Confirm (OK)', () => {
        // Click the button to trigger a confirmation alert
        cy.contains('Click for JS Confirm').click();

        // Automatically click "OK" on the confirm dialog
        cy.on('window:confirm', (text) => {
            expect(text).to.eq('I am a JS Confirm');  
            return true;
        });
        // Verify the "Result:" text
        cy.get('#result').should('contain', 'You clicked: Ok');
    });

    it('Validates text for JavaScript Confirm (Cancel)', () => {
        // Click the button to trigger a confirmation alert
        cy.contains('Click for JS Confirm').click();

        // Automatically click "Cancel" on the confirm dialog
        cy.on('window:confirm', (text) => {
            expect(text).to.eq('I am a JS Confirm');  
            return false;  
        });
        cy.get('#result').should('contain', 'You clicked: Cancel');
    });

    it('Validates text for JavaScript Prompt (OK with input)', () => {
        // Trigger the prompt and provide a custom value
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Cypress Test'); 
            cy.contains('Click for JS Prompt').click();
        });
        // Verify the "Result:" text
        cy.get('#result').should('contain', 'You entered: Cypress Test');
    });

    it('Validates text for JavaScript Prompt (Cancel)', () => {
        // Trigger the prompt and simulate "Cancel"
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(null);  
            cy.contains('Click for JS Prompt').click();
        });

        cy.get('#result').should('contain', 'You entered: null');
    });
});
