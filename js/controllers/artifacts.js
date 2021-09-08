class ArtifactsController {

  //A map of type (uri) => {artifact}
  currentArtifacts = {}
  
  //jquery shortcuts
  $artifactsScrollContainer = $('#artifacts-scroll-container')
  $affordancesScrollContainer = $('#affordances-scroll-container')

  async reloadArtifactsFromWorkspace(workspaceData){
    log.fine(`Fetching artifacts in workspace ${workspaceData.name}`);
    try {
      var fetchedArtifacts = await yggdrasilInterface.fetchArtifactsInWorkspace(workspaceData.uri);
      log.fine(`Workspace contained ${fetchedArtifacts.length} artifact(s)!`);
      //fetch affordances
      for(var i in fetchedArtifacts){
        try {
          this.currentArtifacts[fetchedArtifacts[i].uri] = await yggdrasilInterface.resolveArtifactAffordances(fetchedArtifacts[i].uri);
        } catch(error) {
          log.error(error)
        }
      }
      this.showArtifactsBar();
      return Promise.resolve(this.currentArtifacts);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  showArtifactsBar() {
    var $artifactsContent = Handlebars.templates.artifactsList({ currentArtifacts: this.currentArtifacts, animate: true });
    this.$artifactsScrollContainer.append($artifactsContent);
    this.$artifactsScrollContainer.show()
  }

  clearArtifactsBar() {
    this.currentArtifacts = {}
    this.$artifactsScrollContainer.empty();
    this.$artifactsScrollContainer.hide();
  }

  clearAffordancesBar() {
    this.$affordancesScrollContainer.hide();
  }

}