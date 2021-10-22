const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('definition', function (app, controller) {

  app.route('/agents')
    .get(action(controller.getAllAgents))
    .post(action(controller.createAgent))
  
  app.route('/mas')
    .get(action(controller.getAllMas))
    .post(action(controller.createMas))
  
  app.route('/agents/:id')
    .get(action(controller.getAgent))
    .put(action(controller.updateAgent))
    .delete(action(controller.deleteAgent))

  app.route('/mas/:id')
    .get(action(controller.getMas))
    .put(action(controller.updateMas))
    .delete(action(controller.deleteMas))
})