describe('PokeAPI Automation Testing', () => { 
    it('should get a list of Pokémon', () => {
      cy.request('https://pokeapi.co/api/v2/pokemon')  // GET request to PokeAPI
        .should((response) => {
          // Check the status code is 200 (OK)
          expect(response.status).to.eq(200);
          // Check that the response body contains an array of results (list of Pokémon)
          expect(response.body.results).to.be.an('array');          
          // Check that the first Pokémon has the expected fields
          expect(response.body.results[0]).to.have.property('name');
          expect(response.body.results[0]).to.have.property('url');
        });
    });
  
    // Test GET request for a specific Pokémon (e.g., Pikachu)
    it('should get data for Pikachu', () => {
      cy.request('https://pokeapi.co/api/v2/pokemon/pikachu') // GET request for Pikachu
        .should((response) => {
          expect(response.status).to.eq(200);  
          // Check that the response body has the expected structure
          expect(response.body).to.have.property('name', 'pikachu'); 
          expect(response.body).to.have.property('sprites');
          expect(response.body.sprites).to.have.property('front_default');  // Check sprite URL 
          expect(response.body.abilities[0].ability.name).to.eq('static');
          expect(response.body.abilities[1].ability.name).to.eq('lightning-rod');
          expect(response.body.abilities[1].is_hidden).to.be.true;
          expect(response.body.base_experience).to.eq(112);
        });
    });
  
    // Test invalid Pokémon request (for example sasi, a Pokémon that does not exist)
    it('should return 404 for non-existing Pokémon', () => {
      cy.request({
        url: 'https://pokeapi.co/api/v2/pokemon/sasi',  
        failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status
      }).should((response) => {
        // Check that the status code is 404 (Not Found)
        expect(response.status).to.eq(404); 
        expect(response.body).to.include('Not Found');
          });
    });
  
    // Test request with query parameters (for pagination)
    it('should get a paginated list of Pokémon', () => {
      cy.request('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')  // Limit to 5 Pokémon and start from the beginning
        .should((response) => {
          expect(response.status).to.eq(200);  
          // Check that the response body has a results array with a length of 5
          expect(response.body.results.length).to.eq(5);  
          // Ensure the results array contains Pokémon names
          expect(response.body.results[0]).to.have.property('name');
        });
    });
  
    // Test POST request (example: Creating a resource, if PokeAPI supports it)
    it('should fail for POST request since PokeAPI is read-only', () => {
      cy.request({
        method: 'POST',
        url: 'https://pokeapi.co/api/v2/pokemon', // POST request to create a new Pokémon
        body: {
          name: 'testpokemon',
          type: 'electric'
        },
        failOnStatusCode: false  // To prevent Cypress from failing the test on 4xx/5xx status
      }).should((response) => {
        
        expect(response.status).to.eq(404);
      });
    });
  });
  