describe('JSONPlaceholder API Tests', () => {

    const baseUrl = 'https://jsonplaceholder.typicode.com';
  
    // Test GET request: Fetch all posts
    it('Should fetch all posts', () => {
      cy.request('GET', `${baseUrl}/posts`)
        .should((response) => {
          expect(response.status).to.eq(200);  // Status should be 200 OK
          expect(response.body).to.be.an('array');  // The response body should be an array
          expect(response.body.length).to.be.greaterThan(0);  // Should return more than 0 posts
        });
    });
  
    // Test GET request: Fetch a single post by ID
    it('Should fetch a post by ID', () => {
      cy.request('GET', `${baseUrl}/posts/1`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 1);  // ID should be 1
          expect(response.body).to.have.property('title');  // Should have a title
        });
    });
  
    // Test POST request: Create a new post
    it('Should create a new post', () => {
      const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
      };
      
      cy.request('POST', `${baseUrl}/posts`, newPost)
        .should((response) => {
          expect(response.status).to.eq(201);  // Status should be 201 (Created)
          expect(response.body).to.have.property('title', 'foo');  // The created post should have the title 'foo'
          expect(response.body).to.have.property('body', 'bar');  // The created post should have the body 'bar'
        });
    });
  
    // Test PUT request: Update a post by ID
    it('Should update a post by ID', () => {
      const updatedPost = {
        id: 1,
        title: 'Updated Title',
        body: 'Updated body',
        userId: 1
      };
      
      cy.request('PUT', `${baseUrl}/posts/1`, updatedPost)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('title', 'Updated Title');  // Title should be updated
          expect(response.body).to.have.property('body', 'Updated body');  // Body should be updated
        });
    });
  
    // Test PATCH request: Partially update a post by ID
    it('Should partially update a post by ID', () => {
      const patchData = {
        title: 'Partially Updated Title'
      };
      
      cy.request('PATCH', `${baseUrl}/posts/1`, patchData)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('title', 'Partially Updated Title');  // Only the title should be updated
        });
    });
  
    // Test DELETE request: Delete a post by ID
    it('Should delete a post by ID', () => {
      cy.request('DELETE', `${baseUrl}/posts/1`)
        .should((response) => {
          expect(response.status).to.eq(200);  // Status should be 200 (OK) indicating successful deletion
        });
    });
  
  });
  