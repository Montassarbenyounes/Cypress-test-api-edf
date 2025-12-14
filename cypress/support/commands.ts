/// <reference types="cypress" />
import { UsersResponse, User, LoginResponse, CarbonFootprintRequest, CarbonFootprintResponse } from './types/api.types';

// 8 custom commands créés:
Cypress.Commands.add('apiRequest', (method, url, options) => { /* ... */ });
Cypress.Commands.add('getAllUsers', () => { /* ... */ });
Cypress.Commands.add('getUser', (userId) => { /* ... */ });
Cypress.Commands.add('loginUser', (username, password) => { /* ... */ });
Cypress.Commands.add('searchUsers', (query) => { /* ... */ });
Cypress.Commands.add('getEdfCsrfToken', () => { /* ... */ });
Cypress.Commands.add('calculateCarbonFootprint', (requestData, csrfToken) => { /* ... */ });

declare global {
  namespace Cypress {
    interface Chainable {
      // Type declarations for all commands
    }
  }
}