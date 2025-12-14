/// <reference types="cypress" />

export default class HeaderComponent {

  get headerComponent() {
    return cy.get('.header-middle');
  }

  get logoImage() {
    return this.headerComponent.find('a > img');
  }

  get logoContainer() {
    return cy.get('.logo');
  }
  get newSelecteurs () {
    return cy.get('a[href="/api_list"]') ; 
  }
}
