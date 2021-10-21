const engineService = require('../services/engine-service')
const { AgentSource, MASDefinition } = require('../models')
const { ok, created } = require('../utils/action-results')

//TODO error handling and DTO wrapping

exports.getAllAgents = async function (req) {
  var agents = await AgentSource.find({})
  return ok(agents)
}

exports.getAllMas = async function (req) {
  var mas = await MASDefinition.find({})
  return ok(mas)
}

exports.createAgent = async function (req) {
  var newAgent = new AgentSource({
    id: req.body.id,
    code: req.body.code,
    xml: req.body.xml
  })
  var agent = await newAgent.save()
  return created(agent)
}

exports.createMas = async function (req) {
  var newMas = new MASDefinition({
    id: req.body.id,
    agents: req.body.agents
  })
  var mas = await newMas.save()
  return created(mas)
}

exports.getAgent = async function (req) {
  var agent = await AgentSource.find({id: req.params.id})
  return ok(agent)
}

exports.getMas = async function (req) {
  var mas = await MASDefinition.find({id: req.params.id})
  return ok(mas)
}

exports.runMas = async function (req) {
  //await engineService.runMas(req.params.id);
  return ok();
}

exports.stopMas = async function (req) {
  //await engineService.stopMas(req.params.id);
  return ok();
}