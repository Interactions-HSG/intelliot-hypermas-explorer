class EnvironmentInterface {

  client = null

  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {
        Accept: 'application/json'
      }
    })
  }

  async fetchWorkspaces(environmentId) {
    var res = await this.client.get(`/environments/${environmentId}/workspaces`);
    return res.data;
  }

  async fetchArtifacts(environmentId, workspaceId) {
    var res = await this.client.get(`/environments/${environmentId}/workspaces/${workspaceId}/artifacts`)
    return res.data; 
  }

  async getArtifactDescription(environmentId, workspaceId, artifactId){
    var res = await this.client.get(`/environments/${environmentId}/workspaces/${workspaceId}/artifacts/${artifactId}`)
    return res.data; 
  }
}

//use as singleton
var environmentInterface = new EnvironmentInterface(backendURL);