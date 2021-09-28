class ThingInterface {

  td = "";
  properties = []
  actions = []
  events = []

  _servient = undefined
  _thing = undefined

  constructor(thingDescription) {
    this.td = thingDescription;
    this._servient = new Wot.Core.Servient();
    this._servient.addClientFactory(new Wot.Http.HttpClientFactory());
    this._servient.addClientFactory(new Wot.Http.HttpsClientFactory());
  }

  async loadThing(){
    var factory = await this._servient.start();
    this._thing = await factory.consume(this.td)
    this.properties = this._generatePropertyList(this._thing.properties)
    this.actions = this._generateActionList(this._thing.actions)
    this.events = this._generateEventList(this._thing.events)
  }


  async readProperty(property){
    var res;
    try {
      var res = await this._thing.readProperty(property);
    } catch (error) {
      res = {error: error.message}
    }
    return res;
  }

  async invokeAction(action, payload){
    var res
    try {
    var res = await this._thing.invokeAction(action, payload)
    } catch (error) {
      res = {error: error.message}
    }
    return res;
  }

  _generatePropertyList(properties){
    if(!properties) {
      return []
    }
    return Object.keys(properties).map(id => { 
      return {
        id,
        description: properties[id].description,
      }
    })
  }

  _generateActionList(actions){
    if(!actions) {
      return []
    }
    return Object.keys(actions).map(id => {
      var input = actions[id].input
      return {
        id,
        input,
        description: actions[id].description,
      }
    })
  }

  _generateEventList(properties){
    if(!properties) {
      return []
    }
    //TODO implement
    return []
  }

}