Blockly.Blocks['action_jason_custom'] = {
  init: function(){
    this.jsonInit({
      "inputsInline":true,
      "previousStatement": "body_block",
      "nextStatement": "body_block",
      "colour": 15,
      "tooltip": "write a jason internal action or an artifact invocation here",
    });
    this._arguments = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('action'),'actionName')
      .appendField('(')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'arguments': this._arguments
    };
  },

  loadExtraState: function(state) {
    this._arguments = state['arguments'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this._arguments);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._arguments = parseInt(xmlElement.getAttribute('arguments'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._arguments)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    //ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'argument', this._arguments);
    this._arguments = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'argument', this._arguments)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('argument' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'argument', this._arguments, ['atom', 'variable', 'predicate'])
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(')'), 'END');
  }
}

JasonGenerator['action_jason_custom'] = function(block){
  var actionName = block.getFieldValue('actionName');
  var arguments = generationUtils.getItems(block, 'argument', block._arguments)
  var code = `${actionName}(${arguments ? arguments : ""});`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "action_print",
  "message0": "say %1",
  "args0": [
    {
      "type": "input_value",
      "name": "message",
      "check": [
        "variable",
        "atom"
      ]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['action_print'] = function(block){
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.println(${message});`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "action_wait",
  "message0": "wait %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "seconds",
      "check": "atom"
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['action_wait'] = function(block){
  var seconds = JasonGenerator.valueToCode(block, 'seconds', JasonGenerator.NO_PRECEDENCE)
  var milliseconds = parseFloat(seconds)*1000;
  var code = `.wait(${milliseconds});`
  return code
}
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
    if(inputBlock.type == "variable"){
      inputVar = JasonGenerator.valueToCode(block, 'output', JasonGenerator.NO_PRECEDENCE);
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
  var code = `${composeCode ? composeCode: ""}${getArtifact}${useAction}${parseJson}${extractCode ? ";\n"+indent+extractCode: ""}`

  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.Blocks['affordance_property'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 to put property %2 in %3 ",
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
Blockly.defineBlocksWithJsonArray([{
  "type": "affordance_use",
  "message0": "ask thing %1",
  "args0": [
    {
      "type": "input_value",
      "name": "affordance",
      "check": "affordance"
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Invoke the affordance",
  "helpUrl": ""
}]);

JasonGenerator['affordance_use'] = function(block){
  var affordance = JasonGenerator.valueToCode(block, 'affordance', JasonGenerator.NO_PRECEDENCE)
  var code = `${affordance};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "any_variable",
  "message0": "any",
  "output": "variable",
  "colour": 0,
  "tooltip": "A special variable that match with everything and does not store the result"
}]);

JasonGenerator['any_variable'] = function(block) {
  var code = "_"
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "assign_variable",
  "message0": "set %1 = %2",
  "args0": [
    {
      "type": "input_value",
      "name": "variable",
      "check": "variable"
    },
    {
      "type": "input_value",
      "name": "operation",
      "check": ["operation", "atom", "variable", "statement", "object"]
    }
  ],
  "inputsInline": true,
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Assign the result of an operation to a variable",
  "helpUrl": ""
}]);

JasonGenerator['assign_variable'] = function(block){
  var variable = JasonGenerator.valueToCode(block, 'variable', JasonGenerator.NO_PRECEDENCE)
  var operation = JasonGenerator.valueToCode(block, 'operation', JasonGenerator.NO_PRECEDENCE)
  var code = `${variable} = ${operation};`
  return code
}
Blockly.Blocks['atom'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "value"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "An atom is any value that starts with a lowercase letter and no spaces",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll("\"", "")
        value = value.replaceAll(" ", "_")
        value = utils.uncapitalize(value)
        block.setWarningText();
        return value;
      } else {
        block.setWarningText("An atom must not be empty")
        return value;
      }
    })
  }
}

