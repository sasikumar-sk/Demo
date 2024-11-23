const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '17rni8',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
