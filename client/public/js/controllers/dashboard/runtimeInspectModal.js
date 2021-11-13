class RuntimeInspectModal {
  _runtimeArray = []
  _agentsIdArray = []

  $modal = $('#runtime-inspect-modal')
  _modal = new bootstrap.Modal(document.getElementById('runtime-inspect-modal'))

  constructor(){
    this._agentsIdArray = []
    this._runtimeArray = []

    this.$modal.find('.btn-confirm').click(e => {
      this._modal.hide()
    })

    this.$modal.on('hidden.bs.modal', e => this._reset())
  }

  _reset(){
    this._agentsIdArray = []
    this._runtimeArray = []
    //reset graphics
  }

  async _loadMenuData(){
    try{
      //load all agents type
      this._agentsIdArray = await runtimeInterface.getAvailableAgents()
      this._agentsIdArray = this._agentsIdArray.map(x => x.id)
    } catch(error){
      dashboard.showError("Unable to retrieve saved agents ")
    }
    if(this._agentsIdArray.length == 0){
      dashboard.showError("There are no saved agents")
    }
    try{
      //load all runtimes
      this._runtimeArray = await runtimeInterface.getRuntimes();
    } catch(error){
      dashboard.showError("Unable to retrieve runtimes")
    }
    if(this._runtimeArray.length == 0){
      throw "stop"
    }

    for(const r of this._runtimeArray){
      var agents = []
      try{
        agents = await runtimeInterface.getRuntimeAgents(r.id)
      } catch (error){
        console.log(error)
      }
      r.agents = agents
    }

    var $body = Handlebars.templates.runtimeInspectModalBody({
      runtimeArray: this._runtimeArray,
      agentTypes: this._agentsIdArray,
    });

    this.$modal.find('.modal-body').empty();
    this.$modal.find('.modal-body').append($body);
    
    var controller = this;
    //add stop handler
    this.$modal.find('.modal-body').find('button').filter(function() {
      return this.id.includes('stop-runtime');
    }).click( e => {
      var index = $(e.target)[0].id.slice(-1)
      controller._stopRuntime(index)
      e.stopPropagation();
    })

    
    //add add handler
    this.$modal.find('.modal-body').find(".row")
      .filter(function() {
        return this.id.includes('add-runtime-agent');
      })
      .each(function(index) {
        var parent = $(this)
        $(this).find('button').click( e => {
          var name = $(parent).find('input').val()
          var type = $(parent).find('select').val()
          controller._addRuntimeAgent(index, name, type)
          e.stopPropagation();
        })
      })

    //add remove handler
    this.$modal.find('.modal-body').find("div.row")
      .filter(function() {
        return this.id.includes('remove-runtime-agent');
      })
      .each(function(index) {
        var parent = $(this)
        $(this).find('button').click( e => {
          var name = $(parent).find('select').val()
          controller._removeRuntimeAgent(index, name)
          e.stopPropagation();
        })
      })
      
  }

  async showMenu() {
    try{
      await this._loadMenuData()
    } catch (error){
      dashboard.showError("No runtimes are running at the moment")
      return;
    }
    //show modal
    this._modal.show()
  }

  async _stopRuntime(index){
    console.log("Stopping "+this._runtimeArray[index].id)
    try {
      await runtimeInterface.stopRuntime(this._runtimeArray[index].id)
      try{
        await this._loadMenuData();
      } catch(e){
        this._modal.hide()
      }

    } catch(error){
      dashboard.showError("Unable to stop runtime "+this._runtimeArray[index].id)
    }
  }

  async _addRuntimeAgent(index, name, type){
    console.log(`add agent ${name} of type ${type} in runtime ${index}`)
    try {
      await runtimeInterface.addRuntimeAgent(this._runtimeArray[index].id, name, type)
      try{
        await this._loadMenuData();
      } catch(e){
        this._modal.hide()
      }

    } catch(error){
      dashboard.showError("Unable to add agent to "+this._runtimeArray[index].id)
    }
  }

  async _removeRuntimeAgent(index, name){
    console.log(`remove agent ${name} in runtime ${index}`)
    try {
      await runtimeInterface.deleteRuntimeAgent(this._runtimeArray[index].id, name)
      try{
        await this._loadMenuData();
      } catch(e){
        this._modal.hide()
      }

    } catch(error){
      dashboard.showError("Unable to remove agent from "+this._runtimeArray[index].id)
    }
  }
}
