const property_block_json = {
  "message0": "ask %1 %2 %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "artifactName",
      "text": "artifact"
    },
    {
      "type": "field_label_serializable",
      "name": "affordanceName",
      "text": "property"
    },
    {
      "type": "input_value",
      "name": "result",
      "check": [
        "object",
        "variable"
      ]
    }
  ],
  "output": "affordance",
  "style": "property_block_style",
  "tooltip": "Get the current value of a property in the result variable or object",
  "helpUrl": ""
}

Blockly.Blocks['property_affordance'] = {
  init: function() {
    this.jsonInit(property_block_json)
    this.method = "method"
    this.url = "url"
    //this.setMutator(new Blockly.Mutator());
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('method', this.method)
    container.setAttribute('url', this.url)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.method = xmlElement.getAttribute('method')
    this.url = xmlElement.getAttribute('url')
  }
}

const action_block_json =
{
  "type": "action_affordance",
  "message0": "use %1 %2 %3 input %4 result %5",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "artifactName",
      "text": "artifact"
    },
    {
      "type": "field_label_serializable",
      "name": "affordanceName",
      "text": "action"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "input",
      "check": [
        "object",
        "variable"
      ],
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "result",
      "check": [
        "object",
        "variable"
      ],
      "align": "RIGHT"
    }
  ],
  "output": "affordance",
  "style": "action_block_style",
  "tooltip": "Invoke an action on an artifact and store the result in a variable or object",
  "helpUrl": ""
}

Blockly.Blocks['action_affordance'] = {
  init: function() {
    this.jsonInit(action_block_json)
    this.method = "method"
    this.url = "url"
    //this.setMutator(new Blockly.Mutator());
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('method', this.method)
    container.setAttribute('url', this.url)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.method = xmlElement.getAttribute('method')
    this.url = xmlElement.getAttribute('url')
  }
}


/*the solution appears to be to generate a block like this:
{
  type: "block",
  blockxml: "<block type='property_affordance'> 
              <field name='artifactName'>ARTIFACT_NAME</field>
              <field name='affordanceName'>AFFORDANCE_NAME</field>
              //output??
              <mutation method='GET', url='www.yggdrasil/artifact/affordance'> 
              </mutation> 
            </block>"
}
and then return that to be added in the toolbox
*/



const affordanceBlockUtils = {
  _protocolBindings: function(operation){
    switch (operation) {
      case 'invokeaction': 
        return 'POST'
      case 'writeproperty' :
      case 'writeallroperties' :
      case 'writemultipleproperties':
        return 'PUT'
      case 'readproperty' :
      case 'readallroperties' :
      case 'readmultipleproperties':
        return 'GET'
      default:
        return undefined
    }
  },

  definePropertyBlock: function (propertyName, propertyDescription, artifactName) {
    var method = propertyDescription.forms[0]['htv:methodName']
    method = method? method : this._protocolBindings(propertyDescription.forms[0].op[0])
    var url = propertyDescription.forms[0].href
    var blockString = 
    `<block type='property_affordance'> 
      <mutation method="${method}" url="${url}"></mutation>
      <field name="artifactName">${artifactName}</field>
      <field name="affordanceName">${propertyName}</field>
    </block>`
    return {kind: "block", blockxml:blockString}
  },

  defineActionBlock: function (actionName, actionDescription, artifactName) {
    var method = actionDescription.forms[0]['htv:methodName'] 
    method = method? method : this._protocolBindings(actionDescription.forms[0].op[0])
    var url = actionDescription.forms[0].href
    var blockString = 
    `<block type='action_affordance'>
      <mutation method="${method}" url="${url}"></mutation>
      <field name="artifactName">${artifactName}</field>
      <field name="affordanceName">${actionName}</field>
    </block>`
    return {kind: "block", blockxml:blockString}
  }
}