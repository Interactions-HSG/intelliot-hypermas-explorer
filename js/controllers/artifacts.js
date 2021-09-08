class ArtifactsController {

  static selectArtifactEvent = "selectArtifact";
  //A map of type (uri) => {artifact}
  currentArtifacts = {}
  selectedArtifact = undefined
  
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
    //set click handler
    for (const uri of Object.keys(this.currentArtifacts)) {
      $(`div[id='${uri}']`).click(function() {
        var event = {
          data: {
            uri: uri,
          },
          type: ArtifactsController.selectArtifactEvent
        };
        dashboard.handleEvent(event);
      });
    }
    this.$artifactsScrollContainer.show()
  }

  clearArtifactsBar() {
    this.currentArtifacts = {}
    this.$artifactsScrollContainer.empty().hide();
  }

  reloadAffordancesFromArtifact(artifactData){
    this.selectedArtifact = this.currentArtifacts[artifactData.uri]
    log.fine(`Showing affordances for artifact ${this.selectedArtifact.title}`)
    //resolve input schemas
    for(var i in this.selectedArtifact.affordances){
      this.selectedArtifact.affordances[i] = yggdrasilInterface.parseInputSchema(this.selectedArtifact.affordances[i], this.selectedArtifact.rdfStore)
    }
    this.showAffordancesBar()
  }

  showAffordancesBar(){
    //render
    console.log(this.artifactAffordances)
    var $affordancesContent = Handlebars.templates.affordancesList({ currentAffordances: this.selectedArtifact.affordances, animate: true });
    this.$affordancesScrollContainer.append($affordancesContent);
    //TODO add click handler
    console.log(this.selectedArtifact.affordances)
    this.$affordancesScrollContainer.show();
  }

  clearAffordancesBar() {
    this.$affordancesScrollContainer.empty().hide();
  }

}