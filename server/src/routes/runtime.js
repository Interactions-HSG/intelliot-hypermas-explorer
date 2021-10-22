const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('runtime', function (app, controller) {

  app.route('/runtimes')
    .get(action(controller.getAllRuntimes))
    .post(action(controller.startRuntime))
  
  app.route('/runtimes/:id')
    .get(action(controller.getRuntime))
    .delete(action(controller.stopRuntime))
  
  app.route('/runtimes/:id/agents')
    .get(action(controller.getAllRuntimeAgents))
    .post(action(controller.addRuntimeAgent))

  app.route('/runtimes/:id/agents/:name')
    .get(action(controller.getRuntimeAgentByName))
    .delete(action(controller.removeRuntimeAgentByName))
})