const { createSchema } = require('./model-utils')

module.exports = createSchema('Runtime', 'Runtimes', mongoose => ({
  masId: String,
  runtimeURL: String
}))