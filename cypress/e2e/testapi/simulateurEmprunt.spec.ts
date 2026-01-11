import { CarbonFootprintRequest } from '../../support/types/api.types';

describe('Carbon Footprint Simulator API Tests', () => {
  let carbonFootprintData: CarbonFootprintRequest;

  before(() => {
    cy.fixture('carbonFootprint').then((data) => {
      carbonFootprintData = data.defaultRequest;
    });
  });

  it('should calculate carbon footprint with valid data', () => {
    // Appel direct à l'API sans passer par l'interface
    cy.request({
      method: 'POST',
      url: 'https://www.edf.fr/entreprises/api/carbon-footprint',
      headers: {
        'Content-Type': 'application/json'
      },
      body: carbonFootprintData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      if (response.body.results) {
        expect(response.body.results).to.have.property('yearly');
        expect(response.body.results).to.have.property('emissions_per_employee');
      }
    });
  });
});