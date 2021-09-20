const { Servient, Helpers } = require("@node-wot/core");
const { HttpClientFactory } = require('@node-wot/binding-http');
const axios = require('axios');

class APIYggdrasil {

  servient = null
  client = null

  constructor(protocol, hostname, port) {
    var baseURL = `${protocol}://${hostname}:${port}`
    this.servient = new Servient();
    this.servient.addClientFactory(new HttpClientFactory(null));
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      headers: {Accept: 'application/ld+json'}
    })
  }

  async getWorkspacesInEnvironment(environmentId) {
    var res = await this.client.get(`/environments/${environmentId}`)
    try {
      var WoT = await this.servient.start()
      var thing = await WoT.consume(res.data)
      return thing;
    } catch (error) {
      console.log(error)
    }
  }

  async getArtifactsInWorkspace(environmentId, workspaceId) {

  }

  async getArtifactTD(environmentId, workspaceId, artifactId) {

  }

}

module.exports = (protocol, hostname, port) => new APIYggdrasil(protocol, hostname, port)