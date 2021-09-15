class MockedYggdrasil {
  
  hostname = ""

  constructor(hostname) {
    this.hostname = hostname;
  }

  async getWorkspacesInEnvironment(environmentSlug) {

  }

  async getArtifactsInWorkspace(workspaceUri) {

  }

  async getArtifactTD(artifactUri) {

  }

}

module.exports = function(hostname){
  return new MockedYggdrasil(hostname)
} 