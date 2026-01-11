import HeaderComponent from "../pages/composants/headercomponement";

/// <reference types="cypress" />

const header: HeaderComponent = new HeaderComponent();

describe('Logo - Vérification du style (fusion des 2 méthodes)', () => {

  context('Desktop logo', () => {

    beforeEach(() => {
      cy.visit('https://automationexercise.com/');
    });

    // 1️⃣ MÉTHODE 1 : .should() (simple et lisible)
   it('Vérification du style du logo avec .should()', () => {
  // Vérifier <img> du logo
  header.logoImage
    .should('have.css', 'vertical-align', 'middle')
    .and('have.css', 'border', '0px none rgb(66, 139, 202)');

  // Vérifier le lien parent <a>
  header.logoImage
    .parent()
    .should('have.css', 'color', 'rgb(66, 139, 202)');  // #428bca

  // Vérifier le style responsive
  cy.viewport(479, 800);
  cy.get('.logo')
    .should('have.css', 'text-align', 'center')
    .and('have.css', 'font-size', '14px');
});


    // 2️⃣ MÉTHODE 2 : expect() + jQuery $
    it('Vérification du style du logo avec expect() et $', () => {
// Récupère l'élément du logo via jQuery $
      cy.get('.logo img').then(($img) => {
        expect($img.css('vertical-align')).to.equal('middle');
        expect($img.css('border')).to.contain('0px'); // border = 0px
      });


      // Vérifier le <a> parent
      cy.get('.logo img')
        .parent()
        .then(($parent) => {
          expect($parent.css('color')).to.equal('rgb(66, 139, 202)');
        });

      // Responsive mobile
      cy.viewport(479, 800);

      cy.get('.logo').then(($logo) => {
        expect($logo.css('text-align')).to.equal('center');
        expect($logo.css('font-size')).to.equal('14px');
      });
    });


it ('vérification style bouton test api' , ()  => {
  
cy.get('a[href="/api_list"]').should('be.visible').and('have.css','font-size','14px')
})



it.only('vérification selecteurs d une autre façon' , () => {
header.newSelecteurs.should('be.visible').and('have.css','font-size','14px')
header.newSelecteurs.should('be.visible').and('have.css','box-sizing','border-box')
header.newSelecteurs.should('be.visible').and('have.css' ,'-webkit-text-size-adjust','100%')
header.newSelecteurs.should('be.visible').and('have.css','color','rgb(105, 103, 99)')
})
  });


});
