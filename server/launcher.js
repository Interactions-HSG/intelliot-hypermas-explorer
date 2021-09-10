#!/usr/bin/env node

/* Have a look at:
    - dashboardContent for the UI stuff
    - yggdrasilInterface for the Yggdrasil calls
    - dashboard for initialization functions
*/

const yggdrasilHostName = "localhost:8080"
const staticDirectory = "../client/"
const srcDirectory = "../src/"
const port = 8090


var server  = require('./src/app.js')
server.startServer({
    yggdrasilHostName, 
    staticDirectory,
    srcDirectory,
    port
})
