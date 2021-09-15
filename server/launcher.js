#!/usr/bin/env node

/* Have a look at:
    - dashboardContent for the UI stuff
    - yggdrasilInterface for the Yggdrasil calls
    - dashboard for initialization functions
*/
const config = require('./config')

var server  = require('./src/app')
server.startServer(config)
