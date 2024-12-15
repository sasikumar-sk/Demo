// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
////
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-downloadfile/lib/downloadFileCommand';
import 'cypress-downloadfile';
import 'cypress-file-upload';
import 'cypress-iframe';

// Custom command to fill out the email and password fields 
Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="email"]').clear().type(email);   // Clear and type email
    cy.get('input[name="password"]').clear().type(password); // Clear and type password
    cy.get('button[type="submit"]').click();  // Submit the form
  });




require('cypress-downloadfile/lib/downloadFileCommand')