JasonGenerator['atom'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.Blocks['belief'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "belief",
      "colour": 105,
      "tooltip": "Define a fact which is true in the agent mind",
      "helpUrl": "",
    });
    this._atoms = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'atoms': this._atoms
    };
  },

  loadExtraState: function(state) {
    this._atoms = state['atoms'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('atoms', this._atoms);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._atoms = parseInt(xmlElement.getAttribute('atoms'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._atoms)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'atom', this._atoms);
    this._atoms = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'atom', this._atoms)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('atom' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this._atoms == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._atoms > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'atom', this._atoms, 'atom')
    var endMessage = (this._atoms ? ')' : '') //+' is true'
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(endMessage), 'END');
  }
}

JasonGenerator['belief'] = function (block){
  var functor = block.getFieldValue('functor');
  var atomString = generationUtils.getItems(block, 'atom', block._atoms)
  var code = functor
  if(atomString) {
    code = `${functor}(${atomString})`
  }
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "belief_add",
  "message0": "start believing %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['belief_add'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `+${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "belief_remove",
  "message0": "don't believe %1 anymore",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['belief_remove'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "belief_update",
  "message0": "update belief, now %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['belief_update'] = function (block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-+${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "check_expression",
  "message0": "continue if %1",
  "args0": [
    {
      "type": "input_value",
      "name": "statement",
      "check": ["statement", "variable"]
    }
  ],
  "inputsInline": true,
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Check a statement and continue the execution of a plan only if it is true ",
  "helpUrl": ""
}]);

JasonGenerator['check_expression'] = function(block) {
  var code = `${JasonGenerator.valueToCode(block, 'statement', JasonGenerator.NO_PRECEDENCE)};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "context_always",
  "message0": "always",
  "output": "context",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

//TODO generator for this block 
Blockly.defineBlocksWithJsonArray([{
  "type": "context_if",
  "message0": "only if %1",
  "args0": [
    {
      "type": "input_value",
      "name": "context",
      "check": [
        "statement",
        "predicate"
      ]
    }
  ],
  "inputsInline": true,
  "output": "context",
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}]);

//TODO generator for this block
Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add",
  "message0": "wait and work until  %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Adds a new goal that the agent will try to pursue immediately only to resume the current plan when the goal is reached.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!${goal};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_parallel",
  "message0": "work until  %1 but don't wait",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Adds a new goal that the agent will try to pursue but it won't suspend the current execution of the plan.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_parallel'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_test",
  "message0": "check if %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Ask the agent to resolve a predicate, if possible within the agent beliefs otherwise trigger a test plan",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_test'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `?${goal};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "init_agent",
  "message0": "When %1 starts %2 it %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "name",
      "text": "new_agent"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "config",
      "check": [
        "init_block"
      ]
    }
  ],
  "inputsInline": true,
  "colour": 60,
  "tooltip": "Configure the initial state of an agent",
  "helpUrl": ""
}]);

JasonGenerator['init_agent'] = function(block){
  var name = block.getFieldValue('name');
  var start_comment = `//This is the initial state of agent ${name}\n`
  var end_comment = `\n//Plan library:`
  var statements = generationUtils.getStackCode(generationUtils.getRootStatement(block), '\n');
  var code = `${start_comment}${statements ? statements : ""}\n${end_comment}`
  return code;
}
Blockly.defineBlocksWithJsonArray([{
  "type": "init_belief",
  "message0": "remembers %1 %2",
  "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "colour": 60,
  "tooltip": "Add a belief to the agent mind",
  "helpUrl": ""
}]);


JasonGenerator['init_belief'] = function (block) {
  var code = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE) + "."
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "init_goal",
  "message0": "decides to achieve %1 %2",
  "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "goal",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "colour": 60,
  "tooltip": "Add the goal for the agent",
  "helpUrl": ""
}]);

JasonGenerator['init_goal'] = function(block){
  var code = "!"+JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "init_rule",
  "message0": "knows that %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "rule",
      "check": "rule"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "colour": 60,
  "tooltip": "Add knowledge of a rule to the agent mind",
  "helpUrl": ""
}]);

