const axios = require('axios');
const protocol = "http"
const hostname = "host.docker.internal" //TODO change this
const port = "8088"

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

  async saveAgentSource(runtimeURL, agentSource) {
    var res = await this.client.put(
      runtimeURL+'/agents/'+agentSource.id, 
      {code: agentSource.code}
    )
    return(res.data);
  }

  async getRuntimeAgents(runtimeURL){
    var res = await this.client.get(runtimeURL+'/runtime/agents' )
    return res.data;
  }

  async getRuntimeAgentByName(runtimeURL, name){
    try{
      var res = await this.client.get(runtimeURL+'/runtime/agents/'+name)
      return res.data;
    } catch(error){
      return undefined;
    }
  }

  async addRuntimeAgent(runtimeURL, agentDef, agentSource) {
    await this.saveAgentSource(runtimeURL, agentSource)
    var res = await this.client.post(
      runtimeURL+'/runtime/agents',
      agentDef
    )
    return res.data;
  }

  async removeRuntimeAgent(runtimeURL, name) {
    var res = await this.client.delete(runtimeURL+'/runtime/agents/'+name)
    return res.data;
  }

  async startRuntime(mas, agentSources) {
    for (const source of agentSources) {
      await this.saveAgentSource(this.baseURL, source)
    }
    await this.client.post(
      this.baseURL+'/runtime',
      mas
    )   
    return (this.baseURL)
  }

  async getRuntime(runtimeURL) {
    var res = await this.client.get(runtimeURL+'/runtime')
    return res.data;
  }

  async stopRuntime(runtimeURL) {
    var res = await this.client.delete(runtimeURL+'/runtime')
    return res.data;
  }

}

module.exports = new SingleRuntimeService(protocol, hostname, port)