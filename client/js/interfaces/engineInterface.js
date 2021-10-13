const engineURL = 'http://localhost:8090/engine'

class EngineInterface {

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

  async saveAgentSource(id, code, xml){
    var body = {
      id,
      code, 
      xml
    }
    var res = await this.client.post(`/agents`, body);
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

  async getMasDefinition(masId){
    var res = await this.client.get(`/mas/${masId}`);
    return res.data; 
  }

  async runMas(masId){
    var res = await this.client.put(`/mas/${masId}/run`);
  }

  async stopMas(masId){
    var res = await this.client.put(`/mas/${masId}/stop`);
  }

}