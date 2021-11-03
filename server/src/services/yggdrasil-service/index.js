const config = require('../../../get-config').getConfig()
const useMock = config.yggdrasilMock;

const mocked = require('./mocked')
const api = require('./API')

module.exports = useMock ? mocked(config.yggdrasilProtocol, config.yggdrasilHostName, config.yggdrasilPort) 
   : api(config.yggdrasilProtocol, config.yggdrasilHostName, config.yggdrasilPort)