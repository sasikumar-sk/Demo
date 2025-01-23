//6.Create token, Getbookingids, Getbooking, Create booking

describe("1.Testing Create a token", () => {
  let authTokensaved;

  it("+Create a token with Default username, password+", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Validate the token in the response
      expect(response.body).to.have.property("token");
      authTokensaved = response.body.token;
      cy.log(`Newly created Auth Token:: ${authTokensaved}`);
    });
  });

  // Add another test case to demonstrate the use of the stored token
  it("+Use the stored token for another request+", () => {
    cy.request({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        Cookie: `token=${authTokensaved}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log("Bookings fetched successfully");
    });
  });

  it("--Create a token with random username, password and handle invalid credentials", () => {
    // Generate random username and password
    const randomUsername = `user_${Math.random().toString(36).substring(5)}`;
    const randomPassword = `pass_${Math.random().toString(36).substring(7)}`;
    cy.log(`Random Username: ${JSON.stringify(randomUsername)}`);
    cy.log(`Random Password: ${JSON.stringify(randomPassword)}`);
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: randomUsername,
        password: randomPassword,
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
      if (response.status === 200 && response.body.token) {
        // Valid credentials scenario
        cy.log(`Token: ${response.body.token}`);
      } else {
        // Invalid credentials scenario
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("reason", "Bad credentials");
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        cy.log(`Status code: ${JSON.stringify(response.status)}`);
      }
    });
  });
});

describe("2.Testing -Getbookingids", () => {
  let bookingDetailsForId1;
  let bookingDetailsForId20;
  it("Fetch and store booking details for IDs 1 and 20, then display them in the log", () => {
    cy.request("GET", "https://restful-booker.herokuapp.com/booking")
      .then((response) => {
        expect(response.status).to.eq(200);

        // Get the booking IDs for 1st and 20th positions
        const firstBookingId = response.body[0].bookingid;
        const twentiethBookingId = response.body[19].bookingid;
        const bookingIdsToFetch = [firstBookingId, twentiethBookingId];

        // Fetch booking details for the 1st booking ID
        cy.request(
          "GET",
          `https://restful-booker.herokuapp.com/booking/${firstBookingId}`
        ).then((bookingResponse) => {
          expect(bookingResponse.status).to.eq(200);
          bookingDetailsForId1 = bookingResponse.body;
        });

        // Fetch booking details for the 20th booking ID
        cy.request(
          "GET",
          `https://restful-booker.herokuapp.com/booking/${twentiethBookingId}`
        ).then((bookingResponse) => {
          expect(bookingResponse.status).to.eq(200);
          bookingDetailsForId20 = bookingResponse.body;
        });
      })
      .then(() => {
        // Log stored booking details for IDs 1 and 20
        if (bookingDetailsForId1) {
          cy.log(`Stored details for ID 1: 
            Firstname: ${bookingDetailsForId1.firstname}, 
            Lastname: ${bookingDetailsForId1.lastname}, 
            Total Price: ${bookingDetailsForId1.totalprice}, 
            Deposit Paid: ${bookingDetailsForId1.depositpaid}, 
            Check-in: ${bookingDetailsForId1.bookingdates.checkin}, 
            Check-out: ${bookingDetailsForId1.bookingdates.checkout}, 
            Additional Needs: ${bookingDetailsForId1.additionalneeds}`);
        }

        if (bookingDetailsForId20) {
          cy.log(`Stored details for ID 20: 
            Firstname: ${bookingDetailsForId20.firstname}, 
            Lastname: ${bookingDetailsForId20.lastname}, 
            Total Price: ${bookingDetailsForId20.totalprice}, 
            Deposit Paid: ${bookingDetailsForId20.depositpaid}, 
            Check-in: ${bookingDetailsForId20.bookingdates.checkin}, 
            Check-out: ${bookingDetailsForId20.bookingdates.checkout}, 
            Additional Needs: ${bookingDetailsForId20.additionalneeds}`);
        }
      });
  });

  it("Fetch, store, and filter booking details for ID 20, display counts of matches ", () => {
    cy.request("GET", "https://restful-booker.herokuapp.com/booking").then(
      (response) => {
        expect(response.status).to.eq(200);
        const twentiethBookingId = response.body[19].bookingid;
        // Fetch booking details for the 20th booking ID
        cy.request(
          "GET",
          `https://restful-booker.herokuapp.com/booking/${twentiethBookingId}`
        ).then((bookingResponse) => {
          expect(bookingResponse.status).to.eq(200);
          bookingDetailsForId20 = bookingResponse.body;
          // Log stored booking details for ID 20
          cy.log(
            `Stored details for ID 20: ${JSON.stringify(bookingDetailsForId20)}`
          );
          // Filter booking data using parameters
          const firstname = bookingDetailsForId20.firstname;
          const lastname = bookingDetailsForId20.lastname;
          const checkin = bookingDetailsForId20.bookingdates.checkin;
          const checkout = bookingDetailsForId20.bookingdates.checkout;
          // Fetch and count bookings by firstname
          cy.request(
            "GET",
            `https://restful-booker.herokuapp.com/booking?firstname=${firstname}`
          ).then((filterResponse) => {
            expect(filterResponse.status).to.eq(200);
            cy.log(
              `Total count of matches: by firstname (${firstname}): ${filterResponse.body.length}`
            );
          });
          // Fetch and count bookings by lastname
          cy.request(
            "GET",
            `https://restful-booker.herokuapp.com/booking?lastname=${lastname}`
          ).then((filterResponse) => {
            expect(filterResponse.status).to.eq(200);
            cy.log(
              `Total count of matches: by lastname (${lastname}): ${filterResponse.body.length}`
            );
          });
          // Fetch and count bookings by checkin date
          cy.request(
            "GET",
            `https://restful-booker.herokuapp.com/booking?checkin=${checkin}`
          ).then((filterResponse) => {
            expect(filterResponse.status).to.eq(200);
            cy.log(
              `Total count of matches: by checkin date (${checkin}): ${filterResponse.body.length}`
            );
          });
          // Fetch and count bookings by checkout date
          cy.request(
            "GET",
            `https://restful-booker.herokuapp.com/booking?checkout=${checkout}`
          ).then((filterResponse) => {
            expect(filterResponse.status).to.eq(200);
            cy.log(
              `Total count of matches : by checkout date (${checkout}): ${filterResponse.body.length}`
            );
          });
        });
      }
    );
  });
});

describe("3.Testing- Create Booking", () => {
  it("Create a new booking and verify the response", () => {
    const bookingPayload = {
      firstname: "SAsI",
      lastname: "Kumar",
      totalprice: 1520,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-01-20",
        checkout: "2025-01-23",
      },
      additionalneeds: "Testing addinmg new book",
    };

    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: bookingPayload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bookingid");

      // Verify booking details in the response
      const bookingResponse = response.body.booking;
      cy.log(
        `Booking created successfully: ${JSON.stringify(bookingResponse)}`
      );
      expect(bookingResponse.firstname).to.eq(bookingPayload.firstname);
      expect(bookingResponse.lastname).to.eq(bookingPayload.lastname);
      expect(bookingResponse.totalprice).to.eq(bookingPayload.totalprice);
      expect(bookingResponse.depositpaid).to.eq(bookingPayload.depositpaid);
      expect(bookingResponse.bookingdates.checkin).to.eq(
        bookingPayload.bookingdates.checkin
      );
      expect(bookingResponse.bookingdates.checkout).to.eq(
        bookingPayload.bookingdates.checkout
      );
      expect(bookingResponse.additionalneeds).to.eq(
        bookingPayload.additionalneeds
      );
    });
  });
});
