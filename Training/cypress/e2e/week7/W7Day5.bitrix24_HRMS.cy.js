 

describe("Bitrix24 Login Test", () => {
  it("should log in successfully", () => {
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");

    // Suppress uncaught exceptions
    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Blocked a frame with origin") ||
        err.message.includes("Failed to set a named property 'href' on 'Location'") ||
        err.message.includes("Cannot read properties of undefined") ||
        err.message.includes("BSBBW is not defined")
      ) {
        return false; // Prevent Cypress from failing the test
      }
    });

    // Enter the email
    cy.get("#login").clear().type("qa_Master123@protonmail.com");
    cy.get(".ui-btn-success").should("have.text", "Next").click();
 
    // Enter the password
    cy.get("#password").clear().type("qfhz4p,98aXHTU%");
    cy.get(".ui-btn-success").should("have.text", "Next").click();

    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");
    cy.wait(3000);  


    // Click the menu item to open the calendar
    cy.get("div.menu-items-header div.menu-switcher").click();
    cy.get('li[id="bx_left_menu_menu_calendar"] a[class="menu-item-link"]').click();

    // Wait for the calendar to load
    cy.wait(2000);

    // Click the 'Create' button to open the sidebar
    cy.get('button[class="ui-btn-main"]').click();

    // Wait for the calendar slider (event creation sidebar) to appear
    cy.get('.calendar-slider-calendar-wrap.calendar-slider-calendar-wrap-edit').should('be.visible');

    // Select the event start date from the date picker
    cy.get('#calendar_edit_slider_363375115_date_from').click(); // Open the date picker
    cy.get('.calendar-slider-calendar-wrap').within(() => {
      // Choose a date from the calendar, e.g., the 10th day
      cy.contains('10').click();
    });

    // Select the event end date from the date picker
    cy.get('#calendar_edit_slider_363375115_date_to').click(); // Open the end date picker
    cy.get('.calendar-slider-calendar-wrap').within(() => {
      // Choose the end date, e.g., the 11th day
      cy.contains('11').click();
    });

    // Click the save button to save the event
    cy.get('#calendar_edit_slider_363375115_save').click();

    // Wait for a toast message to appear (success notification)
    cy.wait(2000); // Wait for the toast to appear
    cy.get('.toast-message') // Adjust the toast selector as needed
      .should('be.visible')
      .and('contain.text', 'Event has been successfully created'); // Check the toast message

    // Optionally, add assertions to confirm the event appears on the calendar (if needed)
    cy.contains('10').should('be.visible'); // Example: Check if the event appears on the 10th
  });
});

 