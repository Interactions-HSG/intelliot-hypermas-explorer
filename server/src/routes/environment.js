const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('environment', function (app, controller) {

  app.route('/environments/:environmentId')
  .get(action(controller.getEnvironmentInfo))
  
  app.route('/environments/:environmentId/workspaces')
    .get(action(controller.getWorkspacesInEnvironment))
  
  app.route('/environments/:environmentId/workspaces/:workspaceId')
    .get(action(controller.getWorkspaceInfo))

  app.route('/environments/:environmentId/workspaces/:workspaceId/artifacts')
    .get(action(controller.getArtifactsInWorkspace))

  app.route('/environments/:environmentId/workspaces/:workspaceId/artifacts/:artifactId')
    .get(action(controller.getArtifact))
})