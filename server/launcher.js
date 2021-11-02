var args = process.argv.slice(2);
var configPath = args[0]

const config = require(configPath)

var server  = require('./src/app')
server.startServer(config)
