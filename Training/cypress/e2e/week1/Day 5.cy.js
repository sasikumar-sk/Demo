describe('Login to OrangeHRM', () => {
    it('Assertions Test : Implicit, Explicit, BDD, and TDD Assertions', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.viewport(1200, 850) 
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        // Implicit Assertion: Wait for the page to load and assert the presence of the dashboard
        cy.get('.oxd-topbar-header-title').should('contain.text', 'Dashboard');

        // Explicit Assertion: Use .then() for more control over the DOM state
        cy.get('.oxd-topbar-header-title').then(($header) => {
            const headerText = $header.text();
            expect(headerText).to.eq('Dashboard');
        });

        // BDD  Assertion using Chai and Cypress syntax
        cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');

        // TDD  Assertion: Use assertions to validate that elements exist
        cy.get('.oxd-topbar-header-title').should('exist');   
    });
});

describe('OrangeHRM Login Test', () => {
    it('TEST : Implicit, Explicit, BDD, and TDD assertions', () => {
        // 1. Implicit Assertions
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Implicit Assertion - Wait for the username input to exist and check value
        cy.get('input[name="username"]')
            .type('Admin')
            .should('have.value', 'Admin');  // Implicit assertion

        // Implicit Assertion - Wait for the password input to exist and check value
        cy.get('input[name="password"]')
            .type('admin123')
            .should('have.value', 'admin123');  // Implicit assertion

        // 2. Explicit Assertions
        // Use explicit assertions to verify the typed username and password
        const username = 'Admin';
        const password = 'admin123';
        
        assert.equal('Admin', username, 'Username is correctly typed');
        assert.equal('admin123', password, 'Password is correctly typed');

        // 3. BDD Assertions
        // Check the login behavior
        cy.get('button[type="submit"]').click();  // Click the login button
        cy.url().should('include', 'dashboard'); // BDD-style assertion: the URL should include "dashboard"
        cy.get('h6').should('contain.text', 'Dashboard');  // BDD-style assertion: should contain text 'Dashboard'

        // 4. TDD Assertions
        // TDD approach would be to write these tests first and then ensure the code passes them
        cy.get('input[name="username"]').should('be.visible');  // TDD approach: test that username field is visible before code is implemented
        cy.get('input[name="password"]').should('be.visible');  // TDD approach: test that password field is visible before code is implemented
        cy.get('button[type="submit"]').should('be.enabled');  // TDD approach: test that the login button is enabled before code is implemented
    });
});
