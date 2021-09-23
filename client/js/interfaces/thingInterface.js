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
    //var res = await this._thing.readProperty(property);
    return {error: 'NotImplemented'}
  }

  async invokeAction(action, propertyValues){
    console.log(propertyValues)
    var payload = this._composeInput(action, propertyValues);
    // var res = await this._thing.invokeAction(action, payload)
    return {error: 'NotImplemented'}
  }

  _composeInput(id, propertyValues){
    var actionObject = this._generateActionList(this._thing.actions).find(x => x.id == id)
    if(!actionObject || !actionObject.input){
      return undefined 
    }
    console.log(actionObject.input)
    
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