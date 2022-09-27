class ThingInterface {

  td = "";
  key = undefined;
  properties = []
  actions = []
  events = []

  _servient = undefined
  _thing = undefined

  constructor(thingDescription, key) {
    this.td = thingDescription;
    this.key = key;
    this._servient = new Wot.Core.Servient();
    this._servient.addClientFactory(new Wot.Http.HttpClientFactory());
    this._servient.addClientFactory(new Wot.Http.HttpsClientFactory());
  }

  //This method was painful to write never change it cause node-wot
  getCredentialDefinition(td, key){
    switch(td.securityDefinitions[td.security].scheme){
      case 'apikey': return {apiKey: key}
      case 'basic': 
      var username = key.split(':')[0]
      var password = key.split(':')[1]
      return{ username, password }
      default :return undefined;
    }
  }

  async loadThing(){
    if(this.td.id && this.key){
      var credentials = {
        [this.td.id]: this.getCredentialDefinition(this.td, this.key)
      }
      this._servient.addCredentials(credentials)
      this._servient.getCredentials(this.td.id)
    }
    var factory = await this._servient.start();
    this._thing = await factory.consume(this.td)
    this.properties = this._generatePropertyList(this._thing.properties)
    this.actions = this._generateActionList(this._thing.actions)
    this.events = this._generateEventList(this._thing.events)
  }


  async readProperty(property){
    var res
    try {
      res = await this._thing.readProperty(property)
      res = await res.value();
    } catch (error) {
      console.log(error)
      res = {error: error.message}
    }
    return res
  }

  async invokeAction(action, payload){
    var res
    try {
      res = await this._thing.invokeAction(action, payload)
      res = await res.value();
    } catch (error) {
      console.log(error)
      res = {error: error.message}
    }
    return res
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