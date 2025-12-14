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
  // ... 40 lignes au total
});