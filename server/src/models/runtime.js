const { createSchema } = require('./model-utils')

module.exports = createSchema('Runtime', 'Runtimes', mongoose => ({
  masId: {type: mongoose.ObjectId, ref: 'MASDefinition'}
}))