const engineService = require('../services/engine-service');
const {
  ok
} = require('../utils/action-results');

//TODO error handling and DTO wrapping

exports.getAllAgents = async function (req) {
  var agents = await engineService.getAllAgents();
  return ok(agents)
}

exports.getAllMas = async function (req) {
  var mas = await engineService.getAllMas();
  return ok(mas)
}

exports.createAgent = async function (req) {
  var id = req.body.id
  var code = req.body.code
  var xml = req.body.xml
  var agent = await engineService.createAgent(id, code, xml)
  return ok(agent)
}

exports.createMas = async function (req) {
  var mas = await engineService.createMas(req.body)
  return ok(mas)
}

exports.getAgent = async function (req) {
  var agent = await engineService.getAgent(req.params.id);
  return ok(agent)
}

exports.getMas = async function (req) {
  var mas = await engineService.getMas(req.params.id);
  return ok(mas)
}

exports.runMas = async function (req) {
  await engineService.runMas(req.params.id);
  return ok();
}

exports.stopMas = async function (req) {
  await engineService.stopMas(req.params.id);
  return ok();
}