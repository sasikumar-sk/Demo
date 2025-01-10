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
import '@4tw/cypress-drag-drop';

import 'cypress-downloadfile';
// cypress/support/commands.js or cypress/support/index.js
import 'cypress-file-upload';

import 'cypress-iframe';

// Custom command to fill out the email and password fields 
Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="email"]').clear().type(email);   // Clear and type email
    cy.get('input[name="password"]').clear().type(password); // Clear and type password
    cy.get('button[type="submit"]').click();  // Submit the form
  });


 
// cypress/support/commands.js

Cypress.Commands.add('dragAndDrop', (source, target) => {
  cy.get(source)  // Get the source element (the element to be dragged)
    .trigger('mousedown', { which: 1 })  // Trigger mouse down on the source element to start dragging

  cy.get(target)  // Get the target element (the element where you want to drop)
    .trigger('mousemove')  // Move the mouse to the target area
    .trigger('mouseup', { force: true });  // Trigger mouse up to drop the element
  
  // Optional: Add a small wait if needed to ensure DOM updates after drop action
  cy.wait(500);
});


require('cypress-downloadfile/lib/downloadFileCommand')