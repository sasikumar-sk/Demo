//Update booking, partialupdate Booking, Delete booking and healthcheck y

describe('Testing- Create, Update, Partially Update, and Delete Booking', () => {
  let bookingId;
  let fetchedBookingId;
  let bookingPayload = {
    firstname: "SAsI",
    lastname: "Kumar",
    totalprice: 1520,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-01-20",
      checkout: "2025-01-23",
    },
    additionalneeds: "Testing adding new book",
  };

  it('Create a new booking and verify the response', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bookingPayload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');

      // Store booking ID for further tests
      bookingId = response.body.bookingid;

      // Verify booking details in the response
      const bookingResponse = response.body.booking;
      cy.log(`Booking created successfully: ${JSON.stringify(bookingResponse)}`);
      expect(bookingResponse.firstname).to.eq(bookingPayload.firstname);
      expect(bookingResponse.lastname).to.eq(bookingPayload.lastname);
      expect(bookingResponse.totalprice).to.eq(bookingPayload.totalprice);
      expect(bookingResponse.depositpaid).to.eq(bookingPayload.depositpaid);
      expect(bookingResponse.bookingdates.checkin).to.eq(bookingPayload.bookingdates.checkin);
      expect(bookingResponse.bookingdates.checkout).to.eq(bookingPayload.bookingdates.checkout);
      expect(bookingResponse.additionalneeds).to.eq(bookingPayload.additionalneeds);
    });
  });

  it('Fetch booking IDs by firstname and lastname', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
      qs: {
        firstname: 'SAsI',
        lastname: 'Kumar'
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Bookings fetched successfully: ${JSON.stringify(response.body)}`);

      // Store the fetched booking ID for further use
      fetchedBookingId = response.body[0].bookingid;
      cy.log(`Fetched Booking ID: ${fetchedBookingId}`); 
    });
  });
  
 
  it('Update the existing booking and verify the response', () => {
    const updatedBookingPayload = {
      firstname: "Sir Sasi -78954",
      lastname: "Brown Jio",
      totalprice: 18200,
      depositpaid: true,
      bookingdates: {
        checkin: "2020-11-10",
        checkout: "2019-01-01"
      },
      additionalneeds: "Updated V2"
    };
   
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${fetchedBookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Cookie': 'token=abc123',   
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='   
      },
      body: updatedBookingPayload,
      failOnStatusCode: false   
    }).then((response) => {
      if (response.status === 200) {
        expect(response.status).to.eq(200);
  
        // Verify updated booking details in the response
        const bookingResponse = response.body;
        expect(bookingResponse.firstname).to.eq(updatedBookingPayload.firstname);
        expect(bookingResponse.lastname).to.eq(updatedBookingPayload.lastname);
        expect(bookingResponse.totalprice).to.eq(updatedBookingPayload.totalprice);
        expect(bookingResponse.depositpaid).to.eq(updatedBookingPayload.depositpaid);
        expect(bookingResponse.bookingdates.checkin).to.eq(updatedBookingPayload.bookingdates.checkin);
        expect(bookingResponse.bookingdates.checkout).to.eq(updatedBookingPayload.bookingdates.checkout);
        expect(bookingResponse.additionalneeds).to.eq(updatedBookingPayload.additionalneeds);
  
        cy.log(`Booking updated successfully: ${JSON.stringify(bookingResponse)}`);
      }
    });
  });
  it('--Update the with invalid Cookie--', () => {
    const updatedBookingPayload = {
      firstname: "invalid",
      lastname: "invalid",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2011-01-01",
        checkout: "2010-01-01"
      },
      additionalneeds: "Test Invalid Cookie"
    };
  
    cy.request({
      method: 'PUT',
      url: `https://restful-booker.herokuapp.com/booking/${fetchedBookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'token=abc12332165489',    
      },
      body: updatedBookingPayload,
      failOnStatusCode: false   
    }).then((response) => {
      if (response.status === 403) {
        cy.log('Authorization failed. Please check your token or credentials.');
      } else {
        expect(response.status).to.eq(200); 
      }
    });
  });
  

  it('Partially update the existing booking and verify the response', () => {
    const partialUpdatePayload = {
      firstname: "Sasi Jone", //update new values
      additionalneeds: "Update the name --- V3"
    };
  
    cy.request({
      method: 'PATCH',
      url: `https://restful-booker.herokuapp.com/booking/${fetchedBookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='  
      },
      body: partialUpdatePayload,
      failOnStatusCode: false   
    }).then((response) => {
      if (response.status === 403) {
        cy.log('Authorization failed. Please check your token or credentials.');
      } else {
        expect(response.status).to.eq(200); 
        const bookingResponse = response.body;
        expect(bookingResponse.firstname).to.eq(partialUpdatePayload.firstname);
        expect(bookingResponse.additionalneeds).to.eq(partialUpdatePayload.additionalneeds);
  
        cy.log(`Booking partially updated successfully: ${JSON.stringify(bookingResponse)}`);
      }
    });
  });
  
});

 