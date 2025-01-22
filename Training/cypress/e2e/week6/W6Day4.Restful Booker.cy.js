describe('API Testing - Restful Booker', () => {
  
    let token;
  
    // Create Token
    it('Create Token', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: {
          username: 'admin',
          password: 'password123',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;
        Cypress.env('authToken', token);
        cy.log('Token:', token);
      });
    });
  
    // Get Booking IDs
    it('Fetch all booking IDs and verify', () => {
      const token = Cypress.env('authToken');
      
      cy.request({
        method: 'GET',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure status code is 200
        expect(response.body).to.be.an('array'); // Ensure the response is an array
  
        // Check if the first element in the array has the 'bookingid' property
        expect(response.body[0]).to.have.property('bookingid');
  
        // check for the bookingid in all items of the array
        response.body.forEach(booking => {
          expect(booking).to.have.property('bookingid');
        });
  
        cy.log('Booking IDs:', response.body);
      });
    });
  
    // Get Booking Details
    it('Get Booking by ID', () => {
      const bookingId = 1;  
      cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('firstname');
        cy.log('Booking Details:', response.body);
      });
    });
  
    // Create a New Booking
    it('Create Booking', () => {
      const newBookingData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-10',
        },
        additionalneeds: 'Breakfast',
      };
  
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newBookingData,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        cy.log('Booking Created with ID:', response.body.bookingid);
      });
    });
  });
  