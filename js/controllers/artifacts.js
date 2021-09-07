class ArtifactsController {

  currentArtifacts = []
  affordancesController = new AffordancesController();
  $artifactsScrollContainer = $('artifacts-scroll-container')

  async reloadArtifactsFromWorkspace(workspaceData){
    log.fine(`Fetching artifacts in workspace ${workspaceData.name}`);
    try {
      this.currentArtifacts = await yggdrasilInterface.fetchArtifactsInWorkspace(workspaceData.uri);
      log.fine(`Workspace contained ${this.currentArtifacts.length} artifact(s)!`)
      log.debug(this.currentArtifacts);
      return Promise.resolve(this.currentArtifacts)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  clearArtifactsBar() {
    this.currentArtifacts = []
    this.$artifactsScrollContainer.hide();
  }

}