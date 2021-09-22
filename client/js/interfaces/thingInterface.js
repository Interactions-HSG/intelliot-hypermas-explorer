class ThingInterface {

  td = "";
  servient = undefined
  thing = undefined

  constructor(thingDescription) {
    this.td = thingDescription;
    this.servient = new Wot.Core.Servient();
    this.servient.addClientFactory(new Wot.Http.HttpClientFactory());
    this.servient.addClientFactory(new Wot.Http.HttpsClientFactory());
  }

  async loadThing(){
    var factory = await this.servient.start();
    this.thing = await factory.consume(this.td)
    console.log(this.thing)
  }


  async readProperty(property){
    return await this.thing.readProperty(property);
  }

  async invokeAction(action){
    return await this.thing.invokeAction(action)
  }

}