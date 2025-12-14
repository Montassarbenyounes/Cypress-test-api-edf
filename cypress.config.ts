import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: "https://www.edf.fr",
    specPattern: "cypress/e2e/**/*.spec.ts",
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // Setup node events here if needed
      return config;
    },
    env: {
      DUMMY_JSON_API: "https://dummyjson.com",
      EDF_API: "https://www.edf.fr"
    }
  }
});