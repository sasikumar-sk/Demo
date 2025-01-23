describe("Testing Routes URLs", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  // Test GET request: Fetch all posts
  it("Should fetch all posts", () => {
    cy.request("GET", `${baseUrl}/posts`).should((response) => {
      expect(response.status).to.eq(200); // Status should be 200 OK
      expect(response.body).to.be.an("array"); // The response body should be an array
      expect(response.body.length).to.be.greaterThan(0); // Should return more than 0 posts
    });
  });

  // Test GET request: Fetch a single post by ID
  it("Should fetch a post by ID", () => {
    cy.request("GET", `${baseUrl}/posts/1`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 1);  
      expect(response.body).to.have.property("title");  
    });
  });

  // Test POST request: Create a new post
  it("Should create a new post", () => {
    const newPost = {
      title: "Post1",
      body: "Test CY",
      userId: 1,
    };

    cy.request("POST", `${baseUrl}/posts`, newPost).should((response) => {
      expect(response.status).to.eq(201); // Status should be 201  
      expect(response.body).to.have.property("title", "Post1");  
      expect(response.body).to.have.property("body", "Test CY");  
    });
  });

  // Test PUT request: Update a post by ID
  it("Should update a post by ID", () => {
    const updatedPost = {
      id: 1,
      title: "Updated Title 1",
      body: "Updated body 1",
      userId: 1,
    };

    cy.request("PUT", `${baseUrl}/posts/1`, updatedPost).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title", "Updated Title 1"); // Title should be updated
      expect(response.body).to.have.property("body", "Updated body 1"); // Body should be updated
    });
  });

  // Test PATCH request: Partially update a post by ID
  it("Should partially update a post by ID", () => {
    const patchData = { title: "Partially Updated Title 2",};

    cy.request("PATCH", `${baseUrl}/posts/1`, patchData).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title","Partially Updated Title 2"); // Only the title should be updated
    });
  });

  // Test DELETE request: Delete a post by ID
  it("Should delete a post by ID", () => {
    cy.request("DELETE", `${baseUrl}/posts/1`).should((response) => {
      expect(response.status).to.eq(200); // Status should be 200 (OK)
    });
  });
});

