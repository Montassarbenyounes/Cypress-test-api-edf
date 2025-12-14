export default defineConfig({
  e2e: {
    baseUrl: "https://www.edf.fr",
    specPattern: "cypress/e2e/**/*.spec.ts",
    setupNodeEvents(on, config) {
      // Setup node events here if needed
    },
    env: {
      DUMMY_JSON_API: "https://dummyjson.com",
      EDF_API: "https://www.edf.fr"
    }
  }
});