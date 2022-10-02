const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('yggdrasil', function (app, controller) {
	
	app.route('/workspaces')
	.get(action(controller.getAllWorkspaces))

  
  app.route('/workspaces/:workspaceId')
    .get(action(controller.getWorkspaceInfo))

  app.route('/workspaces/:workspaceId/artifacts')
    .get(action(controller.getArtifactsInWorkspace))

  app.route('/workspaces/:workspaceId/artifacts/:artifactId')
    .get(action(controller.getArtifact))
	
	app.route('/agents/')
	.get(action(controller.getAllAgents))
	.post(action(controller.instantiateAgent))
	
	app.route('/agents/:name')
    .get(action(controller.getAgentByName))
    //.delete(action(controller.removeRuntimeAgentByName))
})