describe("Testing Resources URLs", () => {
  it("Get comment with postId 3 and validate JSON data values", () => {
    cy.request(
      "GET",
      "https://jsonplaceholder.typicode.com/comments?postId=3"
    ).then((response) => {
      expect(response.status).to.eq(200);
      // Find the specific comment with id 12
      const comment = response.body.find((comment) => comment.id === 12);
      expect(comment).to.have.property("postId", 3);
      expect(comment).to.have.property("id", 12);
      expect(comment).to.have.property(
        "name",
        "modi ut eos dolores illum nam dolor"
      );
      expect(comment).to.have.property("email", "Oswald.Vandervort@leanne.org");
      expect(comment).to.have.property(
        "body",
        "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit"
      );

      cy.log(JSON.stringify(comment));
    });
  });

  it("Validate specific comment data", () => {
    const expectedData = {
      postId: 100,
      id: 500,
      name: "ex eaque eum natus",
      email: "Emma@joanny.ca",
      body: "perspiciatis quis doloremque\nveniam nisi eos velit sed\nid totam inventore voluptatem laborum et eveniet\naut aut aut maxime quia temporibus ut omnis",
    };

    cy.request("GET", "https://jsonplaceholder.typicode.com/comments/500").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(expectedData);

        cy.log(JSON.stringify(response.body));
      }
    );
  });

  it("Validate albums data", () => {
    const albumsToCheck = [
      {
        userId: 3,
        id: 28,
        title: "omnis neque exercitationem sed dolor atque maxime aut cum",
      },
      {
        userId: 10,
        id: 100,
        title: "enim repellat iste",
      },
    ];

    albumsToCheck.forEach((album) => {
      it(`Validate album with id ${album.id}`, () => {
        cy.request(
          "GET",
          `https://jsonplaceholder.typicode.com/albums/${album.id}`
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(album);

          cy.log(JSON.stringify(response.body));
        });
      });
    });
  });
  it("Fetch and display total count of albumId, id, thumbnailUrl, and url", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/photos").then(
      (response) => {
        expect(response.status).to.eq(200);

        // Initialize counters
        let albumIdCount = 0;
        let idCount = 0;
        let thumbnailUrlCount = 0;
        let urlCount = 0;
        // Count the occurrences of albumId, id, thumbnailUrl, and url
        response.body.forEach((photo) => {
          if (photo.albumId) albumIdCount++;
          if (photo.id) idCount++;
          if (photo.thumbnailUrl) thumbnailUrlCount++;
          if (photo.url) urlCount++;
        });
        // Log the total counts
        cy.log(`Total count of albumId: ${albumIdCount}`);
        cy.log(`Total count of id: ${idCount}`);
        cy.log(`Total count of thumbnailUrl: ${thumbnailUrlCount}`);
        cy.log(`Total count of url: ${urlCount}`);
      }
    );
  });

  it("Fetch and validate data for id 1107", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/photos/1107").then(
      (response) => {
        expect(response.status).to.eq(200);
        // Validate the specific data for id 1107
        const expectedData = {
          albumId: 23,
          id: 1107,
          title: "distinctio soluta voluptas vel sit assumenda",
          url: "https://via.placeholder.com/600/3147bf",
          thumbnailUrl: "https://via.placeholder.com/150/3147bf",
        };

        expect(response.body).to.deep.equal(expectedData);

        cy.log(JSON.stringify(response.body));
      }
    );
  });
  it('Fetch and validate user data for id 6', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users/6')
      .then((response) => {
        expect(response.status).to.eq(200); 
        const expectedData = {
          "id": 6,
          "name": "Mrs. Dennis Schulist",
          "username": "Leopoldo_Corkery",
          "email": "Karley_Dach@jasper.info",
          "address": {
            "street": "Norberto Crossing",
            "suite": "Apt. 950",
            "city": "South Christy",
            "zipcode": "23505-1337",
            "geo": {
              "lat": "-71.4197",
              "lng": "71.7478"
            }
          },
          "phone": "1-477-935-8478 x6430",
          "website": "ola.org",
          "company": {
            "name": "Considine-Lockman",
            "catchPhrase": "Synchronised bottom-line interface",
            "bs": "e-enable innovative applications"
          }
        };

        expect(response.body).to.deep.equal(expectedData);

        cy.log(JSON.stringify(response.body));
      });
  });
  it('Fetch and validate specific user data attributes across different users and log only the ID value', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        expect(response.status).to.eq(200);

        // Find and validate the user with the name "Ervin Howell"
        const userWithName = response.body.find(user => user.name === "Ervin Howell");
        const expectedName = "Ervin Howell";
        expect(userWithName).to.have.property('name', expectedName);
        cy.log(`User ID : ${userWithName.id} and name : ${expectedName}`);

        // Find and validate the user with the email "Sincere@april.biz"
        const userWithEmail = response.body.find(user => user.email === "Sincere@april.biz");
        const expectedEmail = "Sincere@april.biz";
        expect(userWithEmail).to.have.property('email', expectedEmail);
        cy.log(`User ID : ${userWithEmail.id} and email :${expectedEmail}`);

        // Find and validate the user with the username "Karianne"
        const userWithUsername = response.body.find(user => user.username === "Karianne");
        const expectedUsername = "Karianne";
        expect(userWithUsername).to.have.property('username', expectedUsername);
        cy.log(`User ID : ${userWithUsername.id} and username : ${expectedUsername}`);

        // Find and validate the user with the city "South Elvis"
        const userWithCity = response.body.find(user => user.address.city === "South Elvis");
        const expectedCity = "South Elvis";
        expect(userWithCity.address).to.have.property('city', expectedCity);
        cy.log(`User ID : ${userWithCity.id} and city : ${expectedCity}`);

        // Find and validate the user with the website "demarco.info"
        const userWithWebsite = response.body.find(user => user.website === "demarco.info");
        const expectedWebsite = "demarco.info";
        expect(userWithWebsite).to.have.property('website', expectedWebsite);
        cy.log(`User ID : ${userWithWebsite.id} and website: ${expectedWebsite}`);

        // Find and validate the user with the phone "1-477-935-8478 x6430"
        const userWithPhone = response.body.find(user => user.phone === "1-477-935-8478 x6430");
        const expectedPhone = "1-477-935-8478 x6430";
        expect(userWithPhone).to.have.property('phone', expectedPhone);
        cy.log(`User ID : ${userWithPhone.id} and phone :${expectedPhone}`);

        // Find and validate the user with the zipcode "31428-2261"
        const userWithZipcode = response.body.find(user => user.address.zipcode === "31428-2261");
        const expectedZipcode = "31428-2261";
        expect(userWithZipcode.address).to.have.property('zipcode', expectedZipcode);
        cy.log(`User ID : ${userWithZipcode.id} and zipcode :${expectedZipcode}:`);
      });
  });
});
