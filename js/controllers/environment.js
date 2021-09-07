//Controller for the Environment discovery and setup, talks to Yggdrasil using yggdrasilInterface.js

var EnvironmentController = {

  currentEnvironment: "intelliot",
  workspacesInformation: [],

  fetchWorkspaces: async function () {
    log.fine("Fetching Yggdrasil workspaces in environment " + this.currentEnvironment);
    try {
      fetchedWorkspaces = await yggdrasilInterface.fetchWorkspacesInEnvironment(this.currentEnvironment)
      log.fine("Workspaces retrieved.")
      log.fine('Environment ' + this.currentEnvironment + ' contains ' + fetchedWorkspaces.length + ' workspace(s)!');
      this.workspaceInformation = [];
      for (var i = 0; i < fetchedWorkspaces.length; i++) {
        workspaceUri = fetchedWorkspaces[i].uri;
        workspaceTitle = workspaceUri.split(/[\/]+/).pop(); // Find last URI path fragment

        var currentWorkspace = {
          title: workspaceTitle,
          uri: workspaceUri
        };
        this.workspacesInformation.push(currentWorkspace);
      }
      this.updateWorkspaceChooser()
      return Promise.resolve(this.workspacesInformation)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  updateWorkspaceChooser: function () {

    log.fineSeparate('Updating inspector...', this.workspacesInformation);

    // Remove all options in workspace-chooser
    if (this.workspacesInformation.length > 0) {
      dashboard.$workspaceChooser.find('option').remove();
      dashboard.$workspaceChooser.append(new Option("Select Workspace...", "empty"));
    }

    // Add workspaces to workspace-chooser
    for (workspaceIndex in this.workspacesInformation) {
      workspaceInformation = this.workspacesInformation[workspaceIndex];
      dashboard.$workspaceChooser.append(new Option(workspaceInformation.title, workspaceInformation.uri));
    }

    //register click handler
    dashboard.$workspaceChooser.change(function () {
      var event = {
        data: {
          name: this.options[this.selectedIndex].value,
          type: dashboard.clickHandlerTypes.selectWorkspace
        }
      };
      //dashboard.clickHandler(mockedClickEvent);
      console.log(event)
    });
  },
}