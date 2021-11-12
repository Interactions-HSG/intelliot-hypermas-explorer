const config = require('../../../get-config').getConfig()
const service = require('./'+config.environmentInterface)

module.exports = service(config.environmentProtocol, config.environmentHostName, config.environmentPort)