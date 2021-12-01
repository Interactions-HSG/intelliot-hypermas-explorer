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
  "base": "http://10.2.2.157/",
  "securityDefinitions": {
    "nosec_sc": {
      "scheme": "nosec"
    }
  },
  "security": "nosec_sc",
  "properties": {
    "batteryVoltage": {
      "title": "Battery voltage",
      "observable": false,
      "readOnly": true,
      "type": "number",
      "forms": [
        {
          "op": [
            "readproperty"
          ],
          "href": "/properties/batteryvoltage"
        }
      ]
    },
    "soilCondition": {
      "title": "Battery voltage",
      "observable": false,
      "readOnly": true,
      "type": "object",
	  "properties":{
		"ph":{"type":"integer", "minimum":0, "maximum":255},
		"moisture":{"type":"integer", "minimum":0, "maximum":255},
		"density":{"type":"integer", "minimum":0, "maximum":255},
		"nitrate":{"type":"integer", "minimum":0, "maximum":255},
	  },	 
      "forms": [
        {
          "op": [
            "readproperty"
          ],
          "href": "/properties/soilcondition"
        }
      ]
    },	
    "waterLevel": {
      "title": "Water level",
      "observable": false,
      "readOnly": true,
      "type": "number",
      "forms": [
        {
          "op": [
            "readproperty"
          ],
          "href": "/properties/waterlevel"
        }
      ]
    }	
  },
  "actions": {
    "wheelControl": {
      "title": "wheelControl",
	  "input":{
		  "type": "object",
		  "properties":{
			"axis":{"type":"integer", "minimum":0, "maximum":2},
			"speed":{"type":"integer", "minimum":-7, "maximum":7},
			"duration":{"type":"integer", "minimum":0, "maximum":5000}
		  }
	  },
	  "required": ["axis", "speed", "duration"],
      "forms": [
        {
          "op": [
            "invokeaction"
          ],
          "href": "/actions/wheelcontrol"
        }
      ]
    },
    "irrigate": {
      "title": "Irrigate",
	  "input":{
		  "type": "object",
		  "properties":{
			"duration":{"type":"integer", "minimum":0, "maximum":5}
		  }
	  },
	  "required": ["duration"],
      "forms": [
        {
          "op": [
            "invokeaction"
          ],
          "href": "/actions/irrigate"
        }
      ]
    },
    "refillWater": {
      "title": "Refill water",
      "forms": [
        {
          "op": [
            "invokeaction"
          ],
          "href": "/actions/refillwater"
        }
      ]
    }	
	},
  "events": {}
}