JasonGenerator['init_rule'] = function(block){
  var code = JasonGenerator.valueToCode(block, 'rule', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
Blockly.Blocks['login_thing'] = {
  init: function() {
    this.jsonInit({
      "message0": "set login for %1 %2",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "thing",
          "text": "thing"
        },
        {
          "type": "input_value",
          "name": "key",
          "check": [
            "variable",
            "atom",
            "username_password"
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": "body_block",
      "nextStatement": "body_block",
      "colour": 15,
      "tooltip": "",
      "helpUrl": ""
    })
    this.keyName = "key"
    this.location = "header"
    this.scheme = "nosec"
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('keyname', this.keyName)
    container.setAttribute('location', this.location)
    container.setAttribute('scheme', this.scheme)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.keyName = xmlElement.getAttribute('keyname')
    this.location = xmlElement.getAttribute('location')
    this.scheme = xmlElement.getAttribute('scheme')
  }
}

JasonGenerator['login_thing'] = function(block){
  var key = JasonGenerator.valueToCode(block, 'key',JasonGenerator.NO_PRECEDENCE)
  var thing = block.getFieldValue('thing')
  var keyName = block.keyName;
  var location = block.location;
  var scheme = block.scheme;
  var code = `+x_thing_login("${thing}", "${scheme}", "${location}", "${keyName}", ${key})`
  return code;
}
Blockly.defineBlocksWithJsonArray(
  [{
      "type": "mutator_block_root",
      "message0": "block %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "inputs",
          "check": "mutator_block_input"
        }
      ],
      "colour": 210,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "mutator_block_input",
      "message0": "input",
      "previousStatement": null,
      "nextStatement": "mutator_block_input",
      "colour": 210,
      "tooltip": "",
      "helpUrl": ""
    },
  ]
)

const ComposerUtils = {
  addInputFields: function (block, fieldLabel, currentItems, inputType, separator = ', ') {
    for (var i = 0; i < currentItems; i++) {
      if (!block.getInput(fieldLabel + i)) {
        var input = block.appendValueInput(fieldLabel + i)
          .setCheck(inputType)
        if(i != 0) {
          input.appendField(separator)
        }
      }
    }
    // Remove deleted inputs.
    while (block.getInput(fieldLabel + i)) {
      block.removeInput(fieldLabel + i);
      i++;
    }
  },

  initUIBlocks: function (workspace, currentItems) {
    var containerBlock = workspace.newBlock('mutator_block_root');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('inputs').connection;
    for (var i = 0; i < currentItems; i++) {
      var itemBlock = workspace.newBlock('mutator_block_input');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  getConnections: function (rootBlock) {
    var itemBlock = rootBlock
    var connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    return connections
  },

  disconnectChildren: function (block, connections, inputName, itemNumber) {
    for (var i = 0; i < itemNumber; i++) {
      var connection = block.getInput(inputName + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
  },

  connectChildren: function (block, connections, inputName, itemNumber) {
    for (var i = 0; i < itemNumber; i++) {
      Blockly.Mutator.reconnect(connections[i], block, inputName + i);
    }
  },

  forbidZeroItems(firstItemBlock) {
    var itemBlock = firstItemBlock;
    var movable = false;
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      itemBlock.setMovable(movable);
      movable = true;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  }
}
Blockly.defineBlocksWithJsonArray([{
  "type": "no_init_belief",
  "message0": "it doesn't know if %1",
  "args0": [
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "output": "belief",
  "colour": 120,
  "tooltip": "Weakly negates the belief",
  "helpUrl": ""
}]);

JasonGenerator['no_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
    "type": "no_predicate",
    "message0": "agent doesn't know if %1",
    "args0": [
      {
        "type": "input_value",
        "name": "predicate",
        "check": "predicate"
      }
    ],
    "inputsInline": true,
    "output": "predicate",
    "colour": 285,
    "tooltip": "Weakly negates the predicate",
    "helpUrl": ""
}]);

JasonGenerator['no_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "not",
  "message0": "not %1",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "variable",
        "atom",
        "statement"
      ]
    }],
  "output": "statement",
  "colour": 230,
  "tooltip": "Returns the logic opposite of the input value",
}]);

