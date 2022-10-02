class RuntimeConfigModal {

  _workspace = undefined
  _masArray = []
  _agentTypes = []
  _agents = []

  $modal = $('#mas-config-modal')
  _modal = new bootstrap.Modal(document.getElementById('mas-config-modal'))

  $saveMasButton = $('#button-save-mas')

  $masSelect = $('#mas-template-select')

  constructor(workspace){
    this._workspace = workspace
    this._agentTypes = []
    this._masArray = []
    this._agents = [{}]

    this.$saveMasButton.click(e => this.saveMas())
    this.$modal.on('hidden.bs.modal', e => this._reset())
  }

  _reset(){
    this._agentTypes = []
    this._masArray = []
    this._agents = [{}]
    $("#mas-name").val(undefined)
    this._setDom(undefined)
  }

  async showMenu() {
    try{
      //load all agents type
      this._agentTypes = await runtimeInterface.getAvailableAgents()
      this._agentTypes = this._agentTypes.map(x => x.id)
    } catch(error){
      dashboard.showError("Unable to retrieve saved agents ")
    }
    if(this._agentTypes.length == 0){
      dashboard.showError("Please save some agents before attempting to run")
      return
    }
    try{
      //load all mas
      this._masArray = await runtimeInterface.getAvailableMas()
    } catch(error){
      dashboard.showError("Unable to retrieve saved runtime configurations")
    }

    this._setDom(undefined);
    //show modal
    this._modal.show()
  }

  async saveMas(){
    //parse the fields to generate mas object
    var id = $('#mas-name').val()
    if(!id){
      dashboard.showError(`Runtime has no id`)
      return
    }
    var agents = []
    this.$modal.find('.agent-row').each(function(index){
      var name = $(this).find('input').val()
      var type = $(this).find('select').val()
      agents.push({name, type})
    })
    //validate
    for(const a of agents){
      if(a.name == ""){
        dashboard.showError("Attempting to create agents with no name")
        return
      }
      if(a.type == undefined){
        dashboard.showError(`Agent ${a.name} has no type`)
        return
      }
    }
    //if overwrite template
    try{
      if(this._masArray.some(x => x.id == id)){
        var confirm = await dashboard.waitConfirm(`Are you sure? This will overwrite runtime ${id}`)
        if(!confirm){
          return
        }
        await runtimeInterface.updateMasDefinition(id, agents)
      } else {
        //save mas
        await runtimeInterface.saveMasDefinition(id, agents)
      }
      dashboard.showSuccess(`Runtime ${id} saved`)
    } catch (error){
      dashboard.showError(`Unable to save runtime ${id}`)
    }
    this._modal.hide()
  }

  _setDom(selectedMas){
    var masName = $('#mas-name').val()
    this.$modal.find('.modal-body').empty();
    var $body = Handlebars.templates.runtimeConfigModalBody({
      masArray: this._masArray.map(x => x.id),
      selectedMas,
      masName,
      agentTypes: this._agentTypes,
      agents: this._agents
    });
    this.$modal.find('.modal-body').append($body);
    //attach handlers
    var controller = this;
    $('#mas-template-select').change(function(){
      controller._onMasSelect($(this).val());
    })

    $('#button-add-agent').click(e => this._addAgentRow())
    $('#button-remove-agent').click(e => this._removeAgentRow())

  }

  _onMasSelect(masId){
    if(masId){
      this._agents = this._masArray.find(x => x.id == masId).agents
    } else {
      this._agents = [{}]
    }
    this._setDom(masId)

  }

  _addAgentRow(){
    var agents = []
    this.$modal.find('.agent-row').each(function(index){
      var name = $(this).find('input').val()
      var type = $(this).find('select').val()
      agents.push({name, type})
    })
    this._agents = agents;
    this._agents.push({})
    var masId = this.$masSelect.find('select').val()
    this._setDom(masId)
  }

  _removeAgentRow(){
    var agents = []
    this.$modal.find('.agent-row').each(function(index){
      var name = $(this).find('input').val()
      var type = $(this).find('select').val()
      agents.push({name, type})
    })
    this._agents = agents;
    this._agents.pop()
    var masId = this.$masSelect.find('select').val()
    this._setDom(masId)
  }
}
