const config = require('../../../get-config').getConfig()

var useMock = config.runtimeMock
const mocked = require('./mocked-runtime-service')
const runtime = require('./single-runtime-service')

module.exports = useMock ? mocked() 
   : runtime(config.runtimeProtocol, config.runtimeHostname, config.runtimePort)