describe('Assertions Test ---opensource-demo.orangehrmlive', () => {
  
    // Implicit Assertions
    it('Implicit assertion-should login successfully with valid credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
  
      // Implicit assertion
      cy.url().should('include', '/dashboard');
      cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
    });
  
    // Explicit Assertions
    it('Explicit Assertions-should display error with invalid credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').type('invalidUser');
      cy.get('input[name="password"]').type('invalidPass');
      cy.get('button[type="submit"]').click();
  
      // Explicit assertion
      cy.get('.oxd-alert-content').then(($alert) => {
        expect($alert).to.contain('Invalid credentials');
      });
    });
  
    // BDD Assertion using should
    it('should have a visible login form', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // BDD assertion
      cy.get('form').should('be.visible');
      cy.get('input[name="username"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    // TDD Assertion using expect
    it('should have a proper title', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // TDD assertion
      cy.title().then((title) => {
        expect(title).to.equal('OrangeHRM');
      });
    });
  
    // Additional TDD Assertions
    it('should have a logo with alt text', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
      cy.get('img[alt="company-branding"]').then((logo) => {
        expect(logo).to.exist;
        expect(logo).to.have.attr('alt', 'company-branding');
      });
    });
   
    it('should have the correct page header text', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
      cy.get('.oxd-text.oxd-text--h5').then((header) => {
        expect(header).to.exist;
        expect(header).to.have.text('Login');
      });
    }); 
  });
  