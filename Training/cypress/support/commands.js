 
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

// In cypress/support/index.js or commands.js
import 'cypress-downloadfile/lib/downloadFile';
import '@testing-library/cypress/add-commands';

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

Cypress.Commands.add('getIframe', (iframeSelector) => {
  return cy.get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
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



//Day-2 Custom Commands in Cypress | Data Driven Testing using Custom commands
Cypress.Commands.add('registerUser', (customer) => {
  // Fill out the registration form fields using the customer data
  cy.get('#customer.firstName').type(customer.firstName);           // First Name
  cy.get('#customer.lastName').type(customer.lastName);             // Last Name
  cy.get('#customer.address.state').type(customer.address.state);   // State
  cy.get('#customer.address.city').type(customer.address.city);     // City
  cy.get('#customer.address.zipCode').type(customer.address.zipCode); // Zip Code
  cy.get('#customer.phoneNumber').type(customer.phoneNumber);       // Phone Number
  cy.get('#customer.ssn').type(customer.ssn);                       // SSN
  cy.get('#customer.username').type(customer.username);             // Username
  cy.get('#customer.password').type(customer.password);             // Password
  cy.get('#repeatedPassword').type(customer.repeatedPassword);      // Confirm Password

  // Click the Register button
  cy.get('input[value="Register"]').click();
});


Cypress.Commands.add('drag', (source, target) => {
  cy.get(source).trigger('mousedown', { which: 1 });
  cy.get(target).trigger('mousemove').trigger('mouseup', { force: true });
});
