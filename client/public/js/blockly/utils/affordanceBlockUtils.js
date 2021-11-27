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
    var type = propertyDescription.type

    var resultBlock = this._getSchemaBlocks(propertyDescription, "Result")
   
    var blockString = 
    `
    <block type="affordance_use">
      <value name="affordance">
      <block type='affordance_property'> 
        <mutation method="${method}" url="${url}" output_type="${type}"></mutation>
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
    

    var actionType = "affordance_action"

    var inputBlocks = ""
    var hasInput = false
    if(actionDescription.input){
      inputBlocks = this._getSchemaBlocks(actionDescription.input, "Input")
      hasInput = true
      inputBlocks = `<value name="input">${inputBlocks}</value>`
    }
    
    var outputBlocks = ""
    var hasOutput = false
    var outputType = ""
    if(actionDescription.output){
      var outputType = `output_type="${actionDescription.output.type}"`
      hasOutput = true
      outputBlocks = this._getSchemaBlocks(actionDescription.output, "Output")
      outputBlocks = `<value name="output">${outputBlocks}</value>`
    }

    var blockString = 
    `
    <block type="affordance_use">
      <value name="affordance">
        <block type='${actionType}'>
          <mutation method="${method}" url="${url}" ${outputType} input="${hasInput}" output="${hasOutput}"></mutation>
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
        var value = this._getSchemaBlocks(props[p], p+"_"+varName)
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
      `<block type="object_create">
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