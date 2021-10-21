const express = require('express');
const cors = require('cors');

const config = require('./config');

exports.startServer = async function(options) {
  console.log("Starting intelliot-hypermas-client...")

  const app = express()
  const server = require('http').createServer(app)

  app.use(cors())

  //Set default route
  app.get('/', function (req, res) {
    res.redirect('/dashboard')
  })

  //enable static serving of files
  app.use(express.static(options.staticDirectory))

  //TODO not found

  //start listening
  server.listen(options.port, function() {
    console.log(`Started on port ${options.port}!`)
  })

}

this.startServer(config);
