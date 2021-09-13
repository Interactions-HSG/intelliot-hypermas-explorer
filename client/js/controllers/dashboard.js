class Dashboard {

  //component controllers
  environmentController = new EnvironmentController("intelliot");
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

  handleEvent(event) {
    switch (event.type) {
      case EnvironmentController.selectWorkspaceEvent:
        this.handleSelectWorkspaceEvent(event.data)
        break;
      case ArtifactsController.selectArtifactEvent:
        this.handleArtifactSelectedEvent(event.data)
        break;
      case ArtifactsController.testAffordanceEvent:
        this.handleTestAffordanceEvent(event.data)
        break;
      default:
        log.error(`Unrecognized event of type ${event.type}`)
        break;
    }
  }

  handleSelectWorkspaceEvent(workspaceData) {
    this.artifactsController.clearArtifactsBar();
    this.artifactsController.clearAffordancesBar();
    (async () => {
      if (workspaceData.uri != "empty") {
        try {
          await this.artifactsController.reloadArtifactsFromWorkspace(workspaceData);
        } catch (error) {
          showError(error)
        }
      }
    })();
    this.blocklyController.hideArea();
  }

  handleArtifactSelectedEvent(artifactData) {
      (async () => {
        try {
          var artifact = await this.artifactsController.reloadAffordancesFromArtifact(artifactData);
          this.blocklyController.hideArea();
          this.blocklyController.loadArtifact(artifact);
          this.blocklyController.showArea();
        } catch (error) {
          this.showError(error)
        }
      })();
    }

    handleTestAffordanceEvent(affordanceData) {
      (async () => {
        try {
          await this.artifactsController.testAffordance(affordanceData);
        } catch (error) {
          this.showError(error)
        }
      })();
    }

  showError(message) {
    log.error(message)
    alert("ERROR: " + message)
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