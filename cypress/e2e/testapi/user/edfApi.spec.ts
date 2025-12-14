describe('EDF Contact Form API Tests', () => {
  let formData: any;
  const baseUrl = Cypress.env('EDF_API');

  before(() => {
    cy.fixture('edfContactForm').then((data) => {
      formData = data.defaultFormData;
    });
  });

  it('should submit contact form successfully', () => {
    const queryParams = 'type_demande=branchement_provisoire_bleu&ajax_form=1&_wrapper_format=drupal_ajax';
    
    cy.apiRequest('POST', `${baseUrl}/entreprises/contacter-votre-conseiller-edf-entreprises?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});