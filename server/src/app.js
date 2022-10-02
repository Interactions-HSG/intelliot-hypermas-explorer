const {notFound} = require('./utils/action-results')

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

exports.startServer = async function(config) {
  console.log("Starting intelliot-hypermas-server...")

  console.log('Connecting to mongodb... on '+config.mongoURL)
  await mongoose.connect(config.mongoURL)
  console.log('Connected!')

  const app = express()
  const server = require('http').createServer(app)

  app.use(cors({
    origin: '*'
  }))

  //bodyparser
  var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
  app.use(bodyParser.json({ verify: rawBodySaver }));
  app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
  app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

  //middleware for setting response result
  app.use(function(_, res, next) {
    res.setResult = function(result) {
	  console.log(result)
      result(this)
    }
    next()
  })

  //routes to get data
  require(path.join(config.srcDirectory, 'routes'))(app)

  //notFound
  app.use(function(req, res) {
    res.setResult(notFound(`${req.originalUrl} not found`))
  })

  //start listening
  server.listen(config.port, function() {
    console.log(`Started on port ${config.port}!`)
  })

}
