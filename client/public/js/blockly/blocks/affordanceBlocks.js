const property_block_json = {
  "message0": "%1 to set %2 in %3 ",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "thingId",
      "text": "thing"
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
  "message0": "%1 to %2",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "thingId",
      "text": "artifact"
    },
    {
      "type": "field_label_serializable",
      "name": "affordanceName",
      "text": "action"
    },
    
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
    this.hasInput = false
    this.hasOutput = false
    //this.setMutator(new Blockly.Mutator());
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('method', this.method)
    container.setAttribute('url', this.url)
    container.setAttribute('input', this.hasInput)
    container.setAttribute('output', this.hasOutput)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.method = xmlElement.getAttribute('method')
    this.url = xmlElement.getAttribute('url')
    this.hasInput = xmlElement.getAttribute('input') === 'true'
    this.hasOutput = xmlElement.getAttribute('output') === 'true'
    if(this.hasInput){
      this.appendValueInput('input')
            .appendField("input")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(['variable', 'object']);
    }

    if(this.hasOutput){
      this.appendValueInput('output')
            .appendField("output")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(['variable', 'object']);
    }
  }
}


/*the solution appears to be to generate a block like this:
{
  type: "block",
  blockxml: "<block type='property_affordance'> 
              <field name='thingId'>ARTIFACT_NAME</field>
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

  definePropertyBlock: function (propertyName, propertyDescription, thingId) {
    var method = propertyDescription.forms[0]['htv:methodName']
    method = method? method : this._protocolBindings(propertyDescription.forms[0].op[0])
    var url = propertyDescription.forms[0].href

    var resultBlock = this._getSchemaBlocks(propertyDescription, "Result")
   
    var blockString = 
    `
    <block type="use_affordance">
      <value name="affordance">
      <block type='property_affordance'> 
        <mutation method="${method}" url="${url}"></mutation>
        <field name="thingId">${thingId}</field>
        <field name="affordanceName">${propertyName}</field>
        <value name="result">
          ${resultBlock}
        </value>
      </block>
      </value>
    </block>
    `
    return {kind: "block", blockxml:blockString}
  },

  defineActionBlock: function (actionName, actionDescription, thingId) {
    var method = actionDescription.forms[0]['htv:methodName'] 
    method = method? method : this._protocolBindings(actionDescription.forms[0].op[0])
    var url = actionDescription.forms[0].href

    var actionType = "action_affordance"

    var inputBlocks = ""
    var hasInput = false
    if(actionDescription.input){
      inputBlocks = this._getSchemaBlocks(actionDescription.input, "Input")
      hasInput = true
      inputBlocks = `<value name="input">${inputBlocks}</value>`
    }

    

    var outputBlocks = ""
    var hasOutput = false
    if(actionDescription.output){
      hasOutput = true
      outputBlocks = this._getSchemaBlocks(actionDescription.output, "Output")
      outputBlocks = `<value name="output">${outputBlocks}</value>`
    }

    var blockString = 
    `
    <block type="use_affordance">
      <value name="affordance">
        <block type='${actionType}'>
          <mutation method="${method}" url="${url}" input="${hasInput}" output="${hasOutput}"></mutation>
          <field name="thingId">${thingId}</field>
          <field name="affordanceName">${actionName}</field>
          ${inputBlocks}
          ${outputBlocks}
        </block>
      </value>
    </block>
    `
    return {kind: "block", blockxml:blockString}
  },

  _getSchemaBlocks: function(schema, varName){
    var resultBlock = 
    `<block type="variable">
      <field name="value">${varName}</field>
    </block>`
    if(schema.type == "object"){
      var props = schema.properties
      var statements = []
      for(const p in props){
        var value = this._getSchemaBlocks(props[p], p)
        var propField = `
        <block type="object_field">
          <field name="key">${p}</field>
          <field name="type">${props[p].type ? props[p].type : "_"}</field>
          <value name="value">
          ${value}
          </value>
        </block>
        `
        statements.push(propField)
      }
      
      var statementString = statements.slice(1).reduce((b1, b2) => b1.slice(0, b1.lastIndexOf('</block>')) + '<next>' + b2, statements[0])
      
      for (let i = 0; i < statements.length-1; i++) {
        statementString = statementString + '</next>\n</block>\n'
      }
      resultBlock = 
      `<block type="create_object">
        <statement name="fields">
        ${statementString}
        </statement>
      </block>`
     
    } else if(schema.type == "array"){
      console.error("Array are not supported at the moment")
    }
    
    return resultBlock;
  }
}