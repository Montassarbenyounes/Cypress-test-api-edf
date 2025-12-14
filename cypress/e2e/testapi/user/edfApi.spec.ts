describe('EDF Contact Form API Tests', () => {
  let formData: any;

  before(() => {
    cy.fixture('edfContactForm').then((data) => {
      formData = data.defaultFormData;
    });
  });

  it('should submit contact form successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://www.edf.fr/entreprises/contacter-votre-conseiller-edf-entreprises',
      headers: { 'Content-Type': 'application/json' },
      body: formData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
    });
  });
});