JasonGenerator['not'] = function(block){
  var code = "(not "+ JasonGenerator.valueToCode(block, 'value', JasonGenerator.OPERATION)+")"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
Blockly.Blocks['number'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "0"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "A number",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      //TODO check validation for numbers
      var regex = new RegExp("^[0-9]+(\.[0-9])?[0-9]*$", 'g')
      if(!regex.test(newValue)){
        block.setWarningText("Not a valid number");
        return newValue;
      }
      block.setWarningText();
      return newValue;
    });
  }
}

JasonGenerator['number'] = function(block){
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "object_create",
  "message0": "object %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "fields",
      "check": "object_field"
    }
  ],
  "inputsInline": true,
  "output": "object",
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
}]);

//TODO This block currently cannot generate code if used outside of an affordance block
Blockly.defineBlocksWithJsonArray([{
  "type": "object_field",
  "message0": "%1 as %3 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "key",
      "text": "key"
    },
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "atom",
        "variable",
        "operation",
        "object",
        "statement"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "string",
          "string"
        ],
        [
          "boolean",
          "boolean"
        ],
        [
          "number",
          "number"
        ],
        [
          "integer",
          "integer"
        ],
        [
          "object",
          "object"
        ],
        [
          "array",
          "array"
        ],
        [
          "_",
          "_"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": "object_field",
  "nextStatement": "object_field",
  "colour": 165,
  "tooltip": "Define a field of a json object",
  "helpUrl": ""
}]);

//This block will never have a code validation on it's own since it can be used only with the object_create block
Blockly.defineBlocksWithJsonArray([{
  "type": "operation",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "var1",
      "check": [
        "variable",
        "atom",
        "operation"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "+",
          "+"
        ],
        [
          "-",
          "-"
        ],
        [
          "×",
          "*"
        ],
        [
          "÷",
          "/"
        ]
      ]
    },
    {
      //do not remove
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "var2",
      "check": [
        "variable",
        "atom",
        "operation"
      ]
    }
  ],
  "output": "operation",
  "colour": 200,
  "tooltip": "Returns the output of the operation",
  "helpUrl": ""
}]);

JasonGenerator['operation'] = function(block) {
  var var1 = JasonGenerator.valueToCode(block, 'var1', JasonGenerator.NO_PRECEDENCE)
  var var2 = JasonGenerator.valueToCode(block, 'var2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${var1} ${symbol} ${var2}`
  return [code, JasonGenerator.OPERATION]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "opposite_init_belief",
  "message0": "it's false that %1",
  "args0": [
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "output": "belief",
  "colour": 120,
  "tooltip": "Strongly negate the belief",
  "helpUrl": ""
}]);

JasonGenerator['opposite_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "opposite_predicate",
  "message0": "is false that %1",
  "args0": [
    {
      "type": "input_value",
      "name": "predicate",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "predicate",
  "colour": 285,
  "tooltip": "Strongly negate the predicate",
  "helpUrl": ""
}]);

JasonGenerator['opposite_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "plan_define",
  "message0": "When %1 then %2 do %3",
  "args0": [
    {
      "type": "input_value",
      "name": "trigger",
      "check": "trigger",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "context",
      "check": "context",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "body",
      "check": "body_block"
    }
  ],
  "inputsInline": false,
  "colour": 15,
  "tooltip": "Define an agent plan which is used when the trigger condition verifies and the context is true. Accept a statment or a predicate as context.",
  "helpUrl": ""
}]);

