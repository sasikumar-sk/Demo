const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '17rni8',
  e2e: {
    experimentalSessionAndOrigin: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
     
    },
  },
});
