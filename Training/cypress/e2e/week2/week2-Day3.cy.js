describe('QAonCloud Home Page - Main Page Automation', () => {
  const url = 'https://www.qaoncloud.com/';

  before(() => {
  
    cy.visit(url);
  });

  it('Validates the Header Section', () => {
    // Check the logo is visible
    cy.get('header .logo').should('be.visible');
    // Validate navigation links in the header
    cy.get('header nav a').should('have.length.greaterThan', 0);
    cy.get('header nav a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
    });
  });

  it('Validates the Banner Section', () => {
    // Check the banner is visible
    cy.get('.banner').should('be.visible');
    // Validate banner title
    cy.get('.banner h1').should('be.visible').and('not.be.empty');
    // Validate banner description
    cy.get('.banner p').should('be.visible').and('not.be.empty');
    // Validate Call-to-Action buttons
    cy.get('.banner button').should('have.length.greaterThan', 0);
    cy.get('.banner button').each(($btn) => {
      cy.wrap($btn).should('be.visible').and('not.be.empty');
    });
  });

  it('Validates the "What QAonCloud Offers" Section', () => {
    // Scroll into view for visibility
    cy.get('section#services').scrollIntoView();
    // Check the section heading
    cy.get('section#services h2').should('contain.text', 'What QAonCloud Offers');
    // Validate each offering card
    cy.get('section#services .offer-card').each(($card) => {
      cy.wrap($card).find('h3').should('not.be.empty');
      cy.wrap($card).find('p').should('not.be.empty');
    });
  });

  it('Validates the "We Love To Help Craft Quality Software" Section', () => {
    // Scroll into view
    cy.get('section#craft-quality-software').scrollIntoView();
    // Check the heading
    cy.get('section#craft-quality-software h2').should(
      'contain.text',
      'We Love To Help Craft Quality Software'
    );
    // Validate paragraph text
    cy.get('section#craft-quality-software p').should('not.be.empty');
  });

  it('Validates the "Why QAonCloud" Section', () => {
    // Scroll into view
    cy.get('section#why-qaoncloud').scrollIntoView();
    // Check the heading
    cy.get('section#why-qaoncloud h2').should('contain.text', 'Why QAonCloud');
    // Validate each reason block
    cy.get('section#why-qaoncloud .reason-block').each(($block) => {
      cy.wrap($block).find('h3').should('not.be.empty');
      cy.wrap($block).find('p').should('not.be.empty');
    });
  });

  it('Validates the "How It Works" Section', () => {
    // Scroll into view
    cy.get('section#how-it-works').scrollIntoView();
    // Check the heading
    cy.get('section#how-it-works h2').should('contain.text', 'How It Works');
    // Validate each step
    cy.get('section#how-it-works .step').each(($step) => {
      cy.wrap($step).find('h3').should('not.be.empty');
      cy.wrap($step).find('p').should('not.be.empty');
    });
  });

  it('Validates the "How We Help" Section', () => {
    // Scroll into view
    cy.get('section#how-we-help').scrollIntoView();
    // Check the heading
    cy.get('section#how-we-help h2').should('contain.text', 'How We Help');
    // Validate help blocks
    cy.get('section#how-we-help .help-item').each(($help) => {
      cy.wrap($help).find('h3').should('not.be.empty');
      cy.wrap($help).find('p').should('not.be.empty');
    });
  });

  it('Validates the "Key Milestones" Section', () => {
    // Scroll into view
    cy.get('section#key-milestones').scrollIntoView();
    // Check the heading
    cy.get('section#key-milestones h2').should('contain.text', 'Key Milestones');
    // Validate milestones
    cy.get('section#key-milestones .milestone').each(($milestone) => {
      cy.wrap($milestone).find('h3').should('not.be.empty');
      cy.wrap($milestone).find('p').should('not.be.empty');
    });
  });

  it('Validates the Blogs and Resources Section', () => {
    // Scroll into view
    cy.get('section#blogs-resources').scrollIntoView();
    // Check the heading
    cy.get('section#blogs-resources h2').should('contain.text', 'Blogs and Resources');
    // Validate blog entries
    cy.get('section#blogs-resources .blog-item').each(($blog) => {
      cy.wrap($blog).find('h3').should('not.be.empty');
      cy.wrap($blog).find('p').should('not.be.empty');
      cy.wrap($blog).find('a').should('have.attr', 'href').and('not.be.empty');
    });
  });

  it('Validates the Footer Section', () => {
    // Check footer visibility
    cy.get('footer').should('be.visible');
    // Validate footer links
    cy.get('footer a').should('have.length.greaterThan', 0);
    cy.get('footer a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
    });
    // Validate social media links
    cy.get('footer .social-media a').should('have.length.greaterThan', 0);
    cy.get('footer .social-media a').each(($social) => {
      cy.wrap($social).should('have.attr', 'href').and('not.be.empty');
    });
  });
});
