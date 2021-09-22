class ArtifactsController {

  static selectArtifactEvent = "selectArtifact";
  static testAffordanceEvent = "testAffordance";

  currentArtifacts = []
  selectedArtifact = undefined
  selectedThing = undefined
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

  async showArtifactAffordances(artifactId) {
    this.selectedArtifact = this.currentArtifacts.find(a => a.id == artifactId);
    this.selectedThing = new ThingInterface(this.selectedArtifact.thingDescription);
    await this.selectedThing.loadThing();
    this.clearAffordancesBar()
    this.showAffordancesBar()
    return this.selectedArtifact;
  }

  clearAffordancesBar() {
    this.$affordancesContainer.empty();
  }

  testAction =[ 
    {
    id: "TestAction",
    "@type": [
        "https://www.w3.org/2019/wot/td#ActionAffordance",
    ],
    forms: [
        {
            "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.2/elbow",
            "contentType": "application/json",
            "op": [
                "invokeaction"
            ],
            "htv:methodName": "PUT"
        }
    ],
    "input": {
        "type": "number",
    }
    },
  ]

  showAffordancesBar() {
    var $affordancesContent = Handlebars.templates.affordancesList({
      properties: this.selectedThing.properties,
      actions: this.testAction,
      events: this.selectedThing.events,
      animate: true
    });
    this.$affordancesContainer.append($affordancesContent);
    this._addAffordancesTestHandler()
  }

  
  _addAffordancesTestHandler() {
    $("div.affordance").each( function() {
      $(this).find('span.test-affordance').click(e => {
        var array = this.id.split("_")
        var id = array[1]
        var type = array[0]
        var data = $('form[id="form_'+id+'"]').serializeArray()
        var event = {
          data: {
            type,
            id,
            input: data
          },
          type: ArtifactsController.testAffordanceEvent
        }
        console.log(event.data.input)
        //dashboard.handleEvent(event);
      })
    })
  }

  async testAffordance(affordanceId, type, data) {
    log.fine(`Testing ${affordanceId} ${type}`);
    var res = {}
    switch (type) {
      case 'property':
        res = await this.selectedThing.readProperty(affordanceId)
        break;
      case 'action':
        res = await this.selectedThing.invokeAction(affordanceId, data)
        break;
      default:
        log.error(`Test unsupported affordance ${affordanceId} of type: ${type}`)
        break;
    }
    console.log(res)
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