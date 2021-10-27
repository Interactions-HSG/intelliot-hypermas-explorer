class RunModalController {

  _workspace = undefined
  _masArray = []
  _agentsIdArray = []

  $modal = $('#mas-config-modal')
  _modal = new bootstrap.Modal(document.getElementById('mas-config-modal'))

  $addAgentButton = $('#button-add-agent')
  $removeAgentButton = $('#button-remove-agent')
  $saveMasButton = $('#button-save-mas')
  $runMasButton = $('#button-run-mas')

  $masSelect = $('#mas-template-select')

  constructor(workspace){
    this._workspace = workspace
    this._agentsIdArray = []
    this._masArray = []

    this.$runMasButton.click(e => this.runMas())
    this.$saveMasButton.click(e => this.saveMas())

    var controller = this;
    this.$masSelect.change(function(){
      controller._onMasSelect($(this).val());
    })

    this.$addAgentButton.click(e => this._addEmptyAgentRow())
    this.$removeAgentButton.click(e => this._removeAgentRow())

    this.$modal.find('.btn-confirm').click(e => {
      this._modal.hide()
    })
  }

  async showMenu() {
    try{
      //load all agents type
      this._agentsIdArray = await runtimeInterface.getAvailableAgents()
      this._agentsIdArray = this._agentsIdArray.map(x => x.id)
    } catch(error){
      dashboard.showError("Unable to retrieve saved agents ")
    }
    if(this._agentsIdArray.length == 0){
      dashboard.showError("Please save some agents before attempting to run")
      return
    }
    try{
      //load all mas
      this._masArray = await runtimeInterface.getAvailableMas()
    } catch(error){
      dashboard.showError("Unable to retrieve saved runtime configurations")
    }
    //fill mas select
    this.$masSelect.find('option').remove()
    this.$masSelect.append(new Option("------", "none"));
    for(const mas of this._masArray){
      this.$masSelect.append(new Option(mas.id, mas.id))
    }

    this._updateAgentSelect()
    //show modal
    this._modal.show()
  }

  async saveMas(){

  }

  async runMas(){
    this._modal.show()
  }

  _updateAgentSelect(){
    var controller = this;
    this.$modal.find('.agent-row').find('select').each(function(index){
      controller._loadAgentOptions(this)
    })
  }

  _loadAgentOptions(select){
    $(select).find('option').remove()
    for(const a of this._agentsIdArray){
      $(select).append(new Option(a, a))
    }
  }

  _onMasSelect(masId){
    //clone an empty base row
    this.$modal.find('.agent-row:not(:first)').remove();
    var firstRow = this._createRow();
    this.$modal.find('.agent-row').first().remove();
    //find the selected mas
    var mas = this._masArray.find(x => x.id == masId)
    if(!mas) {
      //if none return
      return
    }
    //populate the agent fields
    for(const a of mas.agents){
      var row = this._createRow()
      var select = $(row).find('select')
      this._loadAgentOptions(select);
      $(row).find('input').val(a.name);
      $(select).val(a.type);
      console.log(a)
    }
    //remove first template row
    firstRow.remove();
  }

  _addEmptyAgentRow(){
    this._createRow()
    this._updateAgentSelect();
  }

  _createRow(){
    var newRow = this.$modal.find('.agent-row').first().clone()
    $(newRow).find('input').val(undefined)
    $(newRow).find('select').val(undefined)
    this.$modal.find('.button-row').before(newRow);
    return newRow
  }

  _removeAgentRow(){
    var count = this.$modal.find('.agent-row').length
    if(count > 1){
      this.$modal.find('.agent-row').last().remove()
    }
  }
}
