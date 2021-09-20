const {ok, notImplemented} = require('../utils/action-results')
const yggdrasilService = require('../services/yggdrasil-service')

function EnvironmentDto(environmentId, workspaces){
  return {
    environmentId,
    workspaces
  }
}

function WorkspaceDto(parentEnvironment, workspaceId, artifacts){
  return {
    parentEnvironment,
    workspaceId,
    artifacts
  }
}

function ArtifactDto(parentWorkspace, artifactId, thingDescription) {
  return {
    parentWorkspace,
    artifactId,
    thingDescription
  }
}

function AffordanceDto(uri, name) {
  return {
    name,
    uri,
  }
}

exports.getWorkspacesInEnvironment = async function(req){
  var workspaces = await yggdrasilService.getWorkspacesInEnvironment(req.params.environmentId)
  return ok(EnvironmentDto(req.params.environmentId, workspaces))
}

exports.getArtifactsInWorkspace = async function(req){
  var artifacts = await yggdrasilService.getArtifactsInWorkspace(req.params.environmentId, req.params.workspaceId)
  return ok(WorkspaceDto(req.params.environmentId, req.params.workspaceId, artifacts))
}

exports.getArtifact = async function(req){
  var artifactTD = await yggdrasilService.getArtifactTD(req.params.environmentId, req.params.workspaceId, req.params.artifactId)
  return ok(ArtifactDto(req.params.workspaceId, req.params.artifactId, artifactTD));
}
