const axios = require('axios');

//TODO implement
class SingleRuntimeService {

  baseURL = undefined
  client = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 5000
    })
  }

  async saveAgent(id, code) {
    var body = {
      id,
      code,
    }
    var res = await this.client.post(`/agents`, body);
    return res.data;
  }

  async getRuntimeAgents(){
    return [];
  }

  async addRuntimeAgent(name, type) {
    var body = {
      name,
      type,
    }
    var res = await this.client.post(`/agents`, body);
    return res.data;
  }

  async removeRuntimeAgent(name) {
    return {}
  }

  async removeRuntimeAgent(name) {
    return {}
  }

  async startRuntime(id, agents) {
    var body = {
      id,
      agents
    }
    return {}
  }

  async getRuntime(id) {
    var res = await this.client.get(`/mas/${masId}`);
    return res.data; 
  }

  async stopRuntime(id) {
    return {}
  }

}

const config = require('../../config')
module.exports = new SingleRuntimeService(config.runtimeProtocol, config.runtimeHostName, config.runtimePort)