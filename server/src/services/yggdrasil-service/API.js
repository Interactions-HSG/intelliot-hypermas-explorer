class APIYggdrasil {
  
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

module.exports = hostname => new APIYggdrasil(hostname)