const config = require('../../../config')
const useMock = true;

const mocked = require('./mocked')
const api = require('./API')

module.exports = useMock ? mocked(config.yggdrasilHostName) : api(config.yggdrasilHostName)