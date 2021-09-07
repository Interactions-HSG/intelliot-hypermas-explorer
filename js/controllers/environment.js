//Controller for the Environment discovery and setup, talks to Yggdrasil using yggdrasilInterface.js
class EnvironmentController {
  
  static selectWorkspaceEvent = "selectWorkspace";

  currentEnvironment = null;
  workspacesInformation = [];
  //jquery shortcuts
  $workspaceChooser = $('#workspace-chooser')

  constructor(environmentName){
    this.currentEnvironment = environmentName;
    this.workspacesInformation = [];

    this.$workspaceChooser.change(function () {
      var event = {
        data: {
          uri: this.options[this.selectedIndex].value,
          name: this.options[this.selectedIndex].text,
        },
        type: EnvironmentController.selectWorkspaceEvent
      };
      dashboard.handleEvent(event)
    });
  }

  async fetchWorkspaces() {
    log.fine("Fetching Yggdrasil workspaces in environment " + this.currentEnvironment);
    try {
      this.workspacesInformation = await yggdrasilInterface.fetchWorkspacesInEnvironment(this.currentEnvironment)
      log.fine("Workspaces retrieved.")
      log.fine('Environment ' + this.currentEnvironment + ' contains ' + this.workspacesInformation.length + ' workspace(s)!');
      this.updateWorkspaceChooser()
      return Promise.resolve(this.workspacesInformation)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  updateWorkspaceChooser() {

    log.fineSeparate('Updating inspector...', this.workspacesInformation);

    // Remove all options in workspace-chooser
    if (this.workspacesInformation.length > 0) {
      this.$workspaceChooser.find('option').remove();
      this.$workspaceChooser.append(new Option("Select Workspace...", "empty"));
    }

    // Add workspaces to workspace-chooser
    for (var workspaceIndex in this.workspacesInformation) {
      var workspaceInformation = this.workspacesInformation[workspaceIndex];
      this.$workspaceChooser.append(new Option(workspaceInformation.name, workspaceInformation.uri));
    }
  }
}