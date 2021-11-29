class SpockbotMock {

  baseURL = undefined

  constructor(protocol, hostname, port) {
    this.baseURL = `${protocol}://${hostname}:${port}`
  }

  getEnvironmentURI(environmentId){
    return `${this.baseURL}/environment/${environmentId}`
  }

  getWorkspaceURI(environmentId, workspaceId){
    return `${this.baseURL}/environments/${environmentId}/workspaces/${workspaceId}`
  }

  getArtifactURI(environmentId, workspaceId, artifactId){
    return `${this.baseURL}/environments/${environmentId}/workspaces/${workspaceId}/artifacts/${artifactId}`
  }

  async getWorkspacesInEnvironment(environmentId) {
    var id="uc-agriculture"
    var uri="mocked"
    return Promise.resolve([{id, uri}])
  }

  async getArtifactsInWorkspace(environmentId, workspaceId) {
    var id="spockbot"
    var uri="mocked"
    return  Promise.resolve([{id, uri}])
  }

  async getArtifactTD(environmentId, workspaceId, artifactId) {
    var res = TD
    return Promise.resolve(res);
  }
}

module.exports = (protocol, hostname, port) => new SpockbotMock(protocol, hostname, port)


const TD={
    "@context": "https://www.w3.org/2019/wot/td/v1",
    "title": "Smart tractor",
    "id": "urn:tractorbot_spock",
    "base": "http://10.2.2.100/",
    "securityDefinitions": {
      "nosec_sc": {
        "scheme": "nosec"
      }
    },
    "security": "nosec_sc",
    "properties": {
      "batteryVoltage": {
        "title": "batteryVoltage",
        "observable": false,
        "readOnly": true,
        "type": "number",
        "forms": [
          {
            "op": [
              "readproperty"
            ],
            "href": "/properties/batteryVoltage"
          }
        ]
      }
    },
    "actions": {
      "wheelControl": {
        "title": "wheelControl",
        "description": "Command the wheel motors",
        "input": {
            "type": "object",
            "properties":{
            "axis":{"type":"integer", "minimum":0, "maximum":2},
            "speed":{"type":"integer", "minimum":-7, "maximum":7},
            "duration":{"type":"integer", "minimum":0, "maximum":5000}
            },
            "required": ["axis", "speed", "duration"],
        },
        "forms": [
          {
            "op": [
              "invokeaction"
            ],
            "href": "/actions/wheelControl"
          }
        ]
      }
      },
    "events": {}
  }