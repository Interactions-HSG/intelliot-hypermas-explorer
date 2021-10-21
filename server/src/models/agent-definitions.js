const { createSchema } = require('./model-utils')

module.exports = createSchema('AgentDefinition', 'AgentDefinitions', mongoose => ({
  id: String,
  code: String,
  xml: String
}))
