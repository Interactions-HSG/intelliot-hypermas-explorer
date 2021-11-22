//Controller for the Environment discovery and setup, talks to the backend using the environmentInterface
class EnvironmentController {
  
  static selectWorkspaceEvent = "selectWorkspace";

  environmentId = null;
  workspaces = [];
  currentValue = null;
  //jquery shortcuts
  $workspaceChooser = $('#workspace-chooser')
  $exploreButton = $('#explore-button')

  constructor(environmentId){
    this.environmentId = environmentId;
    this.workspaces = [];
    this.currentValue = "empty"
    this.$exploreButton.hide();

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
      //trigger event with first workspace
      var event = {
        data: {
          parent: this.environmentId,
          uri: this.$workspaceChooser.val(),
          id: this.$workspaceChooser.find('option:selected').text()
        },
        type: EnvironmentController.selectWorkspaceEvent
      };
      await dashboard.handleEvent(event)
      return Promise.resolve(this.workspaces)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  updateWorkspaceChooser() {
    // Remove all options in workspace-chooser
    if (this.workspaces.length > 0) {
      this.$workspaceChooser.find('option').remove();
    }
    // Add workspaces to workspace-chooser
    for (var workspaceIndex in this.workspaces) {
      var workspace = this.workspaces[workspaceIndex];
      this.$workspaceChooser.append(new Option(workspace.id, workspace.uri));
    }
  }

  showExploreButton(envId, workspaceId){
    this.$exploreButton.show();
    var location = window.location.href.slice(0,window.location.href.lastIndexOf('/'))
      +'/explorer/'+envId+'/'+workspaceId
    console.log(location)
    this.$exploreButton.attr('href', location)
  }
  
  async reloadArtifactsFromWorkspace(environmentId, workspaceId) {
    var currentArtifacts = []
    log.fine(`Fetching artifacts in workspace ${workspaceId}`);
    try {
      var artifacts = await environmentInterface.fetchArtifacts(environmentId, workspaceId);
      log.fine(`Workspace contained ${artifacts.length} artifact(s)!`);
      for (var artifact of artifacts) {
        try {
          var artifactDescription = await environmentInterface.getArtifactDescription(environmentId, workspaceId, artifact.id)
          currentArtifacts.push(artifactDescription)
        } catch (error) {
          log.error(error)
        }
      }
      this.showExploreButton(environmentId, workspaceId)
      return Promise.resolve(currentArtifacts);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}