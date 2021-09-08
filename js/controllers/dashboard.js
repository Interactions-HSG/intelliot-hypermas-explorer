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

  init: async function () {
    log.fine('Initializing the dashboard and loading data');
    this.$container.hide();
    // Load Environment
    try {
      await this.environmentController.fetchWorkspaces();
      this.revealDashboard();
    } catch (error) {
      this.showError(error)
    }
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
  },

  handleArtifactSelectedEvent: function(artifactData) {
    (async () => {
      try{
        await this.artifactsController.reloadAffordancesFromArtifact(artifactData);
      } catch (error) {
        showError(error)
      }
    })();
  },

  handleTestAffordanceEvent: function(affordanceData) {
    (async () => {
      try{
        await this.artifactsController.testAffordance(affordanceData);
      } catch (error) {
        showError(error)
      }
    })();
  },

  showError: function (message) {
    //TODO show an alert box or something
    log.error(message)
    alert("ERROR: " + message)
  },

  revealDashboard: function () {
    window.setTimeout(function () {
      dashboard.$loading.fadeOut(200);
      dashboard.$container.fadeIn(200);
      dashboard.$settings.fadeIn(150);
    }, 1000);
  }

}