const axios = require('axios');

class APIEngine {

  baseURL = undefined
  client = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 5000
    })
  }

  //TODO error handling

  async getAllAgents() {
    var res = await this.client.get(`/agents`);
    return res.data;
  }

  async getAllMas() {
    var res = await this.client.get(`/mas`);
    return res.data;
  }

  async createAgent(id, code, xml) {
    var body = {
      id,
      code, 
      xml
    }
    var res = await this.client.post(`/agents`, body);
    return res.data;
  }

  async createMas(id, agents) {
    var body = {
      id,
      code, 
      xml
    }
    var res = await this.client.post(`/agents`, body);
    return res.data;
  }

  async getAgent(id) {
    var res = await this.client.get(`/agents/${id}`);
    return res.data;
  }

  async getMas(id) {
    var res = await this.client.get(`/mas/${masId}`);
    return res.data; 
  }

  async runMas(id) {
    var res = await this.client.put(`/mas/${masId}/run`);
  }

  async stopMas(id) {
    var res = await this.client.put(`/mas/${masId}/stop`);
  }

}

const config = require('../../config')
module.exports = new APIEngine(config.engineProtocol, config.engineHostName, config.enginePort)