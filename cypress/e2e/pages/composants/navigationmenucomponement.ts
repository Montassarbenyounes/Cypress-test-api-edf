/// <reference types="cypress" />

export default class NavigationMenuComponent {

  // Sélecteur principal du navbar
  get element() {
    return cy.get('.navbar-nav');
  }

  // Tous les liens du navbar
  get linksElements() {
    return cy.get('.navbar-nav li a');
  }

  // Liste des libellés attendus
  links = {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    login: 'Signup / Login',
    testCases: 'Test Cases',
    apiTesting: 'API Testing',
    videoTutorials: 'Video Tutorials',
    contactUs: 'Contact us',
  };
}
