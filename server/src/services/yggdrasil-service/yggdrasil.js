const { notImplemented, internalServerError, ok } = require("../utils/action-results")
const axios = require('axios');
const $rdf = require('rdflib');

const EVE = $rdf.Namespace('http://w3id.org/eve#');

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

  getWorkspaceURI(environmentId, workspaceId){
    return `${this.baseURL}/workspaces/${workspaceId}`
  }

  getArtifactURI(environmentId, workspaceId, artifactId){
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

  async getArtifactsInWorkspace(environmentId, workspaceId) {
    var path = `/workspaces/${workspaceId}`
    var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var id = array[array.length-1]
      return {id, uri}
    }
    return await this._getContainedElements(path, mapper)
  }

  async getArtifactTD(environmentId, workspaceId, artifactId) {
    var path = `/workspaces/${workspaceId}/artifacts/${artifactId}`
    var res = await this.client.get(path, {headers: {Accept: "application/ld+json"}})
    return res.data;
  }

  async _getContainedElements(path, mapper) {
    try{
      var contentType = 'text/turtle'
      var res = await this.client.get(path, {headers: {Accept: contentType}})
      var store = $rdf.graph();
      var URI = this.baseURL + path;
      $rdf.parse(res.data, store, URI, contentType);
      return ok(store.each(store.sym(URI), EVE('contains')).map(x => mapper(x)));
    } catch (error){
      console.log(error)
      return ok([])
    }
  }
  
  async instantiateAgent(runtimeURL, agentSource) {
	  const instantiate_agent_client =  axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
	  headers: {'X-Agent-Name': agentSource.id}
    })
    var res = await this.client.post(
      runtimeURL+'/agents/', //Add agentSource.id to header X-Agent-Name
      agentSource.code
    )
    return(res.data);
  }

}

module.exports = (protocol, hostname, port) => new APIYggdrasil(protocol, hostname, port)