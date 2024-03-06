const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.js',
  },
  env: {
    username: "cytest101@test.us",
    password: "",
    apiURL: "https://conduit-api.bondaracademy.com"
  },
  retries: {
    runMode: 2,
    openMode: 0
  },

  e2e: {
    setupNodeEvents(on, config) {
      // const username = process.env.DB_USERNAME === undefined ? "cytest101@test.us" : process.env.DB_USERNAME
      // const password = process.env.PASSWORD

      // if(!password) {
      //   throw new Error('missing password field')
      // }

      // config.env = !username ? { password } : { username, password }
      // return config
      // implement node event listeners here
    },

    baseUrl: 'https://conduit.bondaracademy.com',

    specPattern: 'cypress/**/*.spec.{js,jsx,ts,tsx}'
  },
});
