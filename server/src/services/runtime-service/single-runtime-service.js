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
      reject("Not implemented")
    })
  }

  async getRuntimeAgents(runtimeURL){
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

  async addRuntimeAgent(runtimeURL, agentDef, agentSource) {
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

  async removeRuntimeAgent(runtimeURL, name) {
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

  async startRuntime(mas, agentSources) {
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

  async getRuntime(runtimeURL) {
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

  async stopRuntime(runtimeURL) {
    return new Promise((resolve, reject) => {
      reject("Not implemented")
    })
  }

}

module.exports = new SingleRuntimeService(protocol, hostname, port)