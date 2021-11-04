class RuntimeInterface {

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

  async getAvailableAgents(){
    var res = await this.client.get(`/agents`);
    return res.data;
  }

  async getAvailableMas(){
    var res = await this.client.get(`/mas`);
    return res.data;
  }

  async createAgentSource(id, code, xml){
    var res = await this.client.post(`/agents`, {id, code, xml});
    return res.data;
  }

  async updateAgentSource(id, code, xml){
    var res = await this.client.put(`/agents/${id}`, {code, xml});
    return res.data;
  }

  async getAgentSource(agentId){
    var res = await this.client.get(`/agents/${agentId}`);
    return res.data;
  }

  async saveMasDefinition(id, agents){
    var body = {
      id,
      agents
    }
    var res = await this.client.post(`/mas`, body);
    return res.data;
  }

  async updateMasDefinition(id, agents){
    var body = {
      agents
    }
    var res = await this.client.put(`/mas/${id}`, body);
    return res.data;
  }

  async getMasDefinition(masId){
    var res = await this.client.get(`/mas/${masId}`);
    return res.data; 
  }

  async getRuntimes(){
    var res = await this.client.get(`/runtimes`);
    return res.data;
  }
  
  async startRuntime(masId){
    var res = await this.client.post(`/runtimes`, {masId});
    return res.data
  }
  
  async stopRuntime(runtimeId){
    await this.client.delete(`/runtimes/${runtimeId}`)
  }
  
  async getRuntimeAgents(runtimeId){
    var res = await this.client.get(`/runtimes/${runtimeId}/agents`);
    return res.data;
  }

  async addRuntimeAgent(runtimeId, agentName, agentType){
    var res = await this.client.post(`/runtimes/${runtimeId}/agents`, {name: agentName, type: agentType})
    return res.data
  }

  async deleteRuntimeAgent(runtimeId, agentName){
    var res = await this.client.delete(`/runtimes/${runtimeId}/agents/${agentName}`)
    return res.data
  }
  
}

//use as singleton
var runtimeInterface = new RuntimeInterface(backendURL);