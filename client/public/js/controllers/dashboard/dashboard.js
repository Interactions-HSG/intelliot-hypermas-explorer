class Dashboard {
  environmentId = "intelliot"
  environmentController = new EnvironmentController(this.environmentId);
  blocklyController = new BlocklyController();

  // jquery shortcuts
  $container = $('#container');
  $settings = $('#settings');
  $loading = $('#loading');


  async init() {
    log.fine('Initializing the dashboard and loading data');
    this.$container.hide()
    this.blocklyController.initialize();
    try {
      await this.environmentController.fetchWorkspaces();
    } catch (error) {
      this.showError(error)
    }
  }

  //returns a promise whose value resolve to:
  // - true when the event is handled, 
  // - false when ther was an error and it might be necessary to abort the event.
  async handleEvent(event) {
    switch (event.type) {
      case EnvironmentController.selectWorkspaceEvent:
        return await this.handleSelectWorkspaceEvent(event.data)
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
      this.blocklyController.clearIDE();
      this.blocklyController.hideArea();
      try {
        var artifacts = await this.environmentController.reloadArtifactsFromWorkspace(workspaceData.parent, workspaceData.id);
        for(const a of artifacts){
          this.blocklyController.loadArtifact(a)
        }
      } catch (error) {
        this.showError(error)
        return Promise.resolve(false) //abort change
      }
      await this.revealDashboard();
      this.blocklyController.showArea("new_agent")
    }
    return Promise.resolve(res)
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