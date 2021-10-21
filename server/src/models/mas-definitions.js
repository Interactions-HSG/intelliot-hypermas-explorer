const { createSchema } = require('./model-utils')

module.exports = createSchema('MASDefinition', 'MASDefinitions', mongoose => ({
  id: String,
  agents: [
    {
      name: String,
      type: String
    }
  ]
}))