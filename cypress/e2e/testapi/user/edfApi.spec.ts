describe('test api', () => {
   it('test formulaire', () => {
    cy.request({
      method:'POST',
      url:'https://www.edf.fr/entreprises/contacter-votre-conseiller-edf-entreprises?...',
      headers: {'Content-Type': 'application/json'},
      body: {
        "type_demande":"branchement_provisoire_bleu",
        "mail_client":"montassarbenyounes773@gmail.com",
        // ... 20+ champs
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
   })
})