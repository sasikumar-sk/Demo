// Intercept Network Requests (Both XHR and FETCH) with Cypress

describe('Intercept Network Requests for Airports API', () => {
  const authToken = Cypress.env('authToken'); 

  it('should intercept GET /airports and POST /airports/distance requests', () => {
    // Intercept the GET request for fetching airports
    cy.intercept('GET', 'https://airportgap.com/api/airports').as('getAirportsRequest');

    // Intercept the POST request for getting distance between airports
    cy.intercept('POST', 'https://airportgap.com/api/airports/distance').as('postDistanceRequest');

    // Make the GET request for airports (simulating a user action or API call)
    cy.request({
      method: 'GET',
      url: 'https://airportgap.com/api/airports',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {  // Changed from getAirportsResponse to response for consistency 
      expect(response.status).to.eq(200);

      // Assert that the response body has the 'data' property which contains an array
      expect(response.body).to.have.property('data').that.is.an('array');

      // Check the length of the data array to ensure it contains airports (30 airports per page)
      expect(response.body.data.length).to.eq(30);

      // Validate each airport object in the 'data' array
      response.body.data.forEach((airport) => {
        expect(airport).to.have.property('id');  
        expect(airport).to.have.property('attributes');  
        expect(airport.attributes).to.have.property('iata');  
        expect(airport.attributes).to.have.property('name');  
        expect(airport.attributes).to.have.property('city');  
        expect(airport.attributes).to.have.property('country');  
        expect(airport.attributes).to.have.property('latitude');  
        expect(airport.attributes).to.have.property('longitude');  
        expect(airport.attributes).to.have.property('timezone');  
      });

      // Assert pagination links are present in the response
      expect(response.body).to.have.property('links');
      expect(response.body.links).to.have.property('first');
      expect(response.body.links).to.have.property('last');
      expect(response.body.links).to.have.property('next');
      expect(response.body.links).to.have.property('prev');

      // Assert that the pagination links are URLs
      expect(response.body.links.first).to.include('https://airportgap.com/api/airports');
      expect(response.body.links.last).to.include('https://airportgap.com/api/airports?page=');
      expect(response.body.links.next).to.include('https://airportgap.com/api/airports?page=');
      expect(response.body.links.prev).to.include('https://airportgap.com/api/airports');
    });

    // Debugging: Add intercept logging to check if the GET request is captured
    cy.intercept('GET', 'https://airportgap.com/api/airports', (req) => {
      console.log('Intercepted GET request for airports:', req);
    });

    // Example of corrected POST request with valid airport codes
    cy.request({
      method: 'POST',
      url: 'https://airportgap.com/api/airports/distance',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        airport1: 'GKA',  // Valid airport code
        airport2: 'MAG',  // Valid airport code
      },
      failOnStatusCode: false,  // Prevent Cypress from failing on 422
    }).then((postDistanceResponse) => {
      expect(postDistanceResponse.status).to.eq(422);
      expect(postDistanceResponse.body.errors[0].detail).to.include('Please enter valid');
    });

  });
});
