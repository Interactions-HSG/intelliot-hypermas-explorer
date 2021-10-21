const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('mas', function (app, controller) {

  app.route('/agents')
    .get(action(controller.getAllAgents))
    .post(action(controller.createAgent))
  
  app.route('/mas')
    .get(action(controller.getAllMas))
    .post(action(controller.createMas))
  
  app.route('/agents/:id')
    .get(action(controller.getAgent))

  app.route('/mas/:id')
    .get(action(controller.getMas))

  app.route('/mas/:id/run')
    .get(action(controller.runMas))

  app.route('/mas/:id/stop')
    .get(action(controller.stopMas))
})