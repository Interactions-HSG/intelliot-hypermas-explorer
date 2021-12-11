Blockly.Blocks['affordance_action'] = {
  init: function() {
    this.jsonInit({
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
    })
    this.method = "method"
    this.url = "url"
    this.outputType = "object"
    this.hasInput = false
    this.hasOutput = false
    //this.setMutator(new Blockly.Mutator());
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('method', this.method)
    container.setAttribute('url', this.url)
    container.setAttribute('output_type', this.outputType)
    container.setAttribute('input', this.hasInput)
    container.setAttribute('output', this.hasOutput)
    
    return container;
  },

  domToMutation: function(xmlElement) {
    this.method = xmlElement.getAttribute('method')
    this.url = xmlElement.getAttribute('url')
    this.outputType = xmlElement.getAttribute('output_type')
    this.hasInput = xmlElement.getAttribute('input') === 'true'
    this.hasOutput = xmlElement.getAttribute('output') === 'true'
    if(this.hasInput){
      this.appendValueInput('input')
            .appendField("Input")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(['atom', 'variable', 'object']);
    }

    if(this.hasOutput){
      this.appendValueInput('output')
            .appendField("Result")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(['variable', 'object']);
    }
  }
}


JasonGenerator['affordance_action'] = function(block){
  //getting properties from block
  var indent = "  "+JasonGenerator.THREE_INDENT
  var thingId = block.getFieldValue('thingId');
  var url = block.url;
  var outputType = block.outputType;
  var extractCode = undefined

  //process input
  var inputBlock = block.getInputTargetBlock('input')
  var inputVar = undefined
  var composeCode = undefined
  if(inputBlock){
    if(inputBlock.type != "object_create"){
      let userVar = JasonGenerator.valueToCode(block, 'input', JasonGenerator.NO_PRECEDENCE);
      inputVar = generationUtils.getVariable()
      composeCode = `json.parse(${userVar}, ${inputVar});\n${indent}`
    } else {
      inputVar = generationUtils.getVariable()
      composeCode = generationUtils.getObjectComposeCode(generationUtils.getRootStatement(inputBlock), indent, inputVar)[0]
      composeCode = `json.create_empty_object(${inputVar});\n${indent}${composeCode}${indent}`
    }
  }

  var clientId = generationUtils.getVariable()
  var affordanceResult = generationUtils.getVariable();

  //process output
  var outputBlock = block.getInputTargetBlock('output')
  var resultVar = undefined
  var extractCode = undefined
  if(outputBlock){
    resultVar = generationUtils.getVariable()
    if(outputBlock.type == "variable"){
      var outputVar = JasonGenerator.valueToCode(block, 'output', JasonGenerator.NO_PRECEDENCE);
      if(outputType == "object" || outputType == "array"){
        resultVar = outputVar;
      } else {
        extractCode = `${indent}json.get(${resultVar}, "${outputType}", ${outputVar})`
      }
    } else {
      extractCode = generationUtils.getObjectExtractCode(generationUtils.getRootStatement(outputBlock), indent, resultVar)
    }
  }
  
  //code to use the affordance

  var getArtifact = `?xx_wot_client("${thingId}", ${clientId});\n`
  var method = block.method
  var useAction = `${indent}invokeAction("${url}","${method}", ${inputBlock ? inputVar+', ' : ""} ${outputBlock ? affordanceResult: "_"})[artifact_id(${clientId})]`
  var parseJson = outputBlock ? `;\n${indent}json.parse(${affordanceResult}, ${resultVar})` : "";
  var code = `${composeCode ? composeCode: ""}${getArtifact}${useAction}${parseJson}${extractCode ? ";\n"+extractCode: ""}`

  return [code, JasonGenerator.NO_PRECEDENCE]
}
