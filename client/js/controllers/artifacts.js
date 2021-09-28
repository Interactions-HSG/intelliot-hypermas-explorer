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
      //TODO better error handling
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
        propertiesNum: a.thingDescription.properties ? Object.keys(a.thingDescription.properties).length : undefined,
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
      $(`div[id='${artifact.id}']`).click(async () => await dashboard.handleEvent(event));
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
  }

  clearAffordancesBar() {
    this.$affordancesContainer.empty();
  }


  showAffordancesBar() {
    var $affordancesContent = Handlebars.templates.affordancesList({
      properties: this.selectedThing.properties,
      actions: this.selectedThing.actions,
      events: this.selectedThing.events,
      animate: true
    });
    this.$affordancesContainer.append($affordancesContent);
    this._addAffordancesTestHandler()
  }


  _addAffordancesTestHandler() {
    var getSchema = function (rootObj) {
      var inputData = {}
      for (const element of rootObj.children('input, select, div.object-schema')) {
        if ($(element).is('div')) {
          var propName = $(element).children('p.key').text()
          inputData[propName] = {}
          for (const prop of $(element).children('.properties').children('.input-group')) {
            var propObj = getSchema($(prop))
            Object.keys(propObj).forEach(k => {
              inputData[propName][k] = propObj[k]
            })
          }
        } else {
          var propName = $(element).attr('name')
          var propValue = $(element).val()
          if ($(element).attr('type') == 'number') {
            propValue = propValue ? Number(propValue) : undefined
          }
          inputData[propName] = propValue
        }
      }
      return inputData;
    }
    $('form').each(function () {
      $(this).submit(async (e) => {
        e.preventDefault();
        var id = this.id.split("_")[1]
        var input = getSchema($(this).find('.input-schema'))['Input:']
        var type = this.name
        var event = {
          data: {
            type,
            id,
            input
          },
          type: ArtifactsController.testAffordanceEvent
        }
        await dashboard.handleEvent(event);
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
        log.error(`Trying to use unsupported affordance ${affordanceId} of type: ${type}`)
        break;
    }
    this._displayResultToast(affordanceId, res)
  }

  _displayResultToast(invokedAffordance, result) {
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