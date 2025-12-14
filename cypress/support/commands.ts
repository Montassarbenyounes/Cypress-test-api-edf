/// <reference types="cypress" />

import { UsersResponse, User, LoginResponse, CarbonFootprintRequest, CarbonFootprintResponse } from './types/api.types';

// Custom command for API requests with common assertions
Cypress.Commands.add('apiRequest', (method: string, url: string, options = {}) => {
  return cy.request({
    method,
    url,
    failOnStatusCode: false,
    ...options
  });
});

// Custom command for getting all users
Cypress.Commands.add('getAllUsers', () => {
  const baseUrl = Cypress.env('DUMMY_JSON_API');
  return cy.apiRequest('GET', `${baseUrl}/users`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.all.keys('skip', 'users', 'total', 'limit');
    return cy.wrap(response.body as UsersResponse);
  });
});

// Custom command for getting a single user
Cypress.Commands.add('getUser', (userId: number) => {
  const baseUrl = Cypress.env('DUMMY_JSON_API');
  return cy.apiRequest('GET', `${baseUrl}/users/${userId}`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include.keys('id', 'firstName', 'lastName', 'age', 'phone');
    return cy.wrap(response.body as User);
  });
});

// Custom command for user login
Cypress.Commands.add('loginUser', (username: string, password: string) => {
  const baseUrl = Cypress.env('DUMMY_JSON_API');
  return cy.apiRequest('POST', `${baseUrl}/user/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username,
      password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('accessToken');
    return cy.wrap(response.body as LoginResponse);
  });
});

// Custom command for searching users
Cypress.Commands.add('searchUsers', (query: string) => {
  const baseUrl = Cypress.env('DUMMY_JSON_API');
  return cy.apiRequest('GET', `${baseUrl}/users/search?q=${query}`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('users');
    expect(response.body).to.have.property('total');
    expect(response.body).to.have.property('skip');
    expect(response.body).to.have.property('limit');
    return cy.wrap(response.body as UsersResponse);
  });
});

// Custom command for getting CSRF token from EDF
Cypress.Commands.add('getEdfCsrfToken', () => {
  const baseUrl = Cypress.env('EDF_API');
  return cy.apiRequest('GET', `${baseUrl}/session/token`).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body as string);
  });
});

// Custom command for carbon footprint calculation
Cypress.Commands.add('calculateCarbonFootprint', (requestData: CarbonFootprintRequest, csrfToken: string) => {
  const baseUrl = Cypress.env('EDF_API');
  return cy.apiRequest('POST', `${baseUrl}/entreprises/api/v1/carbon-footprint`, {
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken
    },
    body: requestData
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('results');
    return cy.wrap(response.body as CarbonFootprintResponse);
  });
});

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