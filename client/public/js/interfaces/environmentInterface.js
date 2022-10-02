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

  async fetchWorkspaces() {
    var res = await this.client.get(`/workspaces`);
    return res.data;
  }

  async fetchArtifacts(workspaceId) {
	console.log("workspace id: "+workspaceId)
    var res = await this.client.get(`/workspaces/${workspaceId}/artifacts`)
	console.log("res: "+JSON.stringify(res))
	console.log("res data: "+res.data)
    return res.data; 
  }

  async getArtifactDescription(workspaceId, artifactId){
    var res = await this.client.get(`/workspaces/${workspaceId}/artifacts/${artifactId}`)
	console.log("artifact description: "+ JSON.stringify(res.data))
    return res.data; 
  }
}

//use as singleton
var environmentInterface = new EnvironmentInterface(backendURL);