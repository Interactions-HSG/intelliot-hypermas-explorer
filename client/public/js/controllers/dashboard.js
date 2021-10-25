class Dashboard {

  environmentId = "intelliot"
  //component controllers
  environmentController = new EnvironmentController(this.environmentId);
  artifactsController = new ArtifactsController();
  blocklyController = new BlocklyController();

  // jquery shortcuts
  $container = $('#container');
  $settings = $('#settings');
  $loading = $('#loading');


  async init() {
    log.fine('Initializing the dashboard and loading data');
    // Load Environment
    this.$container.hide()
    try {
      await this.environmentController.fetchWorkspaces();
      await this.revealDashboard();
    } catch (error) {
      this.showError(error)
    }
    this.blocklyController.initialize();
  }

  //returns a promise whose value resolve to:
  // - true when the event is handled, 
  // - false when ther was an error and it might be necessary to abort the event.
  async handleEvent(event) {
    switch (event.type) {
      case EnvironmentController.selectWorkspaceEvent:
        return await this.handleSelectWorkspaceEvent(event.data)
      case ArtifactsController.selectArtifactEvent:
        return await this.handleArtifactSelectedEvent(event.data)
      case ArtifactsController.testAffordanceEvent:
        return await this.handleTestAffordanceEvent(event.data)
      default:
        log.error(`Unrecognized event of type ${event.type}`)
        return new Promise.resolve(false);
    }
  }

  async handleSelectWorkspaceEvent(workspaceData) {
    var res = true;
    if(!this.blocklyController.isEmpty()){
      var res = await this.waitConfirm("Are you sure? You will lose all your blocks")
    }
    if(res){
      this.artifactsController.clearArtifactsBar();
      this.artifactsController.clearAffordancesBar();
      this.blocklyController.clearIDE();
      this.blocklyController.hideArea();
      this.blocklyController.hideLauncher();
      if (workspaceData.uri != "empty") {
        try {
          await this.artifactsController.reloadArtifactsFromWorkspace(workspaceData.parent, workspaceData.id);
        } catch (error) {
          this.showError(error)
          return Promise.resolve(false) //abort change
        }
        this.blocklyController.showLauncher();
      }
    }
    return Promise.resolve(res)
  }

  async handleArtifactSelectedEvent(artifactData) {
      try {
        this.artifactsController.showArtifactAffordances(artifactData.id);
        this.blocklyController.hideMenu();
        this.blocklyController.loadArtifact(artifactData);
        return Promise.resolve(true);
      } catch (error) {
        this.showError(error);
        return Promise.resolve(false);
      }
    }

  async handleTestAffordanceEvent(affordanceData) {
    try {
      await this.artifactsController.testAffordance(affordanceData.id, affordanceData.type, affordanceData.input);
      return Promise.resolve(true);
    } catch (error) {
      this.showError(error);
      return Promise.resolve(false);
    }
  }

  waitConfirm(message){
    //TODO better graphic
    return new Promise((resolve, _) => {
      var res = confirm(message)
      resolve(res)
    })
  }

  waitInput(message, defaultValue){
    //TODO better graphic
    return new Promise((resolve, _) => {
      var res = prompt(message, defaultValue)
      resolve(res)
    })
  }

  showError(message) {
    //TODO better graphic
    log.error(message)
    alert("ERROR: " + message)
  }

  showSuccess(message) {
    //TODO better graphic
    alert("SUCCESS: " + message)
  }

  showInfo(message) {
    //TODO better graphic
    alert("INFO: " + message)
  }

  revealDashboard() {
    return new Promise((resolve) => {
      window.setTimeout(function () {
        dashboard.$loading.fadeOut(200);
        dashboard.$container.fadeIn(200);
        dashboard.$settings.fadeIn(150);
        resolve()
      }, 1000);
    });
  }
}