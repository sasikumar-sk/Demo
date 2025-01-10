
describe("Capture screenshot and Videos", () => {
    it("Takeing screenshot using Screenshot command", () => {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
      cy.wait(3000);
  
      cy.screenshot("1 Login page of OrangeHRM");
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ).type("Admin");
      cy.get(
        ":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ).type("admin123");
      cy.wait(3000);
  
      cy.screenshot("2 Login page with filled inputs");
      cy.get(".oxd-button").click();
      cy.wait(3000);
      cy.screenshot("3 After Login OrangeHRM Dashboard");
      cy.wait(3000);
  
      cy.get(".oxd-brand-banner > img").screenshot(
        "4 Logo of OrangeHRM Dashboard"
      );
    });
    it("Screenshot and Videos on Testfailure", () => {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );
  
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ).type("Admin");
      cy.get(
        ":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ).type("admin");
      cy.get(".oxd-button").click();
   
    });
  });



/*

describe('Handle Nested Iframes with Cypress', () => {

    beforeEach(() => {
        // Visit the page containing nested iframes
        cy.visit('https://practice-automation.com/iframes/');
    });

    it('Should interact with nested iframe', () => {
        // Step 1: Switch to the parent iframe
        cy.get('iframe#parentIframe').then($parentIframe => {
            const parentDoc = $parentIframe.contents();

            // Step 2: Switch to the nested iframe inside the parent iframe
            cy.wrap(parentDoc).find('iframe#childIframe').then($childIframe => {
                const childDoc = $childIframe.contents();

                // Step 3: Interact with elements inside the nested iframe
                cy.wrap(childDoc).find('input[name="childInput"]').clear().type('Test Input');

                // Step 4: Submit the form or click a button inside the nested iframe
                cy.wrap(childDoc).find('button[type="submit"]').click();

                // Step 5: Verify the expected result inside the nested iframe
                cy.wrap(childDoc).find('.child-success').should('have.text', 'Success');
            });
        });
    

 
    it('Should interact with iframe and verify content', () => {
        // Step 1: Check if the iframe exists on the page
        cy.get('iframe').should('be.visible');  // Adjust the selector if needed

        // Step 2: Switch to the iframe using .contents() to access the iframe document
        cy.get('iframe').then($iframe => {
            const doc = $iframe.contents();  // Get the iframe's document

            // Step 3: Interact with elements inside the iframe
            // For example, typing into an input field inside the iframe
            cy.wrap(doc).find('input[name="name"]').clear().type('John Doe');  // Adjust the selector if needed

            // Step 4: Click a button inside the iframe (example: submit button)
            cy.wrap(doc).find('button[type="submit"]').click();  // Adjust the selector if needed

            // Step 5: Verify an expected result inside the iframe
            // Example: Check for a success message after clicking the button
            cy.wrap(doc).find('.success-message').should('have.text', 'Form submitted successfully');
        });
    });
});
});
*/