// Hypermedia MAS Explorer
// Interactions Research Group, University of St.Gallen
// Based on work by Ralf Mosshammer / Siemens AG (2015) and Simon Mayer / Pro2Future AG (2017)
//
// Main UI controls and handlers, talks with component logic controllers to retrieve data

var dashboard = {
  
  // jquery shortcuts
  $artifactsScrollContainer: $('#artifacts-scroll-container'),
  $affordancesScrollContainer: $('#affordances-scroll-container'),
  $workspaceChooser: $('#workspace-chooser'),
  $responsesContainer: $('#responses-container'),

  clickHandlerTypes: {
    'selectWorkspace' : 'selectWorkspace',
    'selectArtifact' : 'selectArtifact',
    'followAffordance' : 'followAffordance',
  },

  init: async function () {
    log.fine('Initializing the dashboard and loading data');
    // Load Environment
    var workspaces = null
    try {
      workspaces = await EnvironmentController.fetchWorkspaces();
      this.revealDashboard()
    } catch (error){
      this.showError(error)
    }
  },

  showError: function(message){
    //TODO show an alert box or something
    alert("ERROR: "+message)
  },

  revealDashboard: function () {
    window.setTimeout(function () {
      main.$loading.fadeOut(200);
      main.$container.fadeIn(200);
      main.$settings.fadeIn(200);
    }, 2000);
  },

}