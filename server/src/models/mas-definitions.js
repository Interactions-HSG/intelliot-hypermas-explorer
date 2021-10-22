const { createSchema } = require('./model-utils')

module.exports = createSchema('MASDefinition', 'MASDefinitions', mongoose => ({
  id: { type : String , unique : true, required : true, dropDups: true },
  agents: [
    {
      _id: false,
      name: String,
      type: {type:  String}
    }
  ]
}))