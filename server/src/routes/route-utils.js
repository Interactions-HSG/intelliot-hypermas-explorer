const { notImplemented, internalServerError, ok } = require("../utils/action-results")

exports.mapControllerRoutes = function (controllerName, mapper) {
  const controller = require(`../controllers/${controllerName}`)
  return app => mapper(app, controller)
}

function printSeparator() {
  console.log("=================================================")
}
exports.action = function (f) {
  return async function (req, res) {
    try {
	  console.log("try route-utils")
      printSeparator()
      console.log(`${req.method} ${req.originalUrl}`)
      console.log('Body:', req.body)
      printSeparator()
	  console.log("f")
	  console.log(f)
      let result = (f ? await f(req) : notImplemented()) || notImplemented()
	  console.log("result")
	  console.log(result)
	  console.log("before set result")
      res.setResult(result)
	  console.log("result has been set")
      printSeparator()
    } catch (error) {
	  console.log("error catched")
	  console.log(error)
      res.setResult(internalServerError(error))
    }
  }
}