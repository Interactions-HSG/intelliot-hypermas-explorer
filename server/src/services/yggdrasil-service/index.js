const config = require('../../../config')
const useMock = true;

const mocked = require('./mocked')
const api = require('./API')

module.exports = useMock ? mocked(config.yggdrasilProtocol, config.yggdrasilHostName, config.yggdrasilPort) 
   : api(config.yggdrasilProtocol, config.yggdrasilHostName, config.yggdrasilPort)