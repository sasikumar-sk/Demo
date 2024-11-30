describe('QAonCloud Homepage UI Tests', () => {

  it('QAonCloud Test', function () {
    cy.visit('https://www.qaoncloud.com/');
    cy.viewport(1400, 900);
    cy.get('.elementor-widget-container > a > img').click();
    cy.get('.elementor-widget-container > a > img').should('be.visible');
    cy.get('.elementor-element-9814d64 > :nth-child(1)').click();
    cy.get('.hotspot-content-overlay').click();
    cy.get('.elementor-element-515eabd > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should('have.text', 'SERVICES');
    cy.get('.elementor-element-7714daf > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .elementor-heading-title').should('have.text', 'SOLUTIONS');
    cy.get('.elementor-element-7241cda > .elementor-widget-container > .elementor-heading-title').should('have.text', 'Banking & \nFinancial Services');
    cy.get('.elementor-element-3cd64ed > .elementor-container').should('be.visible');
    cy.get('.elementor-element-330048a > .elementor-widget-container > .elementor-heading-title').should('have.text', 'Want To Know More About QAonCloud?');
    cy.get('.elementor-element-e1d6dff > .elementor-widget-container > .ot-button > .octf-btn').should('be.visible');
    cy.get('.elementor-element-e1d6dff > .elementor-widget-container > .ot-button > .octf-btn').should('have.text', 'Talk To an Expert  \n\t\t\t\t\t\t\t');
    cy.get('.ekit-template-content-footer > .elementor > .elementor-top-section').should('be.visible');
    cy.get('.elementor-element-b7925ff > .elementor-widget-container > .elementor-heading-title').should('have.text', 'Company');
    cy.get('.elementor-element-55ee9fb > .elementor-widget-container > .elementor-heading-title').should('have.text', 'Quick Links');
    cy.get('#slick-slide10 > .col-md > .title-item > .tab-titles_heading').should('have.text', 'Banking & \nFinancial Services');
    cy.get('#slick-slide11 > .col-md > .title-item > .tab-titles_heading').should('have.text', 'Communications');
    cy.get('#slick-slide12 > .col-md > .title-item > .tab-titles_heading').should('have.text', 'E-Commerce');
    cy.get('#slick-slide10 > .col-md > .title-item > .tab-titles_heading').should('be.visible');
    cy.get('#slick-slide11 > .col-md > .title-item > .tab-titles_heading').should('be.visible');
    cy.get('#slick-slide12 > .col-md > .title-item > .tab-titles_heading').should('be.visible');

  });
});