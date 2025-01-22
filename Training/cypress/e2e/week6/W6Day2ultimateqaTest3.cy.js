//Test HTML Table with unique Table id
//Test HTML Table with no Table id
 
describe('HTML Table with ID', () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });
  it('Validates data in the table with ID', () => {
    // Check if the table with the ID exists
    cy.get('#htmlTableId').should('exist');
    
    // Validate the content of the first row (headers)
    cy.get('#htmlTableId th').eq(0).should('have.text', 'Title');
    cy.get('#htmlTableId th').eq(1).should('have.text', 'Work');
    cy.get('#htmlTableId th').eq(2).should('have.text', 'Salary');

    // Validate the content of the first data row
    cy.get('#htmlTableId tr').eq(1).find('td').eq(0).should('have.text', 'Software Development Engineer in Test');
    cy.get('#htmlTableId tr').eq(1).find('td').eq(1).should('have.text', 'Automation');
    cy.get('#htmlTableId tr').eq(1).find('td').eq(2).should('have.text', '$150,000+');

    // Validate the content of the second data row
    cy.get('#htmlTableId tr').eq(2).find('td').eq(0).should('have.text', 'Automation Testing Architect');
    cy.get('#htmlTableId tr').eq(2).find('td').eq(1).should('have.text', 'Automation');
    cy.get('#htmlTableId tr').eq(2).find('td').eq(2).should('have.text', '$120,000+');

    // Validate the content of the third data row
    cy.get('#htmlTableId tr').eq(3).find('td').eq(0).should('have.text', 'Quality Assurance Engineer');
    cy.get('#htmlTableId tr').eq(3).find('td').eq(1).should('have.text', 'Manual');
    cy.get('#htmlTableId tr').eq(3).find('td').eq(2).should('have.text', '$50,000+');
  });
});

//there's no id, we use cy.get('table') to select the first table element found on the page.
describe('HTML Table without ID', () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  });
  it('Validates data in the table without ID', () => {
    // Check if the table exists
    cy.get('table').should('exist');
    
    // Validate the content of the first row (headers)
    cy.get('table th').eq(0).should('have.text', 'Title');
    cy.get('table th').eq(1).should('have.text', 'Work');
    cy.get('table th').eq(2).should('have.text', 'Salary');

    // Validate the content of the first data row
    cy.get('table tr').eq(1).find('td').eq(0).should('have.text', 'Software Development Engineer in Test');
    cy.get('table tr').eq(1).find('td').eq(1).should('have.text', 'Automation');
    cy.get('table tr').eq(1).find('td').eq(2).should('have.text', '$150,000+');

    // Validate the content of the second data row
    cy.get('table tr').eq(2).find('td').eq(0).should('have.text', 'Automation Testing Architect');
    cy.get('table tr').eq(2).find('td').eq(1).should('have.text', 'Automation');
    cy.get('table tr').eq(2).find('td').eq(2).should('have.text', '$120,000+');

    // Validate the content of the third data row
    cy.get('table tr').eq(3).find('td').eq(0).should('have.text', 'Quality Assurance Engineer');
    cy.get('table tr').eq(3).find('td').eq(1).should('have.text', 'Manual');
    cy.get('table tr').eq(3).find('td').eq(2).should('have.text', '$50,000+');
  });
}); 

describe('XPath Tutorial Button Validation', () => {
  beforeEach(() => {
    cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
  }); 
    it('Validates the first set of buttons and checks the redirection', () => {
      // Click on the first button (Xpath Button 1 in the first section)
      cy.get('.et_pb_blurb_11').find('button').first().click();
      
      // Verify that the URL includes the correct path after clicking Button 1
      cy.url().should('eq', 'https://ultimateqa.com/button-success?');
      
      // Optionally, verify the page content or a success message after redirect  
      cy.get('body').should('contain', 'Button success'); 
    });
  
    it('Validates the second set of buttons and checks the redirection', () => {
      // Click on the second button (Xpath Button 1 in the second section)
      cy.get('.et_pb_blurb_12').find('button').first().click();
      
      // Verify that the URL includes the correct path after clicking Button 1
      cy.url().should('eq', 'https://ultimateqa.com/button-success?');
      
      // Optionally, verify the page content or a success message after redirect  
      cy.get('body').should('contain', 'Button success');  
    });
  
    it('Validates the third set of buttons (Xpath Button 1) and checks redirection', () => {
      // Click on the first button (Xpath Button 1 in the third section)
      cy.get('.et_pb_blurb_13').find('button').first().click();
      
      // Verify that the URL includes the correct path after clicking Button 1
      cy.url().should('eq', 'https://ultimateqa.com/button-success?');
      
      // Optionally, verify the page content or a success message after redirect 
      cy.get('body').should('contain', 'Button success'); 
    });
  
    it('Validates the fourth set of buttons (Xpath Button 2) and checks redirection', () => {
      // Click on the second button (Xpath Button 2 in the fourth section)
      cy.get('.et_pb_blurb_14').find('button').first().click();
      
      // Verify that the URL includes the correct path after clicking Button 2
      cy.url().should('eq', 'https://ultimateqa.com/button-success?'); 
      cy.get('body').should('contain', 'Button success');  
    });
  });
  



  describe('Tab Navigation', () => {

    beforeEach(() => {
      cy.visit("https://ultimateqa.com/simple-html-elements-for-automation/");
    });    
     it('Validates Tab 1 and Tab 2 Content', () => { 
      cy.get('.et_pb_tab_0 > a').click(); 
      cy.wait(1000);  
      cy.get('.et_pb_tab_0 .et_pb_tab_content')
        .should('be.visible')
        .and('contain.text', 'tab 1 content'); 
    });
  });
    
  