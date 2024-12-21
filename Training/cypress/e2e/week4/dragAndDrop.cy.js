describe('Manual Drag and Drop Test', () => {
  it('Drags the Source Box into the Target Box', () => {
    // Visit the page
    cy.visit('https://letcode.in/dropable');

    // Locate source and target
    const drag = '#draggable';
    const drop = '#droppable';

    // Perform drag and drop
    cy.get(drag)
    .trigger('mousemove')
      .trigger('mousedown', { which: 1 }); // Start drag
    cy.get(drop)
      .trigger('mousemove')
      .trigger('mouseup', { force: true }); // Drop

    // Assert that the text inside the target box has changed
    cy.get('#droppable')
  .invoke('text')
  .should('include', 'Dropped!');

  });
});



describe('Drag and Drop Test with Custom Command', () => {
  it('Drags the Source Box into the Target Box', () => { 
    cy.visit('https://letcode.in/dropable'); 
    cy.dragAndDrop('#draggable', '#droppable');
 
    cy.get('#droppable').should('contain.text', 'Dropped!');
  });
});
