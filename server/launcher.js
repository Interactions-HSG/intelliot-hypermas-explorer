var {getConfig} = require('./get-config')

var server  = require('./src/app')
server.startServer(getConfig())

