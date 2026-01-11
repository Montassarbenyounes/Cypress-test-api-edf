describe('User API Tests', () => {
  let testData: any;

  before(() => {
    cy.fixture('users').then((data) => {
      testData = data;
    });
  });

  it('should get all users successfully', () => {
    cy.getAllUsers().then((response) => {
      expect(response.users).to.be.an('array');
      expect(response.total).to.be.greaterThan(0);
      expect(response.users.length).to.be.greaterThan(0);
      // Vérifier la structure du premier utilisateur
      expect(response.users[0]).to.have.property('id');
      expect(response.users[0]).to.have.property('firstName');
      expect(response.users[0]).to.have.property('lastName');
    });
  });

  it('should get a specific user by ID', () => {
    const userId = 1;
    cy.getUser(userId).then((response) => {
      expect(response.id).to.eq(userId);
      expect(response.firstName).to.exist;
      expect(response.lastName).to.exist;
    });
  });

  it('should login user and receive access token', () => {
    cy.loginUser(testData.loginCredentials.username, testData.loginCredentials.password).then((response) => {
      expect(response.accessToken).to.exist;
      expect(response.refreshToken).to.exist;
      expect(response.username).to.eq(testData.loginCredentials.username);
      expect(response.email).to.exist;
      expect(response.firstName).to.exist;
      expect(response.lastName).to.exist;
    });
  });

  it('should search users by query', () => {
    cy.searchUsers(testData.searchQuery).then((response) => {
      expect(response.users).to.be.an('array');
      // Vérifier que les résultats contiennent la requête de recherche
      if (response.users.length > 0) {
        const firstUser = response.users[0];
        const searchLower = testData.searchQuery.toLowerCase();
        const userString = JSON.stringify(firstUser).toLowerCase();
        expect(userString).to.include(searchLower);
      }
    });
  });
});