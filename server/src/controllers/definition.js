const { AgentSource, MASDefinition } = require('../models')
const { ok, created, badRequest, notFound } = require('../utils/action-results')

function agentSourceDTO(agent){
  return {
    id: agent.id,
    code: agent.code,
    xml: agent.xml
  }
}

function masDTO(mas){
  return {
    id: mas.id,
    agents: mas.agents
  }
}

//TODO paginate
exports.getAllAgents = async function (req) {
  var agents = await AgentSource.find({})
  return ok(agents.map(a => agentSourceDTO(a)))
}

//TODO paginate
exports.getAllMas = async function (req) {
  var mas = await MASDefinition.find({})
  return ok(mas.map(m => masDTO(m)))
}

exports.createAgent = async function (req) {
  var newAgent = new AgentSource({
    id: req.body.id,
    code: req.body.code,
    xml: req.body.xml
  })
  var agents = await AgentSource.find({id: newAgent.id});
  if(agents.length){
    return badRequest("Id already in use")
  }
  var createdAgent = await newAgent.save()
  return created(agentSourceDTO(createdAgent))
}

exports.createMas = async function (req) {
  var newMas = new MASDefinition({
    id: req.body.id,
    agents: req.body.agents
  })
  //check unique id
  var mas = await MASDefinition.find({id: newMas.id});
  if(mas.length > 0){
    return badRequest("Id already in use")
  }
  //check if there are duplicate names for agents
  for (const agent of newMas.agents) {
    var count = newMas.agents.filter(x => x.name == agent.name).length;
    if(count > 1){
      return badRequest(`Trying to define a mas with ${count} agents with name ${agent.name} is not defined`)
    }
  }
  var createdMas = await newMas.save()
  return created(masDTO(createdMas))
}

exports.getAgent = async function (req) {
  var agents = await AgentSource.find({id: req.params.id})
  var agent = agents[0]
  if(!agent){
    return notFound(`Could not find agent with id ${req.params.id}`)
  }
  return ok(agentSourceDTO(agent))
}

exports.getMas = async function (req) {
  var foundMas = await MASDefinition.find({id: req.params.id})
  var mas = foundMas[0]
  if(!mas){
    return notFound(`Could not find mas with id ${req.params.id}`)
  }
  return ok(masDTO(mas))
}

exports.updateAgent = async function (req){
  var agents = await AgentSource.find({id: req.params.id})
  var agent = agents[0]
  if(!agent){
    return notFound(`Could not find agent with id ${req.params.id}`)
  }
  agent.code = req.body.code
  agent.xml = req.body.xml
  var updatedAgent = await agent.save();
  return ok(agentSourceDTO(updatedAgent))
}

exports.updateMas = async function (req){
  var foundMas = await MASDefinition.find({id: req.params.id})
  var mas = foundMas[0]
  if(!mas){
    return notFound(`Could not find mas with id ${req.params.id}`)
  }
  mas.agents = req.body.agents
  var updatedMas = await mas.save();
  return ok(masDTO(updatedMas))
}

exports.deleteAgent = async function (req){
  var agents = await AgentSource.find({id: req.params.id})
  var agent = agents[0]
  if(!agent){
    return notFound(`Could not find agent with id ${req.params.id}`)
  }
  await AgentSource.deleteOne({id: agent.id})
  return ok(agentSourceDTO(agent))
}

exports.deleteMas = async function (req){
  var foundMas = await MASDefinition.find({id: req.params.id})
  var mas = foundMas[0]
  if(!mas){
    return notFound(`Could not find mas with id ${req.params.id}`)
  }
  await MASDefinition.deleteOne({id: mas.id})
  return ok(masDTO(mas))
}