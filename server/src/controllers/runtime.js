const runtimeService = require('../services/runtime-service');
const {MASDefinition, AgentSource, Runtime} = require('../models');
const { ok, badRequest, failedDependency, notFound, created, internalServerError } = require('../utils/action-results');


function localRuntimeDTO(runtime){
  return {
    id: runtime._id,
    masId: runtime.masId,
    runtimeURL: runtime.runtimeURL
  }
}

function masDTO(mas){
  return {
    id: mas.id,
    agents: mas.agents
  }
}

function runtimeDTO(runtime, remoteMas){
  return {
    id: runtime._id,
    runtimeURL: runtime.runtimeURL,
    remoteMas: masDTO(remoteMas),
  }
}

function agentSourceDTO(agentSource){
  return {
    id: agentSource.id,
    code: agentSource.code,
    xml: agentSource.xml
  }
}

function agentDTO(agent){
  return agent
}

exports.getAllRuntimes = async function (req) {
  var runtimes = await Runtime.find({})
  return ok(runtimes.map(r =>localRuntimeDTO(r)))
}

exports.startRuntime = async function (req) {
  //check if the mas definition exists
  var mas = await MASDefinition.find({id: req.body.masId});
  if(mas.length == 0){
    return badRequest(`Mas with id ${req.body.masId} not defined`)
  }
  var mas = mas[0]
  //check if all agents are defined and store them in an Array
  var agentSources = []
  for (const agent of mas.agents) {
    if(!agentSources.some(x => x.id == agent.type)){
      var agentSource = await AgentSource.find({id: agent.type});
      if(agentSource.length == 0){
        return badRequest(`Type ${agentSource.type} is not defined`)
      }
      agentSources.push(agentSource[0])
    }
  }
  //start the mas on the remote runtime and provide all the sources
  try {
    var URL = await runtimeService.startRuntime(masDTO(mas), agentSources.map(a=> {
      return {
        id: a.id, 
        code: a.code
      }
    }))
    //save the runtime info locally
    var newRuntime = new Runtime({
      masId: req.body.masId,
      runtimeURL: URL
    })
    var createdRuntime = await newRuntime.save();
    return created(runtimeDTO(createdRuntime, mas))

  } catch (error){
    return failedDependency(error)
  }
}

exports.getRuntime = async function(req) {
  //get the runtime info from db
  var runtime = await Runtime.findById(req.params.id)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //get the runtime details from the remote runtime
  try {
    var remoteMas = await runtimeService.getRuntime(runtime.runtimeURL)
    return ok(runtimeDTO(runtime, remoteMas))

  } catch(error){
    return failedDependency(error);
  }
}

exports.stopRuntime = async function (req) {
  //check if the runtime exists
  var runtime = await Runtime.findById(req.params.id)
  console.log(runtime)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //stop the remote runtime
  try {
    await runtimeService.stopRuntime(runtime.runtimeURL)

  } catch (error){
    //return failedDependency(error)
  }
  try{
    //delete the runtime from local db
    await Runtime.deleteOne({_id: req.params.id})

    return ok(localRuntimeDTO(runtime))
  } catch (error) {
    return internalServerError()
  }
}

exports.getAllRuntimeAgents = async function(req) {
  //check if the runtime exists
  var runtime = await Runtime.findById(req.params.id)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //ask the remote runtime for the current agents
  try {
    var agents = await runtimeService.getRuntimeAgents(runtime.runtimeURL)
    return ok(agents.map(a => agentDTO(a)));

  } catch (error) {
    return failedDependency(error)
  }
}

exports.addRuntimeAgent = async function (req) {
  //check if the runtime exists
  var runtime = await Runtime.findById(req.params.id)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //check if the agent is defined
  var agentSource = await AgentSource.find({id: req.body.type});
  if(agentSource.length == 0){
    return badRequest(`Type ${agentSource.type} is not defined`)
  }

  //check if the name is already in use
  try {
    var runtimeAgent = await runtimeService.getRuntimeAgentByName(runtime.runtimeURL, req.body.name)
    if(runtimeAgent){
      return badRequest(`Name ${req.body.name} is already in use in this runtime`)
    }
    
    //add the agent on the remote runtime
    runtimeAgent = await runtimeService.addRuntimeAgent(runtime.runtimeURL, agentDTO(req.body), agentSourceDTO(agentSource[0]))
    return created(agentDTO(runtimeAgent))
    
  } catch (error) {
    return failedDependency(error)
  }

}

exports.getRuntimeAgentByName = async function(req) {
  //check if the runtime exists
  var runtime = await Runtime.findById(req.params.id)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //ask the remote runtime for agent
  try {
    var agent = await runtimeService.getRuntimeAgentByName(runtime.runtimeURL, req.params.name)
    if(!agent){
      return notFound(`Could not find runtime agent with name ${req.params.name}`)
    }
    return ok(agentDTO(agent));
    
  } catch (error) {
    return failedDependency(error)
  }
}

exports.removeRuntimeAgentByName = async function  (req) {
  //check if the runtime exists
  var runtime = await Runtime.findById(req.params.id)
  if(!runtime){
    return notFound(`Could not found runtime with id ${req.params.id}`)
  }

  //ask the remote runtime to kill an agent
  try {
    var agent = await runtimeService.getRuntimeAgentByName(runtime.runtimeURL, req.params.name)
    if(!agent){
      return notFound(`Could not find runtime agent with name ${req.params.name}`)
    }
    await runtimeService.removeRuntimeAgent(runtime.runtimeURL, req.params.name)
    return ok(agentDTO(agent));

  } catch (error) {
    return failedDependency(error)
  }
}