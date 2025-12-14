// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    //baseUrl: "https://automationexercise.com/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    setupNodeEvents(on, config) {

    },
  },

  
});
