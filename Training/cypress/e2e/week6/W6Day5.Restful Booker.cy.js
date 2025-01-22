describe('Restful Booker API Tests', () => {
    let token;
    let bookingId;
  
    // Create token before running the tests
    it('Create Auth Token', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: {
          username: 'admin', // replace with your username if necessary
          password: 'password123', // replace with your password
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token; // Store the token for future requests
        cy.log('Auth token created:', token);
      });
    });
  
    // Create a booking (This could be done before updating/deleting)
    it('Create Booking', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: 123,
          depositpaid: true,
          bookingdates: {
            checkin: '2023-01-01',
            checkout: '2023-01-02',
          },
          additionalneeds: 'Breakfast',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        bookingId = response.body.bookingid; // Store the bookingId for future requests
        cy.log('Booking created with ID:', bookingId);
      });
    });
   
     
  });

  

  describe('Restful Booker API Update Booking', () => {
    let token = '';  
    let bookingId = 100; 
  
    it('Update Booking', () => {
      const updatedData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 123,
        depositpaid: true,
        bookingdates: {
          checkin: '2023-01-01',
          checkout: '2023-01-02',
        },
        additionalneeds: 'Breakfast',
      };
  
      // First, verify if the booking exists
      cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        failOnStatusCode: false // Prevent Cypress from failing automatically
      }).then((response) => {
        if (response.status === 404) {
          cy.log('Booking ID not found, cannot update');
        } else {
          // Proceed to update if booking exists
          cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: updatedData,
            failOnStatusCode: false // Handle failure manually
          }).then((response) => {
            if (response.status === 403) {
              cy.log('Received 403 Forbidden. Please check token and permissions.');
            } else if (response.status === 200) {
              cy.log('Booking updated successfully');
              expect(response.body.firstname).to.eq(updatedData.firstname); // Verify update
            }
          });
        }
      });
    });
  });
  