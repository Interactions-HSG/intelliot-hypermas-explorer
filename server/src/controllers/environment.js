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

function WorkspaceDto( id, uri, artifacts){
  return {
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

exports.getAllWorkspaces = async function(req){
	console.log("environment service")
	console.log(environmentService)
	return environmentService.getAllWorkspaces()
}

exports.getWorkspaceInfo = async function(req){
  //var envId = req.params.environmentId
  var id = req.params.workspaceId
  var artifacts = await environmentService.getArtifactsInWorkspace(id)
  //var parentURI = environmentService.getEnvironmentURI(envId)
  //var uri = environmentService.getWorkspaceURI(envId, id)
  return ok(WorkspaceDto( id, uri, artifacts))
}

exports.getArtifactsInWorkspace = async function(req) {
	console.log("get artifacts in workspace")
  //var envId = req.params.environmentId
  var id = req.params.workspaceId
  console.log("workspace id: "+id)
  var artifacts = await environmentService.getArtifactsInWorkspace(id)
  console.log("artifacts: "+artifacts)
  return ok(ArtifactsDTO(artifacts))
}

exports.getArtifact = async function(req){
  //var envId = req.params.environmentId
  var workId = req.params.workspaceId
  var artifactId = req.params.artifactId
  //var parentUri = environmentService.getWorkspaceURI(envId, workId);
  var workspaceUri = environmentService.getWorkspaceURI(workId)
  var artifactTD = await environmentService.getArtifactTD(workId, artifactId)
  return ok(ArtifactDto(workId, workspaceUri,  artifactId, artifactTD));
}

exports.instantiateAgent = async function(req){
	console.log("instantiate agent")
	console.log("req: "+JSON.stringify(req.params))
  var yggdrasilUrl = req.params.yggdrasilUrl
  console.log("first yggdrasil url: "+yggdrasilUrl)
  yggdrasilUrl = "http://localhost:8080"
  conf = config = require('../../get-config').getConfig()
  yggdrasilUrl = ""+config.environmentProtocol+"://"+config.environmentHostName+":"+config.environmentPort
  console.log("yggdrasil url: "+yggdrasilUrl)
  var agentSource = req.params.agentSource
  console.log("agent source: "+req.body)
  return ok(environmentService.instantiateAgent(yggdrasilUrl, req.body))
}
