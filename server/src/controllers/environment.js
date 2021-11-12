const {ok} = require('../utils/action-results')
const environmentService = require('../services/environment-service')

function EnvironmentDto(id, uri, workspaces){
  return {
    id,
    uri,
    workspaces: WorkspacesDTO(workspaces)
  }
}

function WorkspacesDTO(workspaces){
  return workspaces;
}

function WorkspaceDto(parentEnvironmentId, parentUri, id, uri, artifacts){
  return {
    parent:{id: parentEnvironmentId, type: 'environment', uri: parentUri},
    id,
    uri,
    artifacts: ArtifactsDTO(artifacts)
  }
}

function ArtifactsDTO(artifacts){
  return artifacts;
}

function ArtifactDto(workspaceId, workspaceUri, id, thingDescription) {
  return {
    parent:{id: workspaceId, type: 'workspace', uri: workspaceUri},
    id,
    uri: thingDescription.id,
    thingDescription
  }
}

exports.getEnvironmentInfo = async function(req){
  var id = req.params.environmentId
  var workspaces = await environmentService.getWorkspacesInEnvironment(id)
  var uri = environmentService.getEnvironmentURI(id)
  return ok(EnvironmentDto(id, uri, workspaces))
}

exports.getWorkspacesInEnvironment = async function(req) {
  var id = req.params.environmentId
  var workspaces = await environmentService.getWorkspacesInEnvironment(id)
  return ok(WorkspacesDTO(workspaces))
}

exports.getWorkspaceInfo = async function(req){
  var envId = req.params.environmentId
  var id = req.params.workspaceId
  var artifacts = await environmentService.getArtifactsInWorkspace(envId, id)
  var parentURI = environmentService.getEnvironmentURI(envId)
  var uri = environmentService.getWorkspaceURI(envId, id)
  return ok(WorkspaceDto(envId, parentURI, id, uri, artifacts))
}

exports.getArtifactsInWorkspace = async function(req) {
  var envId = req.params.environmentId
  var id = req.params.workspaceId
  var artifacts = await environmentService.getArtifactsInWorkspace(envId, id)
  return ok(ArtifactsDTO(artifacts))
}

exports.getArtifact = async function(req){
  var envId = req.params.environmentId
  var workId = req.params.workspaceId
  var artifactId = req.params.artifactId
  var parentUri = environmentService.getWorkspaceURI(envId, workId);
  var artifactTD = await environmentService.getArtifactTD(envId, workId, artifactId)
  return ok(ArtifactDto(workId, parentUri, artifactId, artifactTD));
}
