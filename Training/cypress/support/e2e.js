// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// cypress/support/e2e.js
import '@testing-library/cypress/add-commands'; // Example of adding custom commands
// Add any global configurations, setup, or hooks here
Cypress.Commands.add('getIframe', (iframeSelector) => {
    return cy.get(iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  });