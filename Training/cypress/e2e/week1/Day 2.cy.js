describe('Magento Login Test with Various Locators', () => {

  it('should login successfully using By ID', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('#email').type('test21@gmail.com'); // By ID for email
    cy.get('#pass').type('test@gmail.com1'); // By ID for password
    cy.get('#send2').click(); // By ID for the login button
  });

  it('should login successfully using By Class', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('.input-text').eq(0).type('test21@gmail.com'); // By Class for email
    cy.get('.input-text').eq(1).type('test@gmail.com1'); // By Class for password
    cy.get('.action.login.primary').click(); // By Class for the login button
  });

  it('should login successfully using By Tag', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('input[type="email"]').type('test21@gmail.com'); // By Tag for email
    cy.get('input[type="password"]').type('test@gmail.com1'); // By Tag for password
    cy.get('button[type="submit"]').click(); // By Tag for the login button
  });

  it('should login successfully using By Attribute', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('input[name="login[username]"]').type('test21@gmail.com'); // By Attribute for email
    cy.get('input[name="login[password]"]').type('test@gmail.com1'); // By Attribute for password
    cy.get('button[type="submit"]').click(); // By Tag for the login button
  });

  it('should login successfully using By Contains', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('#email').type('test21@gmail.com'); // By ID for email
    cy.get('#pass').type('test@gmail.com1'); // By ID for password
    cy.contains('button', 'Sign In').click(); // By Contains for the login button
  });

  it('should login successfully using Custom Selector', () => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    cy.get('input[type="email"]').type('test21@gmail.com'); // Custom Selector for email
    cy.get('input[type="password"]').type('test@gmail.com1'); // Custom Selector for password
    cy.get('button[type="submit"]').click(); // By Tag for the login button
  });

});
