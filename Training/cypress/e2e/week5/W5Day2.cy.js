//<reference types="Cypress" />
//Read data from Excel

import * as XLSX from "xlsx";

describe("Read data from Excel for Registration Page Tests", () => {
  let userData;  

  // Load data from Excel before the tests
  before(() => {
    // Read the Excel file and parse it to JSON
    cy.readFile("cypress/fixtures/Task Read Data.xlsx", "binary").then(
      (fileContent) => {
        const workbook = XLSX.read(fileContent, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON format
        userData = jsonData; // Store the parsed data in a variable outside of the tests
      }
    );
  });

  it("TEST: read data from the Excel file", function () {
    // Ensure the data exists and has the expected structure
    expect(userData).to.have.length.greaterThan(0); // Ensure data exists
    cy.log(userData[0]["First Name"]); // Log the first name to verify
    cy.log(userData[0]["Last Name"]);
    cy.log(userData[0]["User Name"]);
    cy.log(userData[0]["Password"]);
  });

  // Test -1 for filling the form with data from the Excel file and try existing user registration (duplicate user name)
  it("TEST: fill the registration form using data from Excel(read all data)", function () {
    const data = userData[0];
    cy.visit("https://bookcart.azurewebsites.net/register");

    // Fill in the form with data from the Excel file
    cy.get('#mat-radio-1-input')
    cy.get("#mat-input-0").type(data["First Name"]); // First Name
    cy.get("#mat-input-1")
      .type(data["Last Name"])
      .trigger("keydown", { key: "Tab" }); // Last Name
    cy.get("#mat-input-3").type(data["Password"]); // Password
    cy.get("#mat-input-4").type(data["Password"]); // Confirm Password  
    cy.get("#mat-input-2").clear();  
    cy.get("#mat-input-2").type(data["User Name"]);   
   // cy.get("#mat-mdc-error-0").contains("User Name is not available");
    cy.url().should("include", "/register");
  });

  // Test -2 for short password error (password less than 8 characters)
  it("TEST : show an error if the password is too short", function () {
    const data = userData[1];
    cy.visit("https://bookcart.azurewebsites.net/register");

    // Fill in the form with a password that doesn't meet the criteria (e.g., too short)
    cy.get("#mat-input-0").type(data["First Name"]); // First Name
    cy.get("#mat-input-1").type(data["Last Name"]); // Last Name
    cy.get("#mat-input-2").type(data["User Name"]); // User Name
    cy.get("#mat-input-3").type(data["Password"]); // Password that is too short
    cy.get("#mat-input-4").type(data["Password"]) 
    .trigger("keydown", { key: "Tab" }); // Confirm Password that is too short
    cy.get("button.mat-mdc-raised-button").contains("Register").click();
    cy.get("#mat-mdc-error-0")
      .should("contain", "Password should have minimum 8 characters")
      .and("contain", "at least 1 uppercase letter")
      .and("contain", "1 lowercase letter")
      .and("contain", "1 number");
  });

  // Test for password and confirm password mismatch
  it("TEST : show an error if the password and confirm password do not match", function () {
    const data = userData[2];
    // Function to generate a random string of a given length (2 characters in this case)
    function generateRandomString(length = 2) {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";  
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        ); // Append random character
      }
      return result;
    }
    // Generate a random 2-digit number between 10 and 99
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    const randomString = generateRandomString(2); // Generates a random 2-character string like "ab", "Zx", etc.

    // Append the random number and 'alba' to the username
    const usernameWithRandom = data["User Name"] + randomNumber + randomString;
    cy.visit("https://bookcart.azurewebsites.net/register");

    // Fill in the form with mismatched passwords
    cy.get("#mat-input-2")
      .type(usernameWithRandom)
      .trigger("keydown", { key: "Tab" }); // User Name
    cy.get("#mat-input-3").type(data["Password"]); // Valid password
    cy.get("#mat-input-4").type(data["Password"]); // Different confirm password
    cy.get("#mat-input-0").type(data["First Name"]); // First Name
    cy.get("#mat-input-1").type(data["Last Name"]); // Last Name
    cy.get("button.mat-mdc-raised-button").contains("Register").click(); 
    // Assert that the error message for mismatched passwords is shown
   // cy.get("#mat-mdc-error-0").contains("Passwords do not match").should("exist");
    
  });
});
