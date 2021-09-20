class MockedYggdrasil {

  constructor(protocol, hostname, port){

  }

  async getWorkspacesInEnvironment(environmentSlug) {

  }

  async getArtifactsInWorkspace(workspaceUri) {

  }

  async getArtifactTD(artifactUri) {

  }

}

module.exports = (protocol, hostname, port) => new MockedYggdrasil(protocol, hostname, port)