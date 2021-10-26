class WorkspaceButtonsController {

  _workspace = undefined
  _fileTabController = undefined

  $saveButton = $('#save-code')
  $loadButton = $('#load-code')
  $runButton = $('#run-mas')

  $loadModal = $('#load-chooser-modal')
  _loadModal = new bootstrap.Modal(document.getElementById('load-chooser-modal'))

  $runModal = $('#mas-config-modal')
  _runModal = new bootstrap.Modal(document.getElementById('mas-config-modal'))

  constructor(workspace, fileTabController){
    this._workspace = workspace
    this._fileTabController = fileTabController
    this.$saveButton.click(e => this.saveCode())
    this.$loadButton.click(e => this.showLoadMenu())
    this.$runButton.click(e => this.runMas())
    this._loadModal.hide()

    var $select = this.$loadModal.find('select')
    this.$loadModal.find('.btn-confirm').click(e => {
      this._loadCode($select.val())
      this._loadModal.hide()
    })

    this.$runModal.find('.btn-confirm').click(e => {
      this._runModal.hide()
    })
  }

  async saveCode() {
    var code = JasonGenerator.generate(this._workspace)
    if(!code){
      dashboard.showError(`Code for agent ${id} is not well written`);
      return;
    }
    var xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this._workspace, true))
    var id = this._fileTabController.getCurrentAgent()
    var exists = false;
    try {
      await masInterface.getAgentSource(id)
      exists = true;
    } catch (error){
      exists = false;
    }
    try{
      if(exists){
        var confirm = await dashboard.waitConfirm("Are you sure? This will overwrite the previously saved code")
        if(confirm){
          await masInterface.updateAgentSource(id, code, xml)
          dashboard.showSuccess(`Agent ${id} saved`)
        }
      } else {
        await masInterface.createAgentSource(id, code, xml)
        dashboard.showSuccess(`Agent ${id} saved`)
      }
    }
    catch(error){
      dashboard.showError(`Unable to save ${id} code`) //TODO better error
    }
  }

  async showLoadMenu(){
    try{
      var agentSources = await masInterface.getAvailableAgents();
    } catch(error){
      dashboard.showError(error)
    }
    console.log(agentSources)
    if(agentSources.length == 0) {
      dashboard.showInfo("There are no agents to be loaded")
      return
    }
    var $select = this.$loadModal.find('select')
    for(const agent of agentSources){
      $select.append($('<option>', {
        value: agent.id,
        text: agent.id
      }));
    }
    this._loadModal.show()
  }

  async _loadCode(id){
    try{
      var agentSource = await masInterface.getAgentSource(id);
      this._fileTabController.loadTab(agentSource.id, agentSource.xml)
    } catch(error){
      dashboard.showError(error)
    }
  }

  async runMas(){
    this._runModal.show()
  }
}
