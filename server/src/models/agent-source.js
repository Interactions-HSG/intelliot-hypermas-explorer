const { createSchema } = require('./model-utils')

module.exports = createSchema('AgentSource', 'AgentSources', mongoose => ({
  id: String,
  code: String,
  xml: String
}))
