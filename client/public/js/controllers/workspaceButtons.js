class WorkspaceButtonsController {

  _workspace = undefined
  _fileTabController = undefined

  $saveButton = $('#save-code')
  $loadButton = $('#load-code')

  $defineButton = $('#define-runtime')
  $runButton = $('#run-mas')

  $loadModal = $('#load-chooser-modal')
  _loadModal = new bootstrap.Modal(document.getElementById('load-chooser-modal'))

  _configModalController = undefined;

  constructor(workspace, fileTabController){
    this._workspace = workspace
    this._fileTabController = fileTabController
    this._configModalController = new RuntimeConfigModal(workspace)

    this.$saveButton.click(e => this.saveCode())
    this.$loadButton.click(e => this.showLoadMenu())
    this.$defineButton.click(e => this.showConfigMenu())
    this._loadModal.hide()

    var $select = this.$loadModal.find('select')
    this.$loadModal.find('.btn-confirm').click(e => {
      this._loadCode($select.val())
      this._loadModal.hide()
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
      await runtimeInterface.getAgentSource(id)
      exists = true;
    } catch (error){
      exists = false;
    }
    try{
      if(exists){
        var confirm = await dashboard.waitConfirm("Are you sure? This will overwrite the previously saved code")
        if(confirm){
          await runtimeInterface.updateAgentSource(id, code, xml)
          dashboard.showSuccess(`Agent ${id} saved`)
        }
      } else {
        await runtimeInterface.createAgentSource(id, code, xml)
        dashboard.showSuccess(`Agent ${id} saved`)
      }
    }
    catch(error){
      dashboard.showError(`Unable to save ${id} code`) //TODO better error
    }
  }

  async showLoadMenu(){
    try{
      var agentSources = await runtimeInterface.getAvailableAgents();
    } catch(error){
      dashboard.showError(error)
    }
    console.log(agentSources)
    if(agentSources.length == 0) {
      dashboard.showInfo("There are no agents to be loaded")
      return
    }
    var $select = this.$loadModal.find('select')
    $select.find('option').remove();
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
      var agentSource = await runtimeInterface.getAgentSource(id);
      this._fileTabController.loadTab(agentSource.id, agentSource.xml)
    } catch(error){
      dashboard.showError(error)
    }
  }

  async showConfigMenu(){
    await this._configModalController.showMenu();
  }
}
