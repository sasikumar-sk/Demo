 
//1.Using Native Mouse Events (mousedown, mousemove, mouseup)
//2.Using @4tw/cypress-drag-drop Plugin

describe('Drag and Drop Test for Multiple Elements', () => {
  it('should drag draggable1 and draggable2 to droppable1, check "Get Off Me!" on droppable1', () => { 
    cy.visit('https://testpages.eviltester.com/styled/drag-drop-javascript.html');

    // Assert initial text before drag-and-drop
    cy.get('#draggable1 > p').should('have.text', 'Drag me');
    cy.get('#draggable2 > p').should('have.text', 'Drag me');
    cy.get('#droppable1 > p').should('have.text', 'Drop here');
    cy.get('#droppable2 > p').should('have.text', 'No Drop here');

    // Drag both draggable1 and draggable2 to droppable1 and check "Get Off Me!" text
    cy.get('#draggable1')  // Select the first draggable element
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 313.725 }); // Simulate mouse down at initial position

    cy.get('#droppable1')  // Select the first droppable area
      .trigger('mousemove', { pageX: 757.6, pageY: 313.725 })
      .trigger('mouseup', { force: true }); // Simulate mouse up to drop the element

    cy.get('#draggable1')
      .should('have.css', 'left') 
      .and('not.equal', '757.6px'); // Ensure draggable1 has moved

    cy.get('#draggable2')  // Select the second draggable element
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 538.5 }); // Simulate mouse down for draggable2

    cy.get('#droppable1')  // Drag draggable2 to droppable1
      .trigger('mousemove', { pageX: 757.6, pageY: 538.5 })
      .trigger('mouseup', { force: true }); // Simulate mouse up to drop draggable2

    cy.get('#draggable2')
      .should('have.css', 'left')   
      .and('not.equal', '757.6px'); // Ensure draggable2 has moved

    // Check if the text on droppable1 has changed to "Get Off Me!"
    cy.get('#droppable1 > p')
      .should('have.text', 'Get Off Me!');
  });

  it('should drag draggable1 and draggable2 to droppable2, check "Dropped!" on droppable2', () => { 
    cy.visit('https://testpages.eviltester.com/styled/drag-drop-javascript.html');

    // Drag both draggable1 and draggable2 to droppable2 and check "Dropped!" text on droppable2
    cy.get('#draggable1')  
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 313.725 });  
    cy.get('#droppable2')   
      .trigger('mousemove', { pageX: 757.6, pageY: 313.725 })
      .trigger('mouseup', { force: true });  

    cy.get('#draggable1')
      .should('have.css', 'left') 
      .and('not.equal', '757.6px');  
    cy.get('#draggable2')  
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 538.5 });  
    cy.get('#droppable2')   
      .trigger('mousemove', { pageX: 757.6, pageY: 538.5 })
      .trigger('mouseup', { force: true });  
    cy.get('#draggable2')
      .should('have.css', 'left')   
      .and('not.equal', '757.6px'); 
    // Check if the text on droppable2 has changed to "Dropped!"
    cy.get('#droppable2 > p')
      .should('have.text', 'Dropped!');
  });

  it('should drag draggable1 to droppable1 and draggable2 to droppable2, check "Dropped!" on both', () => { 
    cy.visit('https://testpages.eviltester.com/styled/drag-drop-javascript.html');
    cy.get('#draggable1')  
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 313.725 });  
    cy.get('#droppable1')  
      .trigger('mousemove', { pageX: 757.6, pageY: 313.725 })
      .trigger('mouseup', { force: true });  
    cy.get('#draggable1')
      .should('have.css', 'left') 
      .and('not.equal', '757.6px');   
    cy.get('#droppable1 > p')
      .should('have.text', 'Dropped!'); 
    cy.get('#draggable2')  
      .trigger('mousedown', { which: 1, pageX: 757.6, pageY: 538.5 });  
    cy.get('#droppable2')   
      .trigger('mousemove', { pageX: 757.6, pageY: 538.5 })
      .trigger('mouseup', { force: true });  
    cy.get('#draggable2')
      .should('have.css', 'left')   
      .and('not.equal', '757.6px');  
    cy.get('#droppable2 > p')
      .should('have.text', 'Dropped!');
  });
});
 



import '@4tw/cypress-drag-drop';

describe('Drag and Drop using cypress-drag-drop plugin', () => {
  it('should drag draggable1 to droppable1', () => {
    cy.visit('https://testpages.eviltester.com/styled/drag-drop-javascript.html');

    // Use force: true to bypass visibility check
    cy.get('#draggable1').drag('#droppable1', { force: true });

    cy.get('#droppable1 > p').should('have.text', 'Dropped!');
  });
});



