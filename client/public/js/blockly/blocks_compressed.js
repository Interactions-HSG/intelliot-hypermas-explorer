Blockly.Blocks['action_jason_custom'] = {
  init: function(){
    this.jsonInit({
      "inputsInline":true,
      "previousStatement": "body_block",
      "nextStatement": "body_block",
      "style": "body_block_style",
      "tooltip": "write a jason internal action or an artifact invocation here",
    });
    this._arguments = 1;
    this.appendDummyInput()
      .appendField('executes')
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
  "message0": "says %1",
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
  "style": "body_block_style",
  "tooltip": "Say some text, it can be read from the console to understand what the agent is doing.",
  "helpUrl": ""
}]);

JasonGenerator['action_print'] = function(block){
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.println(${message});`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "action_wait",
  "message0": "waits %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "seconds",
      "check": ["atom", "variable"]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Wait for a number of seconds.",
  "helpUrl": ""
}]);

JasonGenerator['action_wait'] = function(block){
  var seconds = JasonGenerator.valueToCode(block, 'seconds', JasonGenerator.NO_PRECEDENCE)
  var milliseconds = seconds+"*1000";
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
Blockly.Blocks['affordance_property'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 to store the value of its current %2 in %3",
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
Blockly.defineBlocksWithJsonArray([{
  "type": "affordance_use",
  "message0": "asks thing %1",
  "args0": [
    {
      "type": "input_value",
      "name": "affordance",
      "check": "affordance"
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
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
  "message0": "stores in %1 the value of %2",
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
  "style": "body_block_style",
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
      } else {
        block.setWarningText("Must not be empty")
      }
      var regex = new RegExp("^[a-zA-Z0-9_]*$", 'g')
      if(!regex.test(value)){
        block.setWarningText("Name must be lowercase, no spaces and no special characters allowed (except from _ )");
        return value;
      }
      block.setWarningText();
      return value;
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
      "style": "belief_block_style",
      "tooltip": "Define a fact which is true in the agent mind",
      "helpUrl": "",
    });
    this._atoms = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
    var block = this;
    this.getField('functor').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll("\"", "")
        value = value.replaceAll(" ", "_")
        value = utils.uncapitalize(value)
        block.setWarningText();
      } else {
        block.setWarningText("Must not be empty")
      }
      var regex = new RegExp("^[a-zA-Z0-9_]*$", 'g')
      if(!regex.test(value)){
        block.setWarningText("Not a valid name");
        return value;
      }
      block.setWarningText();
      return value;
    })
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
    ComposerUtils.addInputFields(this, 'atom', this._atoms, ['atom', 'belief'])
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
  "message0": "adds a new note: %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Add a new note.",
  "helpUrl": ""
}]);

JasonGenerator['belief_add'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `+${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "belief_remove",
  "message0": "removes note: %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Remove a matching note.",
  "helpUrl": ""
}]);

JasonGenerator['belief_remove'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "belief_update",
  "message0": "replace all similar notes with: %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Replace all the mental notes with the same root with the new one.",
  "helpUrl": ""
}]);

JasonGenerator['belief_update'] = function (block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-+${belief};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "check_expression",
  "message0": "continues if %1 otherwise fails",
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
  "style": "body_block_style",
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
  "style": "context_block_style",
  "tooltip": "The plan is always applicable.",
  "helpUrl": ""
}]);

//TODO generator for this block 
JasonGenerator['context_always'] = function (block){
  code = `true`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
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
  "style": "context_block_style",
  "tooltip": "Express the context of when a plan is applicable.",
  "helpUrl": ""
}]);

//TODO generator for this block
JasonGenerator['context_if'] = function (block){
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var code = context; 
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add",
  "message0": "decides to achieve %1 first then continue",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
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
  "message0": "decides to also achieve %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Adds a new goal that the agent will try to pursue in parallel with the current execution of the plan.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_parallel'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_test",
  "message0": "checks if it already know %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Ask the agent to check some information, if possible within the agent notes otherwise trigger an appropriate plan to retrieve the information.",
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
  "style": "init_block_style",
  "tooltip": "Configure the initial mental state of an agent",
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
  "message0": "adds a new note: %1 %2",
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
  "style": "init_block_style",
  "tooltip": "Add a note into the agent mind",
  "helpUrl": ""
}]);


