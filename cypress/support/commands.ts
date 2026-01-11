/// <reference types="cypress" />
import { UsersResponse, User, LoginResponse, CarbonFootprintRequest, CarbonFootprintResponse } from './types/api.types';

// Generic API request command
Cypress.Commands.add('apiRequest', (method: string, url: string, options = {}) => {
  return cy.request({
    method,
    url,
    ...options
  });
});

// Get all users from DummyJSON API
Cypress.Commands.add('getAllUsers', () => {
  return cy.request('GET', 'https://dummyjson.com/users').then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body as UsersResponse);
  });
});

// Get a specific user by ID
Cypress.Commands.add('getUser', (userId: number) => {
  return cy.request('GET', `https://dummyjson.com/users/${userId}`).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body as User);
  });
});

// Login user and get access token
Cypress.Commands.add('loginUser', (username: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: 'https://dummyjson.com/auth/login',
    body: { username, password }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body as LoginResponse);
  });
});

// Search users by query
Cypress.Commands.add('searchUsers', (query: string) => {
  return cy.request('GET', `https://dummyjson.com/users/search?q=${query}`).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body as UsersResponse);
  });
});

// Get CSRF token from EDF page
Cypress.Commands.add('getEdfCsrfToken', () => {
  return cy.get('input[name="form_build_id"]')
    .invoke('val')
    .then((token) => {
      expect(token).to.exist;
      return token as string;
    });
});

// Calculate carbon footprint
Cypress.Commands.add('calculateCarbonFootprint', (requestData: CarbonFootprintRequest, csrfToken: string) => {
  return cy.apiRequest('POST', 'https://www.edf.fr/entreprises/api/carbon-footprint', {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: requestData,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201]);
    return response.body as CarbonFootprintResponse;
  });
});

// TypeScript declarations
declare global {
  namespace Cypress {
    interface Chainable {
      apiRequest(method: string, url: string, options?: Partial<Cypress.RequestOptions>): Chainable<Cypress.Response<any>>;
      getAllUsers(): Chainable<UsersResponse>;
      getUser(userId: number): Chainable<User>;
      loginUser(username: string, password: string): Chainable<LoginResponse>;
      searchUsers(query: string): Chainable<UsersResponse>;
      getEdfCsrfToken(): Chainable<string>;
      calculateCarbonFootprint(requestData: CarbonFootprintRequest, csrfToken: string): Chainable<CarbonFootprintResponse>;
    }
  }
}