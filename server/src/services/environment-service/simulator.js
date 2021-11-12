const axios = require('axios');
class Simulator {

  baseURL = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    })
  }

  getEnvironmentURI(environmentId){
    return `${this.baseURL}/workspaces`
  }

  getWorkspaceURI(environmentId, workspaceId){
    return `${this.baseURL}/workspaces/${workspaceId}/things/`
  }

  getArtifactURI(environmentId, workspaceId, artifactId){
    return `${this.baseURL}/environments/${environmentId}/workspaces/${workspaceId}/artifacts/${artifactId}`
  }


  async getWorkspacesInEnvironment(environmentId) {
    var path = `/workspaces`
    var res = await this.client.get(path, {headers: {Accept: "application/ld+json"}})
    return res.data;
  }

  async getArtifactsInWorkspace(environmentId, workspaceId) {
    var path = `/workspaces/${workspaceId}/things`
    var res = await this.client.get(path, {headers: {Accept: "application/ld+json"}})
    return res.data;
  }

  async getArtifactTD(environmentId, workspaceId, artifactId) {
    var path = `/workspaces/${workspaceId}/things/${artifactId}`
    var res = await this.client.get(path, {headers: {Accept: "application/ld+json"}})
    return res.data;
  }
}

module.exports = (protocol, hostname, port) => new Simulator(protocol, hostname, port)
