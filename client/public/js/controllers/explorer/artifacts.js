class ArtifactsController {

  static selectArtifactEvent = "selectArtifact";
  static testAffordanceEvent = "testAffordance";

  currentArtifacts = []
  selectedArtifact = undefined
  selectedThing = undefined
  maxToastShown = 7

  //jquery shortcuts
  $artifactsContainer = $('#artifacts-container')
  $affordancesContainer = $('#affordances-container')
  $resultsContainer = $('#results-container')

  async reloadArtifactsFromWorkspace(environmentId, workspaceId) {
    this.currentArtifacts = []
    log.fine(`Fetching artifacts in workspace ${workspaceId}`);
    try {
      var artifacts = await environmentInterface.fetchArtifacts(environmentId, workspaceId);
      if(artifacts.length){
        log.fine(`Workspace contained ${artifacts.length} artifact(s)!`);
        for (var artifact of artifacts) {
          try {
            var artifactDescription = await environmentInterface.getArtifactDescription(environmentId, workspaceId, artifact.id)
            this.currentArtifacts.push(artifactDescription)
          } catch (error) {
            log.error(error)
          }
        }
      }
      //this.showArtifactsBar();
      return Promise.resolve(this.currentArtifacts);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  _hasSecurity(td){
    var value = td.security && td.securityDefinitions[td.security].scheme != "nosec"
    return value;
  }

  showArtifactsBar() {
    //select information to display
    var displayList = this.currentArtifacts.map(a => {
      return {
        id: a.id,
        propertiesNum: a.thingDescription.properties ? Object.keys(a.thingDescription.properties).length : undefined,
        actionsNum: a.thingDescription.actions ? Object.keys(a.thingDescription.actions).length : undefined,
        eventsNum: a.thingDescription.events ? Object.keys(a.thingDescription.events).length : undefined,
        hasSecurity: this._hasSecurity(a.thingDescription)
      }
    });

    //generate DOM elements
    var $artifactsContent = Handlebars.templates.artifactsList({
      currentArtifacts: displayList,
      animate: true,
    });
    this.$artifactsContainer.append($artifactsContent);

    //add click handler
    this.currentArtifacts.forEach(artifact => {
      $(`div[id='${artifact.id}']`).click(e => this.showArtifactAffordances(artifact.id));
      $(`div[id='${artifact.id}']`).click(function(){
        $('.dashcard').removeClass('selected');
        $(this).addClass('selected');
      })
    });

    var controller = this;
    $('.login-thing').click(function(e){
      var artifactId = $(this).attr('id').replace("login-", "")
      var artifact = controller.currentArtifacts.find(a => a.id == artifactId);
      var td = artifact.thingDescription
      if(controller._hasSecurity(td)){
        var def = td.securityDefinitions[td.security]
        var key = prompt(`Set authentication key.\nScheme: ${def.scheme}\nIn: ${def.in}\nName: ${def.name}`)
        artifact.key = key;
      }
    })
  }

  clearArtifactsBar() {
    this.currentArtifacts = []
    this.$artifactsContainer.empty();
  }

  async showArtifactAffordances(artifactId) {
    this.selectedArtifact = this.currentArtifacts.find(a => a.id == artifactId);
    var td = this.selectedArtifact.thingDescription
    if(controller._hasSecurity(td) && !this.selectedArtifact.key){
      alert("You may require to login before using the affordances.")
    }
    this.selectedThing = new ThingInterface(this.selectedArtifact.thingDescription, this.selectedArtifact.key);
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
      for (const element of rootObj.find('input, select, div.object-schema')) {
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
    var controller = this
    $('form.affordance-form').each(function () {
      $(this).submit(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        var id = this.id.split("_")[1]
        var input = getSchema($(this).find('.input-schema'))['Input:']
        var type = this.name
        await controller.testAffordance(id, type, input);
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