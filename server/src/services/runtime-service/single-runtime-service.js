const axios = require('axios');
const protocol = "http"
const hostname = "localhost"
const port = "9000"

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

  async saveAgentSource(runtimeURL, agentSource) {
    return new Promise((resolve, reject) => {
      //make call to remote runtime
      reject("Not implemented")
    })
  }

  async getRuntimeAgents(runtimeURL){
    return new Promise((resolve, reject) => {
      //make call to remote runtime
      reject("Not implemented")
    })
  }

  async addRuntimeAgent(runtimeURL, agentDef, agentSource) {
    return new Promise((resolve, reject) => {
      try{
        await this.saveAgentSource(agentSource)
      } catch (error) {
        reject(error)
      }
      //make call to remote runtime to add agent
      reject("Not implemented")
    })
  }

  async removeRuntimeAgent(runtimeURL, name) {
    return new Promise((resolve, reject) => {
      //make call to remote runtime to kill agent
      reject("Not implemented")
    })
  }

  async startRuntime(mas, agentSources) {
    return new Promise((resolve, reject) => {
      try {
        for (const source of agentSources) {
          this.saveAgentSource(source)
        }
      } catch (error){
        reject(error)
      }
      
      //make call to remote runtime to start
      reject("Not implemented")
    })
  }

  async getRuntime(runtimeURL) {
    return new Promise((resolve, reject) => {
      //make call to remote runtime to get
      reject("Not implemented")
    })
  }

  async stopRuntime(runtimeURL) {
    return new Promise((resolve, reject) => {
      //make call to remote runtime to stop runtime
      reject("Not implemented")
    })
  }

}

module.exports = new SingleRuntimeService(protocol, hostname, port)