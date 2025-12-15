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
    });
  });

  it('should login user and receive access token', () => {
    cy.loginUser(testData.loginCredentials.username, testData.loginCredentials.password).then((response) => {
      expect(response.accessToken).to.exist;
      expect(response.username).to.eq(testData.loginCredentials.username);
    });
  });

  it('should get a single user by ID', () => {
    cy.getUser(1).then((user) => {
      expect(user.id).to.eq(1);
      expect(user.firstName).to.exist;
      expect(user.lastName).to.exist;
    });
  });

  it('should search users by query', () => {
    cy.searchUsers(testData.searchQuery).then((response) => {
      expect(response.users).to.be.an('array');
      expect(response.users.length).to.be.greaterThan(0);
      expect(response.users[0]).to.have.property('id');
      expect(response.users[0]).to.have.property('firstName');
      expect(response.users[0]).to.have.property('lastName');
    });
  });
});    