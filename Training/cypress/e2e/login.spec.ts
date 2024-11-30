describe('OrangeHRM Login Test', () => {
    it('Should log in with valid credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').type('Admin').should('have.value', 'Admin');
      cy.get('input[name="password"]').type('admin123').should('have.value', 'admin123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', 'dashboard');
      cy.get('h6').should('contain.text', 'Dashboard');
    });
  });
  