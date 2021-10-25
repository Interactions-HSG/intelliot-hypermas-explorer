class WorkspaceButtonsController {

  _workspace = undefined
  _fileTabController = undefined

  $saveButton = $('#save-code')
  $loadButton = $('#load-code')
  $runButton = $('#run-mas')

  constructor(workspace, fileTabController){
    this._workspace = workspace
    this._fileTabController = fileTabController
    this.$saveButton.click(e => this.saveCode())
    this.$loadButton.click(e => this.loadCode())
    this.$runButton.click(e => this.runMas())
  }

  async saveCode() {
    var code = JasonGenerator.generate(this._workspace)
    if(!code){
      dashboard.showError(`Code for agent ${id} is not well written`);
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

  async loadCode(){

  }

  async runMas(){

  }
}
