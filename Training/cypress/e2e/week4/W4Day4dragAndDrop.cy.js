describe('Drag and Drop Test with Custom Command', () => {
  it('Drags the Source Box into the Target Box', () => {
    // Visit the page where drag and drop is implemented
    cy.visit('https://letcode.in/dropable');

    // Use the custom dragAndDrop command to perform the drag-and-drop action
    cy.dragAndDrop('#draggable', '#droppable');
    
    // Assert that the text inside the target box has changed to "Dropped!"
    cy.get('#droppable')
      .should('contain.text', 'Dropped!');
  });
});
