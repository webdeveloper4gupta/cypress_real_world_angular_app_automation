const { defineConfig } = require("cypress");
// here i add the packages,dependencies,configuration changes like timeoutchange
module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: "cypress/e2e/*.{js,jsx,ts,tsx,feature}"
    },
});

// use yo change the default settings