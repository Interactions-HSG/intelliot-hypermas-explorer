// Hypermedia MAS Explorer
// Interactions Research Group, University of St.Gallen
// Based on work by Ralf Mosshammer / Siemens AG (2015) and Simon Mayer / Pro2Future AG (2017)
//
// Main UI controls and handlers, talks with component logic controllers to retrieve data

var dashboard = {

  // jquery shortcuts
  $container: $('#container'),
  $settings: $('#settings'),
  $loading: $('#loading'),

  //component controllers
  environmentController: new EnvironmentController("intelliot"),
  artifactsController: new ArtifactsController(),
  blocklyController: new BlocklyController(),

  init: async function () {
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
  },

  handleEvent: function (event) {
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
  },

  handleSelectWorkspaceEvent: function (workspaceData){
    this.artifactsController.clearArtifactsBar();
    this.artifactsController.clearAffordancesBar();
    (async ()  => {
      if(workspaceData.uri != "empty"){
        try{
          await this.artifactsController.reloadArtifactsFromWorkspace(workspaceData);
        } catch (error){
          showError(error)
        }
      }
    })();
    this.blocklyController.hideArea();
  },

  handleArtifactSelectedEvent: function(artifactData) {
    (async () => {
      try{
        artifact = await this.artifactsController.reloadAffordancesFromArtifact(artifactData);
        this.blocklyController.hideArea();
        this.blocklyController.loadArtifact(artifact);
        this.blocklyController.showArea();
      } catch (error) {
        this.showError(error)
      }
    })();
  },

  handleTestAffordanceEvent: function(affordanceData) {
    (async () => {
      try{
        await this.artifactsController.testAffordance(affordanceData);
      } catch (error) {
        this.showError(error)
      }
    })();
  },

  showError: function (message) {
    //TODO show an alert box or something
    log.error(message)
    alert("ERROR: " + message)
  },

  revealDashboard: function () {
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