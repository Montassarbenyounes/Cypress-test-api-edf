describe('simulateur', () => {

  it('test api simulatoremprunt carbonne', () => {

    cy.visit('https://www.edf.fr/entreprises/simulateur-impact-carbone#/start')
    cy.get('#popin_tc_privacy_button_3').click()
    cy.get('button.btn.mt-5.flex.gap-2.bg-white.px-6.py-3.text-base').click()

    cy.request({
      method: 'GET',
      url: 'https://www.edf.fr/session/token'
    }).then((response) => {
 expect(response.status).to.eq(200)
 const token=response.body

      cy.request({
        method: 'POST',
        url: 'https://www.edf.fr/entreprises/api/v1/carbon-footprint',

        headers: {
          'Content-Type': 'application/json' , 
                   'x-csrf-token':token

        },
        body: {
          "codeNaf": "47.11B",
          "employeeNumber": 4,
          "turnoverAmount": 200000,
          "energies": {
            "electric": {
              "value": 20,
              "units": "euro",
              "recurrence": "yearly"
            },
            "fuel": {
              "value": 20,
              "units": "euro",
              "recurrence": "yearly"
            },
            "gaz": {
              "value": 20,
              "units": "euro",
              "recurrence": "yearly"
            }
          },
          "realestates": {
            "type": "building",
            "age": "new",
            "surface": 50
          },
          "transports": {
            "vehicles": {
              "value": 4,
              "units": "km",
              "recurrence": "yearly"
            },
            "public": {
              "value": 1,
              "units": "km",
              "recurrence": "yearly"
            },
            "flights": {
              "value": 1,
              "units": "km",
              "recurrence": "yearly"
            }
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
        expect(response.body.results.yearly).to.eq("0.6");
        expect(response.body.results).to.have.property('emissions_per_employee','0.2');

      })

    })

  })

})
