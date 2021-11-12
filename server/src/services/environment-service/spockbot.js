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
    var res = spockBotTD
    return Promise.resolve(res);
  }
}

module.exports = (protocol, hostname, port) => new SpockbotMock(protocol, hostname, port)


const spockBotTD={
  "@context": [
      "https://www.w3.org/2019/wot/td/v1",
      {
          "eve": "http://w3id.org/eve#",
          "td": "https://www.w3.org/2019/wot/td#",
          "htv": "http://www.w3.org/2011/http#",
          "hctl": "https://www.w3.org/2019/wot/hypermedia#",
          "wotsec": "https://www.w3.org/2019/wot/security#",
          "dct": "http://purl.org/dc/terms/",
          "js": "https://www.w3.org/2019/wot/json-schema#",
          "saref": "https://w3id.org/saref#"
      }
  ],
  "title": "Smart tractor",
  "id": "spockbot",
  "@type": [
      "eve:Artifact",
      "http://semantics.interactions.ics.unisg.ch/hackathon21#Robot",
      "Thing"
  ],
  "securityDefinitions": {
      "nosec_sc": {
          "scheme": "nosec"
      }
  },
  "security": [
      "nosec_sc"
  ],
  "base": "http://10.10.10.103/",
  "properties": {
      "soilCondition": {
          "@type": [
              "http://semantics.interactions.ics.unisg.ch/hackathon21#SoilConditionValue",
              "https://www.w3.org/2019/wot/json-schema#ArraySchema",
              "https://www.w3.org/2019/wot/td#PropertyAffordance"
          ],
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/properties/soilcondition",
                  "contentType": "application/json",
                  "op": [
                      "readproperty"
                  ]
              }
          ],
          "observable": false,
          "type": "array"
      },
      "lowBattery": {
          "@type": [
              "https://www.w3.org/2019/wot/json-schema#NumberSchema",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#LowBattteryEvent",
              "https://www.w3.org/2019/wot/td#PropertyAffordance"
          ],
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/events/lowBattery",
                  "contentType": "application/json",
                  "op": [
                      "readproperty"
                  ],
                  "htv:methodName": "GET"
              }
          ],
          "observable": true,
          "type": "number"
      },
      "highTemperature": {
          "@type": [
              "https://www.w3.org/2019/wot/json-schema#NumberSchema",
              "https://www.w3.org/2019/wot/td#PropertyAffordance",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#HighTemperatureEvent"
          ],
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/events/highTemperature",
                  "contentType": "application/json",
                  "op": [
                      "readproperty"
                  ],
                  "htv:methodName": "GET"
              }
          ],
          "observable": true,
          "type": "number"
      },
      "batteryLevel": {
          "@type": [
              "https://www.w3.org/2019/wot/json-schema#ArraySchema",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#BatteryVoltage",
              "https://www.w3.org/2019/wot/td#PropertyAffordance"
          ],
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/properties/batteryvoltage",
                  "contentType": "application/json",
                  "op": [
                      "readproperty"
                  ]
              }
          ],
          "observable": false,
          "type": "array"
      },
      "lidar": {
          "@type": [
              "https://www.w3.org/2019/wot/json-schema#StringSchema",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#RadarData",
              "https://www.w3.org/2019/wot/td#PropertyAffordance"
          ],
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/properties/lidar",
                  "contentType": "application/json",
                  "op": [
                      "readproperty"
                  ]
              }
          ],
          "observable": false,
          "type": "string"
      }
  },
  "actions": {
      "wheel control": {
          "@type": [
              "ActionAffordance",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#MecannumWheelAction"
          ],
          "title": "Wheels",
          "forms": [
              {
                  "href": "http://10.10.10.103:8080/things/tractorbot/actions/wheelControl",
                  "contentType": "application/json",
                  "op": [
                      "invokeaction"
                  ],
                  "htv:methodName": "POST"
              }
          ],
          "input": {
              "@type": "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
              "type": "object",
              "properties": {
                  "duration": {
                      "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                      "type": "integer",
                      "maximum": 20000,
                      "minimum": 0
                  },
                  "axis": {
                      "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                      "type": "integer",
                      "maximum": 2,
                      "minimum": 0
                  },
                  "speed": {
                      "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                      "type": "integer",
                      "maximum": 7,
                      "minimum": -7
                  }
              }
          }
      },
      "set waypoint": {
          "@type": [
              "ActionAffordance",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#WaypointAction"
          ],
          "title": "Waypoints",
          "forms": [
              {
                  "href": "http://10.10.10.107:3000/move",
                  "contentType": "application/json",
                  "op": [
                      "invokeaction"
                  ],
                  "htv:methodName": "POST"
              }
          ],
          "input": {
              "@type": "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
              "type": "object",
              "properties": {
                  "dx": {
                      "@type": [
                          "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                          "http://semantics.interactions.ics.unisg.ch/hackathon21#RelativeXDirection"
                      ],
                      "type": "integer",
                      "maximum": 1000,
                      "minimum": 0
                  },
                  "dy": {
                      "@type": [
                          "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                          "http://semantics.interactions.ics.unisg.ch/hackathon21#RelativeYDirection"
                      ],
                      "type": "integer",
                      "maximum": 1000,
                      "minimum": 0
                  }
              }
          }
      }
  },
  "hasActionAffordance": [
      {
          "@type": [
              "http://semantics.interactions.ics.unisg.ch/hackathon21#MecannumWheelAction",
              "ActionAffordance"
          ],
          "hasInputSchema": {
              "@type": "js:ObjectSchema",
              "js:properties": [
                  [
                      {
                          "@type": "js:IntegerSchema",
                          "js:propertyName": "duration",
                          "js:minimum": "0",
                          "js:maximum": "20000",
                          "unit": "x y z-rot"
                      },
                      {
                          "@type": "js:IntegerSchema",
                          "js:maximum": "7",
                          "js:propertyName": "speed",
                          "js:minimum": "-7"
                      }
                  ],
                  {
                      "@type": "js:IntegerSchema",
                      "js:minimum": "0",
                      "js:maximum": "2",
                      "unit": "cm-per-sec",
                      "js:propertyName": "axis"
                  }
              ]
          },
          "dct:title": "Wheels",
          "name": "wheel control",
          "dct:description": "Control the mecannum wheels",
          "hasForm": {
              "hctl:hasOperationType": "invokeAction",
              "htv:methodName": "POST",
              "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/actions/wheelControl",
              "hctl:forContentType": "application/json"
          }
      },
      {
          "@type": [
              "ActionAffordance",
              "http://semantics.interactions.ics.unisg.ch/hackathon21#WaypointAction"
          ],
          "hasInputSchema": {
              "@type": "js:ObjectSchema",
              "js:properties": [
                  {
                      "@type": [
                          "http://semantics.interactions.ics.unisg.ch/hackathon21#RelativeXDirection",
                          "js:IntegerSchema"
                      ],
                      "js:propertyName": "dx",
                      "js:minimum": "0",
                      "js:maximum": "1000",
                      "unit": "s"
                  },
                  {
                      "@type": [
                          "js:IntegerSchema",
                          "http://semantics.interactions.ics.unisg.ch/hackathon21#RelativeYDirection"
                      ],
                      "js:propertyName": "dy",
                      "js:minimum": "0",
                      "js:maximum": "1000",
                      "unit": "s"
                  }
              ]
          },
          "dct:title": "Waypoints",
          "name": "set waypoint",
          "dct:description": "Set the next waypoint for the robot",
          "hasForm": {
              "htv:methodName": "POST",
              "hctl:hasTarget": "http://10.10.10.107:3000/move",
              "hctl:forContentType": "application/json",
              "hctl:hasOperationType": "invokeAction"
          }
      }
  ],
  "hasPropertyAffordance": [
      [
          [
              [
                  {
                      "@type": [
                          [
                              "PropertyAffordance",
                              "http://semantics.interactions.ics.unisg.ch/hackathon21#LowBattteryEvent"
                          ],
                          "js:NumberSchema"
                      ],
                      "isObservable": "true",
                      "name": "lowBattery",
                      "unit": "http://www.ontology-of-units-of-measure.org/resource/om-2/volts",
                      "dct:description": "Battery level low",
                      "hasForm": {
                          "hctl:hasOperationType": "readProperty",
                          "htv:methodName": "GET",
                          "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/events/lowBattery",
                          "hctl:forContentType": "application/json"
                      }
                  },
                  {
                      "@type": [
                          [
                              "PropertyAffordance",
                              "http://semantics.interactions.ics.unisg.ch/hackathon21#HighTemperatureEvent"
                          ],
                          "js:NumberSchema"
                      ],
                      "name": "highTemperature",
                      "unit": "http://www.ontology-of-units-of-measure.org/resource/om-2/degree_Celsius",
                      "isObservable": "true",
                      "dct:description": "Engine temperature high",
                      "hasForm": {
                          "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/events/highTemperature",
                          "hctl:forContentType": "application/json",
                          "hctl:hasOperationType": "readProperty",
                          "htv:methodName": "GET"
                      }
                  }
              ],
              {
                  "@type": [
                      [
                          "PropertyAffordance",
                          "http://semantics.interactions.ics.unisg.ch/hackathon21#BatteryVoltage"
                      ],
                      "js:ArraySchema"
                  ],
                  "name": "batteryLevel",
                  "isObservable": "false",
                  "unit": "http://www.ontology-of-units-of-measure.org/resource/om-2/volts",
                  "dct:description": "Main batterypack voltage",
                  "hasForm": {
                      "hctl:forContentType": "application/json",
                      "hctl:hasOperationType": "readProperty",
                      "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/properties/batteryvoltage"
                  }
              }
          ],
          {
              "@type": [
                  [
                      "PropertyAffordance",
                      "http://semantics.interactions.ics.unisg.ch/hackathon21#RadarData"
                  ],
                  "js:StringSchema"
              ],
              "isObservable": "false",
              "name": "lidar",
              "dct:description": "Raw data from LiDAR sensor",
              "hasForm": {
                  "hctl:forContentType": "application/json",
                  "hctl:hasOperationType": "readProperty",
                  "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/properties/lidar"
              }
          }
      ],
      {
          "@type": [
              [
                  "PropertyAffordance",
                  "http://semantics.interactions.ics.unisg.ch/hackathon21#SoilConditionValue"
              ],
              "js:ArraySchema"
          ],
          "isObservable": "false",
          "name": "soilCondition",
          "dct:description": "Raw data from soil sensor",
          "hasForm": {
              "hctl:forContentType": "application/json",
              "hctl:hasOperationType": "readProperty",
              "hctl:hasTarget": "http://10.10.10.103:8080/things/tractorbot/properties/soilcondition"
          }
      }
  ],
  "dct:title": "Smart tractor",
  "hasSecurityConfiguration": {
      "@type": "wotsec:NoSecurityScheme"
  },
  "hasBase": "http://10.10.10.103/"
}