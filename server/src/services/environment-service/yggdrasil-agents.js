const axios = require('axios');
const $rdf = require('rdflib');
const { notImplemented, internalServerError, ok } = require("../../utils/action-results")

const EVE = $rdf.Namespace('http://w3id.org/eve#');

const HMAS = $rdf.Namespace('https://ci.mines-stetienne.fr/hmas#')

class APIYggdrasil {

  baseURL = undefined
  client = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    })
  }

  /*getEnvironmentURI(environmentId){
    return `${this.baseURL}/environment/${environmentId}`
  }*/

  getWorkspaceURI(workspaceId){
    return `${this.baseURL}/workspaces/${workspaceId}`
  }

  getArtifactURI(workspaceId, artifactId){
    return `${this.baseURL}/workspaces/${workspaceId}/artifacts/${artifactId}`
  }


  async getWorkspacesInEnvironment(environmentId) {
    var path = `/environments/${environmentId}`
    var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var id = array[array.length-1]
      return {id, uri}
    }
    return await this._getContainedElements(path, mapper)
  }
  
  async getAllWorkspaces(){
	  console.log("agents get all workspaces")
	  var path = `/workspaces/intelliot`
	  var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var id = array[array.length-1]
      return {id, uri}
    }
	console.log("path and mapper defined")
    return await this._getContainedElements(path, mapper)
  }

  async getArtifactsInWorkspace(workspaceId) {
	console.log("get artifacts in workspace: "+workspaceId);
    var path = `/workspaces/${workspaceId}`
    var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var id = array[array.length-1]
      return {id, uri}
    }
    return await this._getContainedArtifacts(path, mapper)
  }

  async getArtifactTD(workspaceId, artifactId) {
	console.log("get artifact TD for artifact "+ artifactId + "in workspace "+workspaceId)
    var path = `/workspaces/${workspaceId}/artifacts/${artifactId}`
    var res = await this.client.get(path, {headers: {Accept: "application/ld+json"}})
    return res.data;
  }

  async _getContainedElements(path, mapper) {
	console.log("_getContainedElements")
    try{
      var contentType = 'text/turtle'
      var res = await this.client.get(path, {headers: {Accept: contentType}})
      var store = $rdf.graph();
      var URI = this.baseURL + path;
	  console.log("uri defined")
      $rdf.parse(res.data, store, URI, contentType);
	  console.log("rdf parsed")
	  console.log("uri: "+URI)
      var r = store.each(store.sym(URI), HMAS('contains')).map(x => mapper(x));
	  console.log("r computed")
	  console.log(r)
	  return ok(r);
    } catch (error){
	  console.log("error found")
      console.log(error)
      return []
    }
  }
  
  async _getContainedArtifacts(path, mapper) {
	console.log("_getContainedElements")
    try{
      var contentType = 'text/turtle'
      var res = await this.client.get(path, {headers: {Accept: contentType}})
      var store = $rdf.graph();
      var URI = this.baseURL + path;
	  console.log("uri defined")
      $rdf.parse(res.data, store, URI, contentType);
	  console.log("rdf parsed")
	  console.log("uri: "+URI)
      var r = store.each(store.sym(URI), EVE('contains')).map(x => mapper(x));
	  console.log("r computed")
	  console.log(r)
	  return r;
    } catch (error){
	  console.log("error found")
      console.log(error)
      return []
    }
  }
  
  async instantiateAgent(runtimeURL, agentSource) {
	  console.log("runtime url: "+runtimeURL)
	  console.log("agent source: "+agentSource)
	  console.log("id: "+agentSource.id)
	  console.log("code: "+agentSource.code)
	  const instantiate_agent_client =  axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
	  headers: {'X-Agent-WebID': 'http://example.org/ide','X-Agent-Name': agentSource.id, 'Content-Type': 'text/plain'}
    })
    var res = await instantiate_agent_client.post(
      runtimeURL+'/agents/', //Add agentSource.id to header X-Agent-Name
      agentSource.code
    )
	console.log("status code: "+res.status)
	console.log("data: "+res.data)
    return res.data;
  }

}

module.exports = (protocol, hostname, port) => new APIYggdrasil(protocol, hostname, port)