const express = require('express');
const cors = require('cors');
const fs = require('fs');


function notFound(req, res){
  if (req.accepts('html')) {
    res.status(404).sendFile('notFound.html', {root: './public/html'})
    return;
  }
}

exports.startServer = async function(config) {
  //Writing config files
  fs.writeFileSync('./public/js/interfaces/backendURL.js', `const backendURL = "${config.backendURL}";`);

  console.log("Starting intelliot-hypermas-client...")

  const app = express()
  const server = require('http').createServer(app)

  app.use(cors())

  //Set default route
  app.get('/', function (req, res) {
    res.redirect('/dashboard')
  })

  app.get('/dashboard', function(req, res){
    res.sendFile('dashboard.html', {root: './public/html'})
  })

  app.get('/explorer/:env/:workspace', function(req, res){
    res.sendFile('explorer.html', {root: './public/html'})
  })

  //prevent from navigating path
  app.get('/html*', notFound)

  //enable static serving of files
  app.use(express.static(config.staticDirectory))

  //Not found catcher
  app.use(notFound)

  //start listening
  server.listen(config.port, function() {
    console.log(`Started on port ${config.port}!`)
  })

}

//Start the server
var args = process.argv.slice(2);
var configPath = args[0]

const config = require(configPath)
this.startServer(config);
