class WorkspaceButtonsController {

  _workspace = undefined
  _fileTabController = undefined

  $saveButton = $('#save-code')
  $loadButton = $('#load-code')
  $defineButton = $('#define-runtime')
  $runButton = $('#run-mas')
  $inspectButton = $('#inspect-runtime')

  $loadModal = $('#load-chooser-modal')
  _loadModal = new bootstrap.Modal(document.getElementById('load-chooser-modal'))

  $runModal = $('#run-chooser-modal')
  _runModal = new bootstrap.Modal(document.getElementById('run-chooser-modal'))

  _configModalController = undefined;
  _inspectModalController = undefined;

  constructor(workspace, fileTabController){
    this._workspace = workspace
    this._fileTabController = fileTabController
    this._configModalController = new RuntimeConfigModal(workspace)
    this._inspectModalController = new RuntimeInspectModal();

    this.$saveButton.click(e => this.saveCode())
    this.$loadButton.click(e => this.showLoadMenu())
    this.$runButton.click(e => this.showRunMenu())
    this.$defineButton.click(e => this.showConfigMenu())
    this.$inspectButton.click(e => this.showInspectMenu());
    
    this._runModal.hide()
    this._loadModal.hide()

    var $selectLoad = this.$loadModal.find('select')
    this.$loadModal.find('.btn-confirm').click(e => {
      this._loadCode($selectLoad.val())
      this._loadModal.hide()
    })

    var $selectRun = this.$runModal.find('select')
    this.$runModal.find('.btn-confirm').click(e => {
      this._runMas($selectRun.val())
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

  async showRunMenu(){
    try{
      var masIds = await runtimeInterface.getAvailableMas();
      masIds = masIds.map(x => x.id)
    } catch(error){
      dashboard.showError(error)
    }
    if(masIds.length == 0) {
      dashboard.showInfo("Please first define a runtime configuration")
      return
    }
    var $select = this.$runModal.find('select')
    $select.find('option').remove();
    for(const id of masIds){
      $select.append($('<option>', {
        value: id,
        text: id
      }));
    }
    this._runModal.show()
  }

  async _runMas(id){
    console.log("Running mas... "+id)
    try{
      await runtimeInterface.runMas(id);
    } catch(error){
      dashboard.showError(error)
    }
  }

  async showConfigMenu(){
    await this._configModalController.showMenu();
  }

  async showInspectMenu(){
    await this._inspectModalController.showMenu();
  }
}