JasonGenerator['plan_define'] = function(block) {
  var trigger = JasonGenerator.valueToCode(block, 'trigger', JasonGenerator.NO_PRECEDENCE)
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var body = generationUtils.getStackCode(generationUtils.getRootStatement(block), JasonGenerator.BASIC_INDENT+JasonGenerator.THREE_INDENT);
  body = body ? body : "true"
  if(body.slice(-1) == ';'){
    body=body.slice(0,-1);
  }
  if(body.slice(-1) == '\n'){
    body=body.slice(0,-2);
  }
  var code = `${trigger+JasonGenerator.BASIC_INDENT}:  ${context+JasonGenerator.BASIC_INDENT}<- ${body}.`
  return code;
}
Blockly.Blocks['predicate'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "predicate",
      "colour": 285,
      "tooltip": "Define a predicate that can accept both variables to be grounded or atoms",
      "helpUrl": ""
    });
    this._terms = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'terms': this._terms
    };
  },

  loadExtraState: function(state) {
    this._terms = state['terms'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('terms', this._terms);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._terms = parseInt(xmlElement.getAttribute('terms'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._terms)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'term', this._terms);
    this._terms = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'term', this._terms)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('term' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this._terms == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._terms > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'term', this._terms, ['atom', 'variable', 'operation'])
    var endMessage = (this._terms ? ')' : '') //+ ' is true'
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(endMessage), 'END');
  }
}

JasonGenerator['predicate'] = function(block) {
  var functor = block.getFieldValue('functor');
  var termString = generationUtils.getItems(block, 'term', block._terms)
  var code = functor
  if(termString) {
    code = `${functor}(${termString})`
  }
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.Blocks['rule'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "rule",
      "colour": 285,
      "tooltip": "Define a rule that holds when the statement holds",
      "helpUrl": ""
    });
    this._variables = 1;
    this.appendValueInput('rule_body')
      .appendField('when')
      .setCheck('rule_body')
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'variables': this._variables
    };
  },

  loadExtraState: function(state) {
    this._variables = state['variables'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('variables', this._variables);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._variables = parseInt(xmlElement.getAttribute('variables'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._variables)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'variable', this._variables);
    this._variables = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'variable', this._variables)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('variable' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this._variables == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._variables > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'variable', this._variables, 'variable')
    var endMessage = (this._variables ? ')' : '') + ' is true'
    this.appendDummyInput('end')
      .appendField(endMessage);
    this.moveInputBefore('rule_body', null)
  }
}

