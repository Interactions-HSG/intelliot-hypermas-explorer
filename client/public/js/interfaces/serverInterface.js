class ServerInterface {

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
    var res = await this.client.get(`/workspaces`);
    return res.data;
  }

  async fetchArtifacts(environmentId, workspaceId) {
    var res = await this.client.get(`/workspaces/${workspaceId}/artifacts`)
    return res.data; 
  }

  async getArtifactDescription(environmentId, workspaceId, artifactId){
    var res = await this.client.get(`workspaces/${workspaceId}/artifacts/${artifactId}`)
    return res.data; 
  }
  
  async getAvailableAgents(){
    var res = await this.client.get(`/local-agents`);
    return res.data;
  }
  
  async createAgentSource(id, code, xml){
    var res = await this.client.post(`/local-agents`, {id, code, xml});
    return res.data;
  }
  
  async updateAgentSource(id, code, xml){
    var res = await this.client.put(`/local-agents/${id}`, {code, xml});
    return res.data;
  }

  async getAgentSource(agentId){
    var res = await this.client.get(`/local-agents/${agentId}`);
    return res.data;
  }
  
  async runAgent(agentId){
	  await this.client.post(`/agents/`, {getAgentSource(agentId)})
  }
}

//use as singleton
var serverInterface = new ServerInterface(backendURL);