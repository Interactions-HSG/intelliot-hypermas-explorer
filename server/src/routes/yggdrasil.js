const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('yggdrasil', function (app, controller) {
  app.route('/yggdrasil/hello')
    .get(action(controller.sayHello))
})