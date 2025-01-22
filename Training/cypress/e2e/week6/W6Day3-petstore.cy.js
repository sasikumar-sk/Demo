describe('Petstore Store API Tests', () => {

    const baseUrl = 'https://petstore.swagger.io/v2';
  
    let orderId;  // Variable to store orderId for testing
  
    // Test POST /store/order - Place an order for a pet
    it('Should place a new order', () => {
      const newOrder = {
        id: 0,
        petId: 1,
        quantity: 1,
        shipDate: '2025-01-22T00:00:00Z',
        status: 'placed',
        complete: true
      };
  
      cy.request('POST', `${baseUrl}/store/order`, newOrder)
        .should((response) => {
          expect(response.status).to.eq(200); // Status should be 200 OK
          expect(response.body).to.have.property('id');  // Ensure that an order id is returned
          expect(response.body).to.have.property('status', 'placed');  // Order status should be 'placed'
          
          orderId = response.body.id;  // Store the order ID for later use
        });
    });
  
    // Test GET /store/order/{orderId} - Find purchase order by ID
    it('Should fetch the order details by ID', () => {
      // Ensure an order has been created before running this test
      if (orderId) {
        cy.request('GET', `${baseUrl}/store/order/${orderId}`)
          .should((response) => {
            expect(response.status).to.eq(200);  // Status should be 200 OK
            expect(response.body).to.have.property('id', orderId);  // Ensure the order id matches
            expect(response.body).to.have.property('status', 'placed');  // Ensure the status is 'placed'
          });
      } else {
        cy.log('No order has been created yet');
      }
    });
  
    // Test DELETE /store/order/{orderId} - Delete purchase order by ID
    it('Should delete the order by ID', () => {
      // Ensure an order has been created before running this test
      if (orderId) {
        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/store/order/${orderId}`,
          failOnStatusCode: false // To prevent Cypress from failing the test on 404 error if order doesn't exist
        }).should((response) => {
          expect(response.status).to.eq(200);  // Status should be 200 OK
          expect(response.body).to.be.empty;  // The response body should be empty
        });
      } else {
        cy.log('No order has been created yet');
      }
    });
  
  });
  