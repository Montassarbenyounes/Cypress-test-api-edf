import { CarbonFootprintRequest } from '../../support/types/api.types';

describe('Carbon Footprint Simulator API Tests', () => {
  let carbonFootprintData: CarbonFootprintRequest;

  before(() => {
    cy.fixture('carbonFootprint').then((data) => {
      carbonFootprintData = data.defaultRequest;
    });
  });

  it('should calculate carbon footprint with valid data', () => {
    cy.visit('/entreprises/simulateur-impact-carbone#/start');
    cy.get('#popin_tc_privacy_button_3').click();
    cy.get('button.btn.mt-5.flex.gap-2.bg-white.px-6.py-3.text-base').click();

    cy.getEdfCsrfToken().then((token) => {
      cy.calculateCarbonFootprint(carbonFootprintData, token).then((response) => {
        expect(response.results.yearly).to.eq('0.6');
        expect(response.results.emissions_per_employee).to.eq('0.2');
      });
    });
  });
});