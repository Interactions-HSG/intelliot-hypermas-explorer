const {ok, notImplemented} = require('../utils/action-results')
const yggdrasilService = require('../services/yggdrasil-service')

function EnvironmentDto(name, uri, workspaces){
  return {
    name,
    uri,
    workspaces
  }
}

function WorkspaceDto(uri, name, artifacts){
  return {
    name,
    uri, 
    artifacts
  }
}

function ArtifactDto(uri, name, affordances) {
  return {
    name,
    uri,
    affordances
  }
}

function AffordanceDto(uri, name) {
  return {
    name,
    uri,
  }
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
