class ArtifactsController {

  static selectArtifactEvent = "selectArtifact";
  static testAffordanceEvent = "testAffordance";

  currentArtifacts = []
  selectedArtifact = undefined
  maxToastShown = 5

  //jquery shortcuts
  $artifactsContainer = $('#artifacts-container')
  $affordancesContainer = $('#affordances-container')
  $resultsContainer = $('#results-container')

  async reloadArtifactsFromWorkspace(environmentId, workspaceId) {
    this.currentArtifacts = []
    log.fine(`Fetching artifacts in workspace ${workspaceId}`);
    try {
      var artifacts = await yggdrasilInterface.fetchArtifacts(environmentId, workspaceId);
      log.fine(`Workspace contained ${artifacts.length} artifact(s)!`);
      //fetch affordances
      for (var artifact of artifacts) {
        try {
          var artifactDescription = await yggdrasilInterface.getArtifactDescription(environmentId, workspaceId, artifact.id)
          this.currentArtifacts.push(artifactDescription)
        } catch (error) {
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
    //select information to display
    var displayList = this.currentArtifacts.map(a => {
      return {
        id: a.id,
        propertiesNum:a.thingDescription.properties ? Object.keys(a.thingDescription.properties).length: undefined,
        actionsNum: a.thingDescription.actions ? Object.keys(a.thingDescription.actions).length : undefined,
        eventsNum: a.thingDescription.events ? Object.keys(a.thingDescription.events).length : undefined
      }
    });
    
    //generate DOM elements
    var $artifactsContent = Handlebars.templates.artifactsList({
      currentArtifacts: displayList,
      animate: true
    });
    this.$artifactsContainer.append($artifactsContent);

    //add click handler
    this.currentArtifacts.forEach(artifact => {
      var event = {
        data: artifact,
        type: ArtifactsController.selectArtifactEvent
      };
      $(`div[id='${artifact.id}']`).click(() => dashboard.handleEvent(event));
    });
  }

  clearArtifactsBar() {
    this.currentArtifacts = []
    this.$artifactsContainer.empty();
  }

  showArtifactAffordances(artifactId) {
    this.selectedArtifact = this.currentArtifacts.find(a => a.id == artifactId);
    this.clearAffordancesBar()
    this.showAffordancesBar()
    return this.selectedArtifact;
  }

  clearAffordancesBar() {
    this.$affordancesContainer.empty();
  }

  showAffordancesBar() {
    //generate information to display
    var properties = this._generatePropertyList(this.selectedArtifact.thingDescription.properties)
    var actions = this._generateActionList(this.selectedArtifact.thingDescription.actions)
    var events = this._generateEventList(this.selectedArtifact.thingDescription.events)
    //generate and add DOM elements
    var $affordancesContent = Handlebars.templates.affordancesList({
      properties,
      actions,
      events,
      animate: true
    });
    this.$affordancesContainer.append($affordancesContent);
    this._addAffordancesTestHandler()
  }

  _generatePropertyList(properties){
    if(!properties) {
      return []
    }
    return Object.keys(properties).map(id => { 
      return {
        id,
        description: properties[id].description,
      }
    })
  }

  _generateActionList(actions){
    if(!actions) {
      return []
    }
    return Object.keys(actions).map(id => {
      var input = actions[id].input
      return {
        id,
        input,
        description: actions[id].description,
      }
    })
  }

  _generateEventList(properties){
    if(!properties) {
      return []
    }
    //TODO implement
    return []
  }
  
  _addAffordancesTestHandler() {
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
  async testAffordance(affordanceData) {
    log.fine(`Testing ${affordanceData.affordance.title} affordance`);

    var affordanceId = affordanceData.affordance.id
    var inputData = null

    if (affordanceData.affordance.hasInputSchema) {
      // Assemble input data according to request
      // This part should definitely be done using node-wot; however, this needs to be synchronized with wot-td (i.e., yggdrasil needs to provide json TDs that node-wot can parse)
      inputData = {};
      $("div[id='" + affordanceId + "']").find("input").each(function (index) {
        inputData[$(this).attr('id')] = $(this).val();
      })
    }
    try {
      var res = await yggdrasilInterface.testAffordance(affordanceData.affordance, affordanceData.artifactRdfStore, inputData)
      this.displayResultToast(affordanceData.affordance.title, res)
    } catch (error) {
      console.log(error)
    }
  }

  displayResultToast(invokedAffordance, result) {
    var $toast = $(Handlebars.templates.resultContent({
      invoked: invokedAffordance,
      result: result
    }))
    this.$resultsContainer.find('.toast.hide').remove()
    if (this.$resultsContainer.children().length >= this.maxToastShown) {
      this.$resultsContainer.children(":first").remove()
    }
    this.$resultsContainer.append($toast)
    $toast.toast({
      autohide: false,
      animation: false
    })
    $toast.toast('show')


  }

}