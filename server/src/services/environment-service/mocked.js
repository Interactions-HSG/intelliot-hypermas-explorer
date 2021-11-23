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
    var id="uc-industry"
    var uri="mocked"
    return Promise.resolve([{id, uri}])
  }

  async getArtifactsInWorkspace(environmentId, workspaceId) {
    var id="leubot1"
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
    "title": "leubot1",
    "id": "http://localhost:8080/environments/intelliot/workspaces/uc-industry/artifacts/leubot1",
    "@type": [
        "eve:Artifact",
        "Thing",
        "https://ci.mines-stetienne.fr/kg/ontology#PhantomX"
    ],
    "securityDefinitions": {
        "apikey": {
            "scheme": "apikey",
	    "in": "header",
	    "name": "X-API-KEY"
        }
    },
    "security": [
        "apikey"
    ],
    "properties": {
        "Get Posture": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#Posture",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/posture",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "Gripper": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#GripperJointValue"
                    ],
                    "type": "integer"
                },
                "WristAngle": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#WristAngleJointValue"
                    ],
                    "type": "integer"
                },
                "Shoulder": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#ShoulderJointValue"
                    ],
                    "type": "integer"
                },
                "Elbow": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#ElbowJointValue"
                    ],
                    "type": "integer"
                },
                "WristRotation": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#WristRotationJointValue"
                    ],
                    "type": "integer"
                },
                "Base": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#BaseJointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Base": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#Base",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/base",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Gripper": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#Gripper",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/gripper",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Elbow": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#Elbow",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/elbow",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Wrist Angle": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#WristAngle",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/angle",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Shoulder": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#Shoulder",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/shoulder",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        },
        "Get Wrist Rotation": {
            "@type": [
                "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                "https://ci.mines-stetienne.fr/kg/ontology#WristRotation",
                "https://www.w3.org/2019/wot/td#PropertyAffordance"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/rotation",
                    "contentType": "application/json",
                    "op": [
                        "readproperty",
                        "writeproperty"
                    ]
                }
            ],
            "observable": false,
            "type": "object",
            "properties": {
                "name": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#StringSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                    ],
                    "type": "string"
                },
                "value": {
                    "@type": [
                        "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                    ],
                    "type": "integer"
                }
            }
        }
    },
    "actions": {
        "Set Shoulder": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetShoulder"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/shoulder",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                    "https://ci.mines-stetienne.fr/kg/ontology#ShoulderJoint"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 810,
                        "minimum": 205
                    }
                },
                "required": [
                    "value"
                ]
            }
        },
        "Set Wrist Rotation": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetWristRotation"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/rotation",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                    "https://ci.mines-stetienne.fr/kg/ontology#WristRotateJoint"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 1023,
                        "minimum": 0
                    }
                },
                "required": [
                    "value"
                ]
            }
        },
        "Set Wrist Angle": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetWristAngle"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/angle",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                    "https://ci.mines-stetienne.fr/kg/ontology#WristAngleJoint"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 830,
                        "minimum": 200
                    }
                },
                "required": [
                    "value"
                ]
            }
        },
        "Reset": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#Reset"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/reset",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ]
        },
        "Set Gripper": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetGripper"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/gripper",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://ci.mines-stetienne.fr/kg/ontology#GripperJoint",
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 512,
                        "minimum": 0
                    }
                },
                "required": [
                    "value"
                ]
            }
        },
        "Set Elbow": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetElbow"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/elbow",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                    "https://ci.mines-stetienne.fr/kg/ontology#ElbowJoint"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 900,
                        "minimum": 210
                    }
                },
                "required": [
                    "value"
                ]
            }
        },
        "Set Base": {
            "@type": [
                "ActionAffordance",
                "https://ci.mines-stetienne.fr/kg/ontology#SetBase"
            ],
            "forms": [
                {
                    "href": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/base",
                    "contentType": "application/json",
                    "op": [
                        "invokeaction"
                    ],
                    "htv:methodName": "PUT"
                }
            ],
            "input": {
                "@type": [
                    "https://www.w3.org/2019/wot/json-schema#ObjectSchema",
                    "https://ci.mines-stetienne.fr/kg/ontology#BaseJoint"
                ],
                "type": "object",
                "properties": {
                    "value": {
                        "@type": "https://www.w3.org/2019/wot/json-schema#IntegerSchema",
                        "type": "integer",
                        "maximum": 1023,
                        "minimum": 512
                    }
                },
                "required": [
                    "value"
                ]
            }
        }
    },
    "hasActionAffordance": [
        [
            [
                [
                    [
                        [
                            {
                                "@type": [
                                    "https://ci.mines-stetienne.fr/kg/ontology#SetElbow",
                                    "ActionAffordance"
                                ],
                                "name": "Set Elbow",
                                "hasInputSchema": {
                                    "@type": [
                                        "https://ci.mines-stetienne.fr/kg/ontology#ElbowJoint",
                                        "js:ObjectSchema"
                                    ],
                                    "js:properties": {
                                        "@type": "js:IntegerSchema",
                                        "js:maximum": "900",
                                        "js:minimum": "210",
                                        "js:propertyName": "value"
                                    },
                                    "js:required": "value"
                                },
                                "hasForm": {
                                    "hctl:hasOperationType": "invokeAction",
                                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/elbow",
                                    "htv:methodName": "PUT",
                                    "hctl:forContentType": "application/json"
                                }
                            },
                            {
                                "@type": [
                                    "https://ci.mines-stetienne.fr/kg/ontology#SetShoulder",
                                    "ActionAffordance"
                                ],
                                "name": "Set Shoulder",
                                "hasForm": {
                                    "htv:methodName": "PUT",
                                    "hctl:forContentType": "application/json",
                                    "hctl:hasOperationType": "invokeAction",
                                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/shoulder"
                                },
                                "hasInputSchema": {
                                    "@type": [
                                        "https://ci.mines-stetienne.fr/kg/ontology#ShoulderJoint",
                                        "js:ObjectSchema"
                                    ],
                                    "js:properties": {
                                        "@type": "js:IntegerSchema",
                                        "js:maximum": "810",
                                        "js:minimum": "205",
                                        "js:propertyName": "value"
                                    },
                                    "js:required": "value"
                                }
                            }
                        ],
                        {
                            "@type": [
                                "https://ci.mines-stetienne.fr/kg/ontology#Reset",
                                "ActionAffordance"
                            ],
                            "name": "Reset",
                            "hasForm": {
                                "htv:methodName": "PUT",
                                "hctl:forContentType": "application/json",
                                "hctl:hasOperationType": "invokeAction",
                                "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/reset"
                            }
                        }
                    ],
                    {
                        "@type": [
                            "https://ci.mines-stetienne.fr/kg/ontology#SetWristAngle",
                            "ActionAffordance"
                        ],
                        "hasForm": {
                            "htv:methodName": "PUT",
                            "hctl:forContentType": "application/json",
                            "hctl:hasOperationType": "invokeAction",
                            "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/angle"
                        },
                        "hasInputSchema": {
                            "@type": [
                                "https://ci.mines-stetienne.fr/kg/ontology#WristAngleJoint",
                                "js:ObjectSchema"
                            ],
                            "js:properties": {
                                "@type": "js:IntegerSchema",
                                "js:maximum": "830",
                                "js:minimum": "200",
                                "js:propertyName": "value"
                            },
                            "js:required": "value"
                        },
                        "name": "Set Wrist Angle"
                    }
                ],
                {
                    "@type": [
                        "ActionAffordance",
                        "https://ci.mines-stetienne.fr/kg/ontology#SetWristRotation"
                    ],
                    "name": "Set Wrist Rotation",
                    "hasForm": {
                        "htv:methodName": "PUT",
                        "hctl:forContentType": "application/json",
                        "hctl:hasOperationType": "invokeAction",
                        "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/rotation"
                    },
                    "hasInputSchema": {
                        "@type": [
                            "https://ci.mines-stetienne.fr/kg/ontology#WristRotateJoint",
                            "js:ObjectSchema"
                        ],
                        "js:required": "value",
                        "js:properties": {
                            "@type": "js:IntegerSchema",
                            "js:maximum": "1023",
                            "js:minimum": "0",
                            "js:propertyName": "value"
                        }
                    }
                }
            ],
            {
                "@type": [
                    "https://ci.mines-stetienne.fr/kg/ontology#SetGripper",
                    "ActionAffordance"
                ],
                "hasInputSchema": {
                    "@type": [
                        "https://ci.mines-stetienne.fr/kg/ontology#GripperJoint",
                        "js:ObjectSchema"
                    ],
                    "js:properties": {
                        "@type": "js:IntegerSchema",
                        "js:maximum": "512",
                        "js:minimum": "0",
                        "js:propertyName": "value"
                    },
                    "js:required": "value"
                },
                "name": "Set Gripper",
                "hasForm": {
                    "htv:methodName": "PUT",
                    "hctl:forContentType": "application/json",
                    "hctl:hasOperationType": "invokeAction",
                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/gripper"
                }
            }
        ],
        {
            "@type": [
                "https://ci.mines-stetienne.fr/kg/ontology#SetBase",
                "ActionAffordance"
            ],
            "hasInputSchema": {
                "@type": [
                    "https://ci.mines-stetienne.fr/kg/ontology#BaseJoint",
                    "js:ObjectSchema"
                ],
                "js:properties": {
                    "@type": "js:IntegerSchema",
                    "js:maximum": "1023",
                    "js:minimum": "512",
                    "js:propertyName": "value"
                },
                "js:required": "value"
            },
            "name": "Set Base",
            "hasForm": {
                "hctl:hasOperationType": "invokeAction",
                "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/base",
                "htv:methodName": "PUT",
                "hctl:forContentType": "application/json"
            }
        }
    ],
    "hasPropertyAffordance": [
        [
            [
                [
                    [
                        [
                            {
                                "@type": [
                                    [
                                        "PropertyAffordance",
                                        "js:ObjectSchema"
                                    ],
                                    "https://ci.mines-stetienne.fr/kg/ontology#Gripper"
                                ],
                                "name": "Get Gripper",
                                "js:properties": [
                                    {
                                        "@type": [
                                            "js:StringSchema",
                                            "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                                        ],
                                        "js:propertyName": "name"
                                    },
                                    {
                                        "@type": [
                                            "js:IntegerSchema",
                                            "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                                        ],
                                        "js:propertyName": "value"
                                    }
                                ],
                                "hasForm": {
                                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/gripper"
                                }
                            },
                            {
                                "@type": [
                                    [
                                        "PropertyAffordance",
                                        "js:ObjectSchema"
                                    ],
                                    "https://ci.mines-stetienne.fr/kg/ontology#WristAngle"
                                ],
                                "name": "Get Wrist Angle",
                                "js:properties": [
                                    {
                                        "@type": [
                                            "js:StringSchema",
                                            "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                                        ],
                                        "js:propertyName": "name"
                                    },
                                    {
                                        "@type": [
                                            "js:IntegerSchema",
                                            "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                                        ],
                                        "js:propertyName": "value"
                                    }
                                ],
                                "hasForm": {
                                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/angle"
                                }
                            }
                        ],
                        {
                            "@type": [
                                [
                                    "PropertyAffordance",
                                    "js:ObjectSchema"
                                ],
                                "https://ci.mines-stetienne.fr/kg/ontology#WristRotation"
                            ],
                            "js:properties": [
                                {
                                    "@type": [
                                        "js:IntegerSchema",
                                        "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                                    ],
                                    "js:propertyName": "value"
                                },
                                {
                                    "@type": [
                                        "js:StringSchema",
                                        "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                                    ],
                                    "js:propertyName": "name"
                                }
                            ],
                            "name": "Get Wrist Rotation",
                            "hasForm": {
                                "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/wrist/rotation"
                            }
                        }
                    ],
                    {
                        "@type": [
                            [
                                "PropertyAffordance",
                                "js:ObjectSchema"
                            ],
                            "https://ci.mines-stetienne.fr/kg/ontology#Base"
                        ],
                        "js:properties": [
                            {
                                "@type": [
                                    "js:IntegerSchema",
                                    "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                                ],
                                "js:propertyName": "value"
                            },
                            {
                                "@type": [
                                    "https://ci.mines-stetienne.fr/kg/ontology#JointName",
                                    "js:StringSchema"
                                ],
                                "js:propertyName": "name"
                            }
                        ],
                        "hasForm": {
                            "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/base"
                        },
                        "name": "Get Base"
                    }
                ],
                {
                    "@type": [
                        [
                            "PropertyAffordance",
                            "js:ObjectSchema"
                        ],
                        "https://ci.mines-stetienne.fr/kg/ontology#Elbow"
                    ],
                    "name": "Get Elbow",
                    "js:properties": [
                        {
                            "@type": [
                                "js:IntegerSchema",
                                "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                            ],
                            "js:propertyName": "value"
                        },
                        {
                            "@type": [
                                "https://ci.mines-stetienne.fr/kg/ontology#JointName",
                                "js:StringSchema"
                            ],
                            "js:propertyName": "name"
                        }
                    ],
                    "hasForm": {
                        "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/elbow"
                    }
                }
            ],
            {
                "@type": [
                    [
                        "PropertyAffordance",
                        "js:ObjectSchema"
                    ],
                    "https://ci.mines-stetienne.fr/kg/ontology#Shoulder"
                ],
                "js:properties": [
                    {
                        "@type": [
                            "js:IntegerSchema",
                            "https://ci.mines-stetienne.fr/kg/ontology#JointValue"
                        ],
                        "js:propertyName": "value"
                    },
                    {
                        "@type": [
                            "js:StringSchema",
                            "https://ci.mines-stetienne.fr/kg/ontology#JointName"
                        ],
                        "js:propertyName": "name"
                    }
                ],
                "hasForm": {
                    "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/shoulder"
                },
                "name": "Get Shoulder"
            }
        ],
        {
            "@type": [
                [
                    "PropertyAffordance",
                    "js:ObjectSchema"
                ],
                "https://ci.mines-stetienne.fr/kg/ontology#Posture"
            ],
            "hasForm": {
                "hctl:hasTarget": "https://api.interactions.ics.unisg.ch/leubot1/v1.3.0/posture"
            },
            "js:properties": [
                [
                    [
                        [
                            [
                                {
                                    "@type": [
                                        "js:IntegerSchema",
                                        "https://ci.mines-stetienne.fr/kg/ontology#GripperJointValue"
                                    ],
                                    "js:propertyName": "Gripper"
                                },
                                {
                                    "@type": [
                                        "js:IntegerSchema",
                                        "https://ci.mines-stetienne.fr/kg/ontology#ShoulderJointValue"
                                    ],
                                    "js:propertyName": "Shoulder"
                                }
                            ],
                            {
                                "@type": [
                                    "https://ci.mines-stetienne.fr/kg/ontology#BaseJointValue",
                                    "js:IntegerSchema"
                                ],
                                "js:propertyName": "Base"
                            }
                        ],
                        {
                            "@type": [
                                "js:IntegerSchema",
                                "https://ci.mines-stetienne.fr/kg/ontology#ElbowJointValue"
                            ],
                            "js:propertyName": "Elbow"
                        }
                    ],
                    {
                        "@type": [
                            "js:IntegerSchema",
                            "https://ci.mines-stetienne.fr/kg/ontology#WristAngleJointValue"
                        ],
                        "js:propertyName": "WristAngle"
                    }
                ],
                {
                    "@type": [
                        "js:IntegerSchema",
                        "https://ci.mines-stetienne.fr/kg/ontology#WristRotationJointValue"
                    ],
                    "js:propertyName": "WristRotation"
                }
            ],
            "name": "Get Posture"
        }
    ],
    "dct:title": "leubot1",
    "hasSecurityConfiguration": {
        "@type": "wotsec:APIKeySecurityScheme",
        "wotsec:name": "X-API-Key",
        "wotsec:in": "header"
    }
}