JasonGenerator['rule'] = function(block){
  var functor = block.getFieldValue('functor');
  var variables = generationUtils.getItems(block, 'variable', block._variables)
  var rule_body = JasonGenerator.valueToCode(block, 'rule_body', JasonGenerator.NO_PRECEDENCE)
  var code = `${functor}(${variables})${JasonGenerator.BASIC_INDENT}:- ${rule_body}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.Blocks['rule_body'] = {
  init: function(){
    this.jsonInit({
      "output": "rule_body",
      "colour": 285,
      "tooltip": "Define the body of a rule, accept statements as input",
      "helpUrl": ""
    });
    this._statements = 2;
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },

  saveExtraState: function() {
    return {
      'statements': this._statements
    };
  },

  loadExtraState: function(state) {
    this._statements = state['statements'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('statements', this._statements);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._statements = parseInt(xmlElement.getAttribute('statements'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._statements)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'statement', this._statements);
    this._statements = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'statement', this._statements)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('statement' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    ComposerUtils.addInputFields(this, 'statement', this._statements, ['statement', 'predicate'], 'and')
  }
}

JasonGenerator['rule_body'] = function(block){
  var statements = generationUtils.getItems(block, 'statement', block._statements, ` &${JasonGenerator.BASIC_INDENT}${JasonGenerator.THREE_INDENT}`)
  var code = statements;
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "statement",
  "message0": "%1 %2 %3 %4",
  "args0": [{
      "type": "input_value",
      "name": "statement1",
      "check": [
        "atom",
        "variable",
        "operation",
        "statement"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "==",
          "=="
        ],
        [
          "≠",
          "\\=="
        ],
        [
          ">",
          ">"
        ],
        [
          "<",
          "<"
        ],
        [
          "≥",
          ">="
        ],
        [
          "≤",
          "<="
        ]
      ]
    },
    {
      "type": "input_dummy"
      //do not remove
    },
    {
      "type": "input_value",
      "name": "statement2",
      "check": [
        "atom",
        "variable",
        "operation",
        "statement"
      ]
    }
  ],
  "output": "statement",
  "colour": 230,
  "tooltip": "Provides conditions over variables and atoms",
  "helpUrl": ""
}]);

JasonGenerator['statement'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "statement_and_or",
  "message0": "%1 %2 %3 %4",
  "args0": [{
      "type": "input_value",
      "name": "statement1",
      "check": [
        "statement",
        "predicate"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "and",
          "&"
        ],
        [
          "or",
          "|"
        ]
      ]
    },
    {
      "type": "input_dummy"
      //do not remove
    },
    {
      "type": "input_value",
      "name": "statement2",
      "check": [
        "statement",
        "predicate"
      ]
    }
  ],
  "output": "statement",
  "colour": 230,
  "tooltip": "Provides and/or conditions to compose statements or predicates",
  "helpUrl": ""
}]);

JasonGenerator['statement_and_o'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}
Blockly.Blocks['string'] = {
  init: function(){
    this.jsonInit({
      "message0": "\"%1\"",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "text"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "A string",
      "helpUrl": ""
    });
    this.getField('value').setValidator(function(newValue){
      //TODO implement validation for strings
      return newValue;
    });
  }
}

JasonGenerator['string'] = function(block){
  var code =`"${block.getFieldValue('value')}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_belief_add_remove",
  "message0": "agent %1 %2 remembering %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "starts",
          "+"
        ],
        [
          "stops",
          "-"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "belief",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "colour": 15,
  "tooltip": "When an agent starts or stops remembering something new. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['trigger_belief_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+belief
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_goal_add_remove",
  "message0": "agent %1 %2 to achieve %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "wants",
          "+!"
        ],
        [
          "failed",
          "-!"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "goal",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "colour": 15,
  "tooltip": "When an agent starts or stop pursuing a goal. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['trigger_goal_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_test_add_remove",
  "message0": "agent %1 %2 to check %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "wants",
          "+?"
        ],
        [
          "failed",
          "-?"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "test",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "colour": 15,
  "tooltip": "When an agent try or fail to check a condition. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['trigger_test_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "true",
  "message0": "true",
  "output": "atom",
  "colour": 190,
  "tooltip": "Make something be always true.",
  "helpUrl": ""
},
{
  "type": "false",
  "message0": "false",
  "output": "atom",
  "colour": 190,
  "tooltip": "Make something be always false.",
  "helpUrl": ""
}]);

JasonGenerator['true'] = function(_){
  var code = "true"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}

JasonGenerator['false'] = function(_){
  var code = "false"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
Blockly.defineBlocksWithJsonArray([
  {
    "type": "username_password",
    "message0": "username %1 password %2",
    "args0": [
      {
        "type": "input_value",
        "name": "username",
        "check": ["atom", "variable"]
      },
      {
        "type": "input_value",
        "name": "password",
        "check": ["atom", "variable"]
      }
    ],
    "output": "username_password",
    "colour": 195,
    "tooltip": "",
    "helpUrl": ""
  }
]);

JasonGenerator['username_password'] = function(block){
  var username = JasonGenerator.valueToCode(block, 'username', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var password = JasonGenerator.valueToCode(block, 'password', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var credentialString = username+":"+password
  var code = `"${btoa(credentialString)}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.Blocks['variable'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "Variable"
      }],
      "output": "variable",
      "colour": 0,
      "tooltip": "A variable is a string that starts with an uppercase letter, it can store a value of any type.",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      var regex = new RegExp("[A-Z][a-zA-Z0-9]*")
      var value = newValue.trim();
      if(value){
        value = value.replaceAll(" ", "_")
        value = utils.capitalize(value)
        if(!regex.test(value)){
          block.setWarningText("A variable must not start with a number")
          return value;
        }
        block.setWarningText();
        return value;
      } else {
        block.setWarningText("A variable name must not be empty")
        return value;
      }
    })
  }
}

JasonGenerator['variable'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
