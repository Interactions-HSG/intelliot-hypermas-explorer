const {notFound} = require('./utils/action-results')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

exports.startServer = async function(options) {
  console.log("Starting intelliot-hypermas-server...")

  const app = express()
  const server = require('http').createServer(app)

  app.use(cors())

  app.use(express.static(options.staticDirectory)),
  app.use('/templates', express.static(path.join(options.staticDirectory, 'templates')))

  var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
  app.use(bodyParser.json({ verify: rawBodySaver }));
  app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
  app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));


  app.use(function(_, res, next) {
    res.setResult = function(result) {
      result(this)
    }
    next()
  })

  require(path.join(options.srcDirectory, 'routes'))(app)

  app.use(function(req, res) {
    res.setResult(notFound(`${req.originalUrl} not found`))
  })

  server.listen(options.port, function() {
    console.log(`Started on port ${options.port}!`)
  })

}
