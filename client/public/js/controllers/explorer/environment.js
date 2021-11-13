//Controller for the Environment discovery and setup, talks to the backend using the environmentInterface
class EnvironmentController {
  
  static selectWorkspaceEvent = "selectWorkspace";

  environmentId = null;
  workspaces = [];
  currentValue = null;
  //jquery shortcuts
  $workspaceChooser = $('#workspace-chooser')

  constructor(environmentId){
    this.environmentId = environmentId;
    this.workspaces = [];
    this.currentValue = "empty"

    this.$workspaceChooser.change(async function () {
      var event = {
        data: {
          parent: environmentId,
          uri: this.options[this.selectedIndex].value,
          id: this.options[this.selectedIndex].text,
        },
        type: EnvironmentController.selectWorkspaceEvent
      };
      var res = await dashboard.handleEvent(event)
      if(!res) {
        console.log(res)
        $(this).val(this.currentValue);
        return false;
      }
      this.currentValue =  this.options[this.selectedIndex].value;
    });
  }

  async fetchWorkspaces() {
    log.fine("Fetching workspaces in environment " + this.environmentId);
    try {
      this.workspaces = await environmentInterface.fetchWorkspaces(this.environmentId)
      log.fine('Environment ' + this.environmentId + ' contains ' + this.workspaces.length + ' workspace(s)!');
      this.updateWorkspaceChooser()
      return Promise.resolve(this.workspaces)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  updateWorkspaceChooser() {
    // Remove all options in workspace-chooser
    if (this.workspaces.length > 0) {
      this.$workspaceChooser.find('option').remove();
      this.$workspaceChooser.append(new Option("Select Workspace...", "empty"));
    }
    // Add workspaces to workspace-chooser
    for (var workspaceIndex in this.workspaces) {
      var workspace = this.workspaces[workspaceIndex];
      this.$workspaceChooser.append(new Option(workspace.id, workspace.uri));
    }
  }
}