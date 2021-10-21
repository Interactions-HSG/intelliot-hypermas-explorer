const express = require('express');
const cors = require('cors');
const fs = require('fs');

const config = require('./config');


function notFound(req, res){
  if (req.accepts('html')) {
    res.status(404).sendFile('notFound.html', {root: './public/html'})
    return;
  }
}

exports.startServer = async function(options) {
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

  //prevent from navigating path
  app.get('/html*', notFound)

  //enable static serving of files
  app.use(express.static(options.staticDirectory))

  //Not found catcher
  app.use(notFound)

  //start listening
  server.listen(options.port, function() {
    console.log(`Started on port ${options.port}!`)
  })

}

//Start the server
var port = process.env.SERVER_PORT || 8080
fs.writeFileSync('./public/js/config.js', `const serverPort = ${port}`);
this.startServer(config);
