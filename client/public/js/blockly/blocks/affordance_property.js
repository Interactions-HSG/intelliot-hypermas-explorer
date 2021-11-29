Blockly.Blocks['affordance_property'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 to tell me the %2 is %3 ",
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
          "align": "RIGHT",
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
    )
    this.method = "method"
    this.url = "url"
    this.outputType = "object"
    //this.setMutator(new Blockly.Mutator());
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('method', this.method)
    container.setAttribute('url', this.url)
    container.setAttribute('output_type', this.outputType)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.method = xmlElement.getAttribute('method')
    this.url = xmlElement.getAttribute('url')
    this.outputType = xmlElement.getAttribute('output_type')
  }
}


JasonGenerator['affordance_property'] = function(block){
  //getting properties from block
  var indent = "  "+JasonGenerator.THREE_INDENT
  var thingId = block.getFieldValue('thingId');
  var url = block.url;
  var outputType = block.outputType;
  var resultBlock = block.getInputTargetBlock('result')
  var extractCode = undefined

  var clientId = generationUtils.getVariable()
  var affordanceResult = generationUtils.getVariable()
  var resultVar = generationUtils.getVariable();


  //generating code to process the result
  if(resultBlock.type == "variable"){
    var outputVar = JasonGenerator.valueToCode(block, 'result', JasonGenerator.NO_PRECEDENCE);
    if(outputType == "object" || outputType == "array"){
      resultVar = outputVar;
    } else {
      extractCode = `${indent}json.get(${resultVar}, "${outputType}", ${outputVar})`
    }
  } else {
    extractCode = generationUtils.getObjectExtractCode(generationUtils.getRootStatement(resultBlock), indent, resultVar)
  }

  //generate code to use the affordance
  var getArtifact = `?xx_wot_client("${thingId}",${clientId});\n`
  var useAffordance = `${indent}readProperty("${url}", ${affordanceResult})[artifact_id(${clientId})];\n`
  var parseJson = `${indent}json.parse(${affordanceResult}, ${resultVar})`

  //composing and return
  var code = `${getArtifact}${useAffordance}${parseJson}${extractCode ? ";\n"+indent+extractCode: ""}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
