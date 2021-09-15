const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('yggdrasil', function (app, controller) {
  app.route('/yggdrasil/hello')
    .get(action(controller.sayHello))
  
  app.route('/yggdrasil/:environmentId/workspaces')
    .get(action(controller.getWorkspacesInEnvironment))

  app.route('/yggdrasil/:environmentId/workspaces/:workspaceId/artifacts')
    .get(action(controller.getArtifactsInWorkspace))

  app.route('/yggdrasil/:environmentId/workspaces/:workspaceId/artifacts/:artifactId')
    .get(action(controller.getArtifact))
})