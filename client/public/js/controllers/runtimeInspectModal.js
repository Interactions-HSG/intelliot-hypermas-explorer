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
    
    //add stop handler
    var controller = this;
    this.$modal.find('.modal-body').find('button').filter(function() {
      return this.id.includes('stop-runtime');
    }).click( e => {
      var index = $(e.target)[0].id.slice(-1)
      controller._stopRuntime(index)
      e.stopPropagation();
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
}
