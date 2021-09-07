class ArtifactsController {

  currentArtifacts = []
  
  //jquery shortcuts
  $artifactsScrollContainer = $('artifacts-scroll-container')
  $affordancesScrollContainer = $('affordances-scroll-container')

  async reloadArtifactsFromWorkspace(workspaceData){
    log.fine(`Fetching artifacts in workspace ${workspaceData.name}`);
    try {
      this.currentArtifacts = await yggdrasilInterface.fetchArtifactsInWorkspace(workspaceData.uri);
      log.fine(`Workspace contained ${this.currentArtifacts.length} artifact(s)!`);
      //fetch affordances
      for(var i in this.currentArtifacts){
        try {
          this.currentArtifacts[i] = await yggdrasilInterface.resolveArtifactAffordances(this.currentArtifacts[i].uri);
        } catch(error) {
          log.error(error)
        }
      }
      return Promise.resolve(this.currentArtifacts);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  clearArtifactsBar() {
    this.currentArtifacts = []
    this.$artifactsScrollContainer.hide();
  }

  clearAffordancesBar() {
    this.$affordancesScrollContainer.hide();
  }

}