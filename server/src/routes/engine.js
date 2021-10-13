const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('engine', function (app, controller) {

  app.route('/engine/agents')
    .get(action(controller.getAllAgents))
    .post(action(controller.createAgent))
  
  app.route('/engine/mas')
    .get(action(controller.getAllMas))
    .post(action(controller.createMas))
  
  app.route('/engine/agents/:id')
    .get(action(controller.getAgent))

  app.route('/engine/mas/:id')
    .get(action(controller.getMas))

  app.route('/engine/mas/:id/run')
    .get(action(controller.runMas))

  app.route('/engine/mas/:id/stop')
    .get(action(controller.stopMas))
})