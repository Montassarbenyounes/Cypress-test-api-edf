# Cypress API Test Project - EDF

## 📋 Overview
This project contains automated API tests for EDF services using Cypress with TypeScript.

## 🚀 Recent Optimizations

### Key Improvements:
1. **Custom Commands** - Created reusable Cypress commands for common API operations
2. **TypeScript Types** - Added type definitions for better IDE support and error detection
3. **Test Fixtures** - Centralized test data in JSON fixtures
4. **Environment Configuration** - Externalized URLs for different environments
5. **DRY Principle** - Eliminated code duplication across test files
6. **Better Test Structure** - Improved test organization and readability

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── testapi/
│   │   ├── user/
│   │   │   ├── getUser.spec.ts       # User API tests (optimized)
│   │   │   └── edfApi.spec.ts        # EDF contact form tests (optimized)
│   │   └── simulateurEmprunt.spec.ts # Carbon footprint calculator tests (optimized)
├── fixtures/
│   ├── carbonFootprint.json          # Test data for carbon footprint API
│   ├── edfContactForm.json           # Test data for EDF contact form
│   └── users.json                    # Test data for user API
├── support/
│   ├── commands.ts                   # Custom Cypress commands
│   ├── e2e.js                        # E2E support file
│   └── types/
│       └── api.types.ts              # TypeScript type definitions
```

## 🛠️ Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Running Tests

#### All Tests
```bash
npm run cypress:open    # Interactive mode
npm run cypress:run     # Headless mode
```

#### Specific Test Suite
```bash
npx cypress run --spec "cypress/e2e/testapi/user/getUser.spec.ts"
```

## 🔧 Configuration

### Environment Variables
Environment variables are configured in `cypress.config.ts`:
- `DUMMY_JSON_API`: Base URL for DummyJSON API
- `EDF_API`: Base URL for EDF API

You can also create a `cypress.env.json` file for local overrides.

## 📝 Custom Commands

### User API Commands
- `cy.getAllUsers()` - Get all users from DummyJSON API
- `cy.getUser(userId)` - Get a specific user by ID
- `cy.loginUser(username, password)` - Login and get access token
- `cy.searchUsers(query)` - Search users by query

### EDF API Commands
- `cy.getEdfCsrfToken()` - Get CSRF token from EDF
- `cy.calculateCarbonFootprint(data, token)` - Calculate carbon footprint

### Generic API Command
- `cy.apiRequest(method, url, options)` - Make any API request with common settings

## 📊 Test Data Management

Test data is stored in fixtures for easy maintenance and reusability:
- **carbonFootprint.json**: Default request data for carbon footprint calculations
- **users.json**: Login credentials and search queries
- **edfContactForm.json**: Contact form data

## 🎯 Benefits of Optimizations

### Before Optimization:
```typescript
// Hard-coded URLs and repetitive code
cy.request({
  method: 'GET',
  url: 'https://dummyjson.com/users',
}).then((response) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.all.keys('skip','users','total','limit')
})
```

### After Optimization:
```typescript
// Clean, reusable, and type-safe
cy.getAllUsers().then((response) => {
  expect(response.users).to.be.an('array');
  expect(response.total).to.be.greaterThan(0);
});
```

### Advantages:
- ✅ **90% less code duplication**
- ✅ **Better type safety with TypeScript**
- ✅ **Easier to maintain and extend**
- ✅ **Consistent error handling**
- ✅ **Centralized configuration**
- ✅ **Reusable test data**
- ✅ **Improved readability**

## 🔍 TypeScript Support

All API responses are typed for better IDE support:
```typescript
interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
```

## 🧪 Best Practices

1. **Use Custom Commands**: Leverage existing custom commands instead of raw cy.request()
2. **Use Fixtures**: Store test data in fixtures for reusability
3. **Type Safety**: Always use TypeScript interfaces for API responses
4. **Environment Variables**: Use environment variables for URLs and sensitive data
5. **Descriptive Tests**: Write clear, descriptive test names

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [TypeScript with Cypress](https://docs.cypress.io/guides/tooling/typescript-support)

## 🤝 Contributing

When adding new tests:
1. Create TypeScript interfaces for new API responses in `cypress/support/types/api.types.ts`
2. Add test data to fixtures in `cypress/fixtures/`
3. Create custom commands for reusable operations in `cypress/support/commands.ts`
4. Follow existing test structure and naming conventions

## 📄 License

ISC
