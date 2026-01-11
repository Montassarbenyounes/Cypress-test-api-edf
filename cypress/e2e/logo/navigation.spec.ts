/// <reference types="cypress" />

import NavigationMenuComponent from "../pages/composants/navigationmenucomponement";

const navigationMenu = new NavigationMenuComponent();

describe('Navbar - Vérification du style', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/');          // Site de test
  });

  it('Vérifier les styles du navbar', () => {

    // Navbar visible
    navigationMenu.element.should('be.visible');

    // 1) margin du .navbar-nav  -> valeur réelle : 0px
    cy.get('.navbar-nav')
      .should('have.css', 'margin', '0px');

    // 2) padding-left de .nav  (padding-inline-start: 40px)
    cy.get('.nav')
      .should('have.css', 'padding-left', '0px');

    // 3) margin-block-start / end  (≈ 1em -> 16px)
    cy.get('.nav')
      .should('have.css', 'margin-top', '0px')
      .and('have.css', 'margin-bottom', '0px');
  });

  it('Vérifier comportement responsive du navbar (<480px)', () => {
    cy.viewport(480, 800);

    cy.get('.shop-menu .nav.navbar-nav')
      .should('have.css', 'margin-left', '0px');
  });

  it('Vérifier les styles du lien Home', () => {

    // On prend le lien Home dans la navbar
    cy.get('.navbar-nav li a').contains('Home').then(($a) => {

      // Couleur réelle du site : bleu #428bca -> rgb(66, 139, 202)
      expect($a.css('color')).to.equal('rgb(255, 165, 0)');

      expect($a.css('font-size')).to.equal('14px');
      expect($a.css('font-weight')).to.equal('300');

      expect($a.css('padding-top')).to.equal('0px');
      expect($a.css('padding-right')).to.equal('0px');
      expect($a.css('padding-bottom')).to.equal('0px');
      expect($a.css('padding-left')).to.equal('0px');

      expect($a.css('margin-top')).to.equal('10px');
    });
  });

});
