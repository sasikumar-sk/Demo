//Test for Open muiltple windows with same button
//Open muiltple windows with same button
//Test Alert, Prompt Handling 

describe('Multi-Tab Button Click Test', () => {
  it('opens correct URLs in new tabs on successive clicks', () => {
    cy.visit('https://letcode.in/windows');

     let clickCount = 0;

    cy.on('window:before:load', (win) => {
      cy.stub(win, 'open').callsFake((url) => {
        clickCount++; 

        if (clickCount === 1) {
          //first URL for the first click
          expect(url).to.equal('/alert');
        } else if (clickCount === 2) {
          // second URL for the second click
          expect(url).to.equal('/dropdowns');
        }
      });
    });

    // Click the button for the first time
    cy.get('#multi').click();

    // Click the button for the second time
    cy.get('#multi').click();
  });
});
 
 


describe("Test Alert Handling", () => {
  it("TEST: accept the alert", () => {
    cy.visit("https://letcode.in/alert"); 
    cy.get("button").contains("Alert").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("You clicked an alert successfully");
    });
  });

  // Test for Dismissing the Alert and printing the alert text
  it("TEST: dismiss the alert and print the alert text", () => {
    cy.visit("https://letcode.in/alert");

    // Trigger the alert and dismiss it
    cy.get("button").contains("Alert").click();
    cy.on("window:alert", (str) => {
      cy.log(str); // Log the alert text
      return false; // Dismiss the alert
    });
  });

  // Test for typing a name and accepting the alert
  it("TEST: type name and accept", () => {
    cy.visit("https://letcode.in/alert"); 
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Prompt is working!");
    });

    cy.get("button").contains("Prompt").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("SweetAlert is working!");
      cy.get('.notification').contains("Your name is:Prompt is working!")

    });
  });

  // Test for Sweet alert actions
  it("TEST: handle Sweet Alert actions", () => {
    cy.visit("https://letcode.in/alert");
 
    cy.get("button").contains("Modern Alert").click();

   
    cy.on("window:alert", (str) => {
      expect(str).to.equal("SweetAlert is working!");
    });

       cy.get(".card-content > .title")
      .contains("Modern Alert - Some people address me as sweet alert as well")
      .click();
    cy.get(".modal-close").click();
  });
});
