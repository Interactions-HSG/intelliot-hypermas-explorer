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
      dashboard.showError("Impossibile recuperare gli agenti salvati")
    }
    if(this._agentTypes.length == 0){
      dashboard.showError("Prima di provare ad eseguire salva degli agenti")
      return
    }
    try{
      //load all mas
      this._masArray = await runtimeInterface.getAvailableMas()
    } catch(error){
      dashboard.showError("Impossibile recuperare le configurazioni di esecuzione salvate")
    }

    this._setDom(undefined);
    //show modal
    this._modal.show()
  }

  async saveMas(){
    //parse the fields to generate mas object
    var id = $('#mas-name').val()
    if(!id){
      dashboard.showError(`Il runtime non ha nome!`)
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
        dashboard.showError("Impossible creare un agente senza nome")
        return
      }
      if(a.type == undefined){
        dashboard.showError(`L'agente ${a.name} non ha un tipo`)
        return
      }
    }
    //if overwrite template
    try{
      if(this._masArray.some(x => x.id == id)){
        var confirm = await dashboard.waitConfirm(`Sei sicuro? Questo sovrascriverà il runtime ${id}`)
        if(!confirm){
          return
        }
        await runtimeInterface.updateMasDefinition(id, agents)
      } else {
        //save mas
        await runtimeInterface.saveMasDefinition(id, agents)
      }
      dashboard.showSuccess(`Runtime ${id} salvato`)
    } catch (error){
      dashboard.showError(`Impossibile recuperare il runtime ${id}`)
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

    this.$modal.find('.agent-row').each(function(index){
      $(this).find('input').keyup(function(){
        let value = $(this).val()
        $(this).val(utils.uncapitalize(value))
      })
    })

    $('#button-add-agent').click(e => this._addAgentRow(selectedMas))
    $('#button-remove-agent').click(e => this._removeAgentRow(selectedMas))

  }

  _onMasSelect(masId){
    if(masId){
      this._agents = this._masArray.find(x => x.id == masId).agents
    } else {
      this._agents = [{}]
    }
    this._setDom(masId)

  }

  _addAgentRow(masId){
    var agents = []
    this.$modal.find('.agent-row').each(function(index){
      var name = $(this).find('input').val()
      var type = $(this).find('select').val()
      agents.push({name, type})
    })
    this._agents = agents;
    this._agents.push({})
    this._setDom(masId)
  }

  _removeAgentRow(masId){
    var agents = []
    this.$modal.find('.agent-row').each(function(index){
      var name = $(this).find('input').val()
      var type = $(this).find('select').val()
      agents.push({name, type})
    })
    this._agents = agents;
    this._agents.pop()
    this._setDom(masId)
  }
}
