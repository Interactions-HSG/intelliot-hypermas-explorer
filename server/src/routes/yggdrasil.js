const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('yggdrasil', function (app, controller) {

  app.route('/yggdrasil/environments/:environmentId')
  .get(action(controller.getEnvironmentInfo))
  
  app.route('/yggdrasil/environments/:environmentId/workspaces')
    .get(action(controller.getWorkspacesInEnvironment))
  
  app.route('/yggdrasil/environments/:environmentId/workspaces/:workspaceId')
    .get(action(controller.getWorkspaceInfo))

  app.route('/yggdrasil/environments/:environmentId/workspaces/:workspaceId/artifacts')
    .get(action(controller.getArtifactsInWorkspace))

  app.route('/yggdrasil/environments/:environmentId/workspaces/:workspaceId/artifacts/:artifactId')
    .get(action(controller.getArtifact))
})