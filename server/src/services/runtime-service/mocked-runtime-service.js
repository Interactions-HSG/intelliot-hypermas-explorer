
class MockedRuntimeService {

  runtimeAgents = {}
  masId = {}

  async saveAgentSource(runtimeURL, agentSource) {
    return new Promise((resolve, reject) => {
      resolve(agentSource)
    })
  }

  async getRuntimeAgents(runtimeURL){
    return new Promise((resolve, reject) => {
      resolve(this.runtimeAgents[runtimeURL])
    })
  }

  async getRuntimeAgentByName(runtimeURL, name){
    return new Promise((resolve, reject) => {
      resolve(this.runtimeAgents[runtimeURL].filter(x => x.name == name)[0])
    })
  }

  async addRuntimeAgent(runtimeURL, agentDef, agentSource) {
    return new Promise((resolve, reject) => {
      var agents = this.runtimeAgents[runtimeURL]
      agents.push(agentDef)
      resolve(agentDef)
    })
  }

  async removeRuntimeAgent(runtimeURL, name) {
    return new Promise((resolve, reject) => {
      this.runtimeAgents[runtimeURL] = this.runtimeAgents[runtimeURL].filter(x => x.name != name)
      resolve()
    })
  }

  async startRuntime(mas, agentSources) {
    return new Promise((resolve, reject) => {
      var mockURL = this._generateRandomURL()
      this.masId[mockURL] = mas.id;
      this.runtimeAgents[mockURL] = mas.agents
      resolve(mockURL)
    })
  }

  async getRuntime(runtimeURL) {
    return new Promise((resolve, reject) => {
      resolve({
        id: this.masId[runtimeURL],
        agents: this.runtimeAgents[runtimeURL]
      })
    })
  }

  async stopRuntime(runtimeURL) {
    return Promise((resolve, reject) => {
      delete this.masId[runtimeURL]
      delete this.runtimeAgents[runtimeURL]
      resolve()
    })
  }

  _generateRandomURL(){
    return (Math.random() + 1).toString(36).substring(2);
  }

}

module.exports = new MockedRuntimeService();