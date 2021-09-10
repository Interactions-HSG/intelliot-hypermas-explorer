const {ok} = require('../utils/action-results')

exports.sayHello = function(req) {
  return ok({message: "Hello!"})
}