const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require('@node-wot/binding-http');
const axios = require('axios');
const $rdf = require('rdflib');

const EVE = $rdf.Namespace('http://w3id.org/eve#');

class APIYggdrasil {

  baseURL = undefined
  servient = undefined
  client = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
    
    this.servient = new Servient();
    this.servient.addClientFactory(new HttpClientFactory(null));

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    })
  }

  async getWorkspacesInEnvironment(environmentId) {
    var path = `/environments/${environmentId}`
    var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var name = array[array.length-1]
      return {name, uri}
    }
    return await this._getContainedElements(path, mapper)
  }

  async getArtifactsInWorkspace(environmentId, workspaceId) {
    var path = `/environments/${environmentId}/workspaces/${workspaceId}`
    var mapper = n =>{
      var uri = n.value;
      var array = n.value.split("/")
      var name = array[array.length-1]
      return {name, uri}
    }
    return await this._getContainedElements(path, mapper)
  }

  async getArtifactTD(environmentId, workspaceId, artifactId) {
    var path = `/environments/${environmentId}/workspaces/${workspaceId}/artifacts/${artifactId}`
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
      return store.each(store.sym(URI), EVE('contains')).map(x => mapper(x));
    } catch (error){
      console.log(error)
      return []
    }
  }

}

module.exports = (protocol, hostname, port) => new APIYggdrasil(protocol, hostname, port)