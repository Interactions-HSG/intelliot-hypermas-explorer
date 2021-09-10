const {ok, notImplemented} = require('../utils/action-results')

exports.sayHello = function(req) {
  return ok({message: "Hello!"})
}

exports.getWorkspacesInEnvironment = function(req){
  return notImplemented()
}

exports.getArtifactsInWorkspace = function(req){
  return notImplemented()
}

exports.getArtifact = function(req){
  return notImplemented()
}

exports.useAffordance = function(req) {
  return notImplemented()
}