JasonGenerator['init_belief'] = function (block) {
  var code = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE) + "."
  return code
}
Blockly.defineBlocksWithJsonArray([{
  "type": "init_goal",
  "message0": "decides to achieve %1",
  "args0": [
    {
      "type": "input_value",
      "name": "goal",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "style": "init_block_style",
  "tooltip": "Add a goal that the agent wants to achieve as soon as it's started",
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
  "style": "init_block_style",
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
      "message0": "authenticates on %1 with %2",
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
      "style": "body_block_style",
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
    "type": "no_predicate",
    "message0": "it doesn't know if %1",
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
  "tooltip": "Returns the logic opposite of the input value. If true then false and if false then true.",
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
      "tooltip": "A number.",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      //TODO check validation for numbers
      var regex = new RegExp("^-?[0-9]+(\.[0-9])?[0-9]*$", 'g')
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
  "message0": "object %1 %2",
  "args0": [
    {
      //do not remove
      "type": "input_dummy"
    },
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
          "text",
          "string"
        ],
        [
          "true/false",
          "boolean"
        ],
        [
          "decimal number",
          "number"
        ],
        [
          "natural number",
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
  "tooltip": "Returns the output of an arithmetic operation between numbers",
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
  "style": "belief_block_style",
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
  "message0": "it's false that %1",
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
  "message0": "When %1 then %2 it %3 then it's done!",
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
  "style": "body_block_style",
  "tooltip": "Define a plan that the agent can use when the triggering condition happens, and the context is valid.",
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
    var block = this;
    this.getField('functor').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll("\"", "")
        value = value.replaceAll(" ", "_")
        value = utils.uncapitalize(value)
        block.setWarningText();
      } else {
        block.setWarningText("Must not be empty")
      }
      var regex = new RegExp("^[a-zA-Z0-9_]*$", 'g')
      if(!regex.test(value)){
        block.setWarningText("Not a valid name");
        return value;
      }
      block.setWarningText();
      return value;
    })
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
    ComposerUtils.addInputFields(this, 'term', this._terms, ['atom', 'variable', 'operation', 'predicate'])
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
      "tooltip": "Define a rule that the agent can remember to check complex conditions later.",
      "helpUrl": ""
    });
    this._variables = 1;
    this.appendValueInput('rule_body')
      .appendField('when')
      .setCheck('rule_body')
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('rule_name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
    var block = this;
    this.getField('functor').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll("\"", "")
        value = value.replaceAll(" ", "_")
        value = utils.uncapitalize(value)
        block.setWarningText();
      } else {
        block.setWarningText("Must not be empty")
      }
      var regex = new RegExp("^[a-zA-Z0-9_]*$", 'g')
      if(!regex.test(value)){
        block.setWarningText("Name must be lowercase, no spaces and no special characters allowed (except from _ )");
        return value;
      }
      block.setWarningText();
      return value;
    })
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
      "tooltip": "Define the body of a rule, accept statements as input.",
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
  "type": "send_agent_message",
  "message0": "Sends message to %1 : %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "receiver",
      "text": "agent_name"
    },
    {
      "type": "field_dropdown",
      "name": "illocutionary_force",
      "options": [
        [
          "make note",
          "tell"
        ],
        [
          "achieve",
          "achieve"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "message",
      "check": ["predicate"]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Send another agent a message, this can mean ordering the agent to achieve something or share a note with it.",
  "helpUrl": ""
}]);

JasonGenerator["send_agent_message"] = function(block) {
  var receiver = block.getFieldValue('receiver')
  var illocutionaryForce = block.getFieldValue('illocutionary_force')
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.send(${receiver}, ${illocutionaryForce}, ${message});`;
  return code
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
          "is",
          "=="
        ],
        [
          "is not",
          "\\=="
        ],
        [
          "is greater than",
          ">"
        ],
        [
          "is less than",
          "<"
        ],
        [
          "is greater than or equal",
          ">="
        ],
        [
          "is less than or equal",
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
  "tooltip": "A logic condition between values.",
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
  "tooltip": "When two conditions are in and the result is true if both are true. When two conditions are in or the result is true if at least one is true.",
  "helpUrl": ""
}]);

JasonGenerator['statement_and_or'] = function(block) {
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
      "tooltip": "Some text, it can contain spaces.",
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
  "message0": "agent %1 %2 note %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "adds",
          "+"
        ],
        [
          "removes",
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
  "style": "trigger_block_style",
  "tooltip": "",
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
          "decides",
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
  "style": "trigger_block_style",
  "tooltip": "",
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
  "message0": "agent %1 %2 %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "doesn't already know",
          "+?"
        ],
        [
          "failed to check if it knew",
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
  "style": "trigger_block_style",
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['trigger_test_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
Blockly.defineBlocksWithJsonArray([{
  "type": "true_false",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "value",
      "options": [
        [
          "true",
          "true"
        ],
        [
          "false",
          "false"
        ]
      ]
    }
  ],
  "output": "atom",
  "colour": 190,
  "tooltip": "The true value, to use in conditions.",
  "helpUrl": ""
}]);

JasonGenerator['true_false'] = function(block){
  var code = block.getFieldValue('value')
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
        "text": "Variable_Name"
      }],
      "output": "variable",
      "colour": 0,
      "tooltip": "A variable is a named \"box\" where you can store a value.",
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
