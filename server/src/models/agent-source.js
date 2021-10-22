const { createSchema } = require('./model-utils')

module.exports = createSchema('AgentSource', 'AgentSources', mongoose => ({
  id: { type : String , unique : true, required : true, dropDups: true },
  code: String,
  xml: String
}))
