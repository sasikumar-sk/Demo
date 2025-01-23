describe('Petstore Inventory API Test', () => {
  it('Fetch the inventory details', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/store/inventory',
      headers: {
        'Accept': 'application/json',
        'api_key': '123456'   
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Inventory details fetched successfully: ${JSON.stringify(response.body)}`);
    });
  });
 
  let orderId;

  it('Place an order for a pet', () => {
    const orderPayload = {
      id: 123654987,
      petId: 1,   
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: false
    };

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/store/order',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api_key': '123456'
      },
      body: orderPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      orderId = response.body.id;
      cy.log(`Order placed successfully: ${JSON.stringify(response.body)}`);
    });
  });

  it('Find purchase order by ID', () => {
    // Ensure the orderId is set
    expect(orderId).to.not.be.undefined;

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api_key': '123456'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Order fetched successfully: ${JSON.stringify(response.body)}`);
    });
  });

  it('Delete purchase order by ID', () => {
    // Ensure the orderId is set
    expect(orderId).to.not.be.undefined;

    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api_key': '123456'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Order deleted successfully`);
    });
  });

  after(() => {
    cy.log(`Final Order ID: ${orderId}`);
  });

  it('--Verify the order ID is deleted order should not found--', () => {
    // Ensure the orderId is set
    expect(orderId).to.not.be.undefined;

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api_key': '123456'
      },
      failOnStatusCode: false   
    }).then((response) => {
      if (response.status === 404) {
        cy.log('Order not found. Please check the order ID.');
      } else {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(orderId);  
        cy.log(`Verified order ID: ${orderId} matches fetched order ID: ${response.body.id}`);
      }
    });
  }); 
});


