const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  },
  reporterEnabled: 'spec, mocha-junit-reporter, mochawesome',
  mochaJunitReporterReporterOptions: {
    mochaFile: 'cypress/results/junit/results-[hash].xml',
  }
})