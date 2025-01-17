describe('Qaoncloud website', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Header', () => {
    cy.viewport(1524, 768);
    cy.visit('https://www.qaoncloud.com/');
    cy.wait(5000);
    // Title validation
    cy.title().should("be.eq", "QA Testing Services | Software Testing Services - QAonCloud");

    // Header Logo and Banner Validations
    cy.get("img[title='QAonCloud Logo']").should('be.visible'); // Logo
    cy.get(".hs-poly-svg[viewBox='0 0 1920 1080']").should('be.visible'); // Initial Banner Image

    // Validate the SERVICES section
    cy.get('.elementor-element-515eabd > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should("have.text", "SERVICES");
    cy.get('#rect-5447').click();
    cy.url().should('include', '/functional-testing-services');  // Validate navigation URL after clicking
    cy.go('back');


    // Validate the SOLUTIONS section
    cy.get('.elementor-element-7714daf > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should('have.text', 'SOLUTIONS');
    cy.get('#rect-9608').click();
    cy.url().should('include', '/mobile-app-testing-services');
    cy.go('back');

    // Validate INDUSTRIES SERVED section
    cy.get('.main-heading').should('have.text', 'Industries Served');
    cy.get('.elementor-element-5447bdde > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .ot-button > .octf-btn').click(); // View More
    cy.url().should('include', '/ai-testing-services');
    cy.go('back');

    // Banner Section
    cy.get('.elementor-element-717394c > .elementor-background-overlay').should('be.visible');

    // Validate Build Your Own App Section
    cy.get('.elementor-element-3cd64ed > .elementor-container').should('be.visible');

    // "We Love To Help Craft Quality Software" Section
    cy.get('.elementor-element-e98bb3e > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should('have.text', 'We Love To Help Craft Quality Software');

    // Validate "Want To Know More About QAonCloud?" Section
    cy.get('.elementor-element-330048a > .elementor-widget-container > .elementor-heading-title').should('have.text', 'Want To Know More About QAonCloud?');
    cy.get('.elementor-element-e1d6dff > .elementor-widget-container > .ot-button > .octf-btn').should('be.visible').click(); // Talk to an expert
    cy.url().should('include', '/contact');

    // Validate Dropdown Navigation
    cy.get('#navbarDropdown1').click(); // Services
    cy.get('#navbarDropdown2').click(); // Solutions
    cy.get('#navbarDropdown3').click(); // Industries
    cy.get('#navbarDropdown4').click(); // Insights
    cy.get(':nth-child(4) > .dropdown-menu > :nth-child(1) > ul > :nth-child(1) > .dropdown-item').click().go('back'); // Blogs
    cy.get('#navbarDropdown4').click().get(':nth-child(4) > .dropdown-menu > :nth-child(1) > ul > :nth-child(2) > .dropdown-item').should('be.visible'); // Case Studies

    // Footer Validation
    cy.get('form > textarea.form-control').should('be.visible'); // Contact form visible
    cy.get(':nth-child(1) > .footer-list > .text-center').should('be.visible'); // Company section visible
    cy.get('.footer > .container > .row > :nth-child(1)').should('be.visible'); // Details below company visible
    cy.get(':nth-child(2) > .footer-list > .text-center').should('be.visible'); // Quick links visible
    cy.get('.footer > .container > .row > :nth-child(2)').should('be.visible'); // Details below Quick links visible
    cy.get(':nth-child(3) > .footer-list > .text-center').should('be.visible'); // Support visible
    cy.get('.container > .row > :nth-child(3)').should('be.visible'); // Details below Support visible
    cy.get(':nth-child(4) > .footer-list > .text-center').should('be.visible'); // Policies visible
    cy.get('.container > .row > :nth-child(4)').should('be.visible'); // Details below Policies visible

    // Check for Broken Links in Footer (Updated to handle missing href)
    cy.get('footer a').each(($el) => {
      const href = $el.attr('href');
      if (href) {
        cy.wrap($el).should('have.attr', 'href').and('not.include', '#');
      } else {
        cy.wrap($el).should('not.have.attr', 'href'); // Ensure links without href are handled properly
      }
    });

  });

})
