import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    login_url: '/api/account/login',
    email: "sonvancs@gmail.com",
    password: "atest"
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
    },
    supportFile: false
  },
});
