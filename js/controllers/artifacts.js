class ArtifactsController {

  static selectArtifactEvent = "selectArtifact";
  static testAffordanceEvent = "testAffordance";
  //A map of type (uri) => {artifact}
  currentArtifacts = {}
  selectedArtifact = undefined
  
  //jquery shortcuts
  $artifactsContainer = $('#artifacts-container')
  $affordancesContainer = $('#affordances-container')
  $resultsContainer = $('#results-container')

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
    this.$artifactsContainer.append($artifactsContent);
    //set click handler
    Object.keys(this.currentArtifacts).forEach(uri => {
      var event = {
        data: {
          uri: uri,
        },
        type: ArtifactsController.selectArtifactEvent
      };
      $(`div[id='${uri}']`).click(() => dashboard.handleEvent(event));
    });
    this.$artifactsContainer.show()
  }

  clearArtifactsBar() {
    this.currentArtifacts = {}
    this.$artifactsContainer.empty().hide();
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
    var $affordancesContent = Handlebars.templates.affordancesList({ currentAffordances: this.selectedArtifact.affordances, animate: true });
    this.$affordancesContainer.append($affordancesContent);
    this.addAffordancesTestHandler()
    this.$affordancesContainer.show();
  }

  addAffordancesTestHandler(){
    var selectedArtifact = this.selectedArtifact

    selectedArtifact.affordances.forEach(a => {
      var event = {
        data: {
          affordance: a,
          artifactRdfStore: selectedArtifact.rdfStore
        },
        type: ArtifactsController.testAffordanceEvent
      };
      $("div[id='" + a.id + "']")
      .find("span.test-affordance")
      .click(() => dashboard.handleEvent(event));
    });

  }

  //TODO debug
  async testAffordance(affordanceData){
    log.fine(`Testing ${affordanceData.affordance.title} affordance`);

    var affordanceId = affordanceData.affordance.id
    var inputData = null

    if(affordanceData.affordance.hasInputSchema){
      // Assemble input data according to request
      // This part should definitely be done using node-wot; however, this needs to be synchronized with wot-td (i.e., yggdrasil needs to provide json TDs that node-wot can parse)
      inputData = {};
      $("div[id='" + affordanceId + "']").find("input").each(function(index) {
        inputData[$(this).attr('id')] = $(this).val();
      })
    }
    try{
      var res = await yggdrasilInterface.testAffordance(affordanceData.affordance, affordanceData.artifactRdfStore, inputData)
      this.displayResultToast(affordanceData.affordance.title, res)
    } catch (error) {
      console.log(error)
    }
  }

  clearAffordancesBar() {
    this.$affordancesContainer.empty().hide();
  }

  displayResultToast(invokedAffordance, result){
    var $toast = $(Handlebars.templates.resultContent({invoked: invokedAffordance, result: result}))
    this.$resultsContainer.find('.toast.hide').remove()
    if(this.$resultsContainer.children().length > 3){
      //always show no more than 4
      //TODO fix animation?
      this.$resultsContainer.children(":first").remove() 
    }
    this.$resultsContainer.append($toast)
    $toast.toast({autohide: false, animation:false})
    $toast.toast('show')
    
    
  }

}