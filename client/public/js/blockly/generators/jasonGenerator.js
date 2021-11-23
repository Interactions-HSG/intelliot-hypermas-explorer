const JasonGenerator = new Blockly.Generator('Jason');
JasonGenerator.INDENT = ""
JasonGenerator.BASIC_INDENT = "\n  "
JasonGenerator.THREE_INDENT = "   "
JasonGenerator.NO_PRECEDENCE = 0;
JasonGenerator.OPERATION = 1;

//Code from blockly repository
//This is the same as workspaceToCode but enforce the order of top blocks as needed
JasonGenerator.generate = function(workspace){
  //reset variable count 
  generationUtils.variableId = 0;
  var code = [];
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true);
  //-----enforcing block order here-------
  var ordered_blocks = [];
  var init = blocks.filter(b => b.type == 'init_agent')
  if(init.length == 0){
    console.warn("The agent has no initialization");
  }
  if(init.length > 1){
    console.error("The agent initialization can be defined only once");
    return null;
  }
  ordered_blocks.push(init[0]);
  var total = blocks.filter(b => b.type != 'init_agent').length;
  blocks = blocks.filter(b => b.type == 'define_plan') //ignore any dangling blocks
  var ignored = total - blocks.length;
  if(blocks.length == 0){
    console.warn("The agent has no defined plans");
    return null;
  }
  ordered_blocks = ordered_blocks.concat(blocks);

  blocks = ordered_blocks;
  if(ignored){
    console.warn(`Ignoring ${ignored} blocks that are not properly nested.`)
  }
  //--------------------------------------
  for (var i = 0, block; (block = blocks[i]); i++) {
    var line = this.blockToCode(block);
    if (Array.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = this.scrubNakedValue(line);
        if (this.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
          line = this.injectId(this.STATEMENT_PREFIX, block) + line;
        }
        if (this.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
          line = line + this.injectId(this.STATEMENT_SUFFIX, block);
        }
      }
      code.push(line);
    }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');

  //MODIFIED add default test plans to create artifact
  code = code + "\n\n//Auto generated plans:\n" +generationUtils.getArtifactCreationPlans()
  return code;
};

//Basic blocks

JasonGenerator['atom'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['variable'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['any_variable'] = function(block) {
  var code = "_"
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['string'] = function(block){
  var code =`"${block.getFieldValue('value')}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['number'] = function(block){
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
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

JasonGenerator['no_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['opposite_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['rule'] = function(block){
  var functor = block.getFieldValue('functor');
  var variables = generationUtils.getItems(block, 'variable', block._variables)
  var rule_body = JasonGenerator.valueToCode(block, 'rule_body', JasonGenerator.NO_PRECEDENCE)
  var code = `${functor}(${variables})${JasonGenerator.BASIC_INDENT}:- ${rule_body}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['rule_body'] = function(block){
  var statements = generationUtils.getItems(block, 'statement', block._statements, ` &${JasonGenerator.BASIC_INDENT}${JasonGenerator.THREE_INDENT}`)
  var code = statements;
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['true'] = function(_){
  var code = "true"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}

JasonGenerator['false'] = function(_){
  var code = "false"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}


JasonGenerator['not'] = function(block){
  var code = "(not "+ JasonGenerator.valueToCode(block, 'value', JasonGenerator.OPERATION)+")"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}

JasonGenerator['operation'] = function(block) {
  var var1 = JasonGenerator.valueToCode(block, 'var1', JasonGenerator.NO_PRECEDENCE)
  var var2 = JasonGenerator.valueToCode(block, 'var2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${var1} ${symbol} ${var2}`
  return [code, JasonGenerator.OPERATION]
}

JasonGenerator['statement'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}

JasonGenerator['and_or_statement'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}

//Init Blocks

JasonGenerator['belief'] = function (block){
  var functor = block.getFieldValue('functor');
  var atomString = generationUtils.getItems(block, 'atom', block._atoms)
  var code = functor
  if(atomString) {
    code = `${functor}(${atomString})`
  }
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['no_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['opposite_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}


JasonGenerator['init_agent'] = function(block){
  var name = block.getFieldValue('name');
  var start_comment = `//This is the initial state of agent ${name}\n`
  var end_comment = `\n//Plan library:`
  var statements = generationUtils.getStackCode(generationUtils.getRootStatement(block), '\n');
  var code = `${start_comment}${statements ? statements : ""}\n${end_comment}`
  return code;
}

JasonGenerator['init_belief'] = function(block){
  var code = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}

JasonGenerator['init_goal'] = function(block){
  var code = "!"+JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}

JasonGenerator['init_rule'] = function(block){
  var code = JasonGenerator.valueToCode(block, 'rule', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}

//Agent Plan Blocks

JasonGenerator['define_plan'] = function(block) {
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

JasonGenerator['belief_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+belief
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['goal_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}

JasonGenerator['test_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}

//plan body

JasonGenerator['add_belief'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `+${belief};`
  return code
}

JasonGenerator['remove_belief'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-${belief};`
  return code
}

JasonGenerator['update_belief'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-+${belief};`
  return code
}

JasonGenerator['add_goal'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!${goal};`
  return code
}

JasonGenerator['add_parallel_goal'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}

JasonGenerator['add_test_goal'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `?${goal};`
  return code
}

JasonGenerator['check_expression'] = function(block) {
  var code = `${JasonGenerator.valueToCode(block, 'statement', JasonGenerator.NO_PRECEDENCE)};`
  return code
}

JasonGenerator['jason_statement'] = function(block){
  var actionName = block.getFieldValue('actionName');
  var arguments = generationUtils.getItems(block, 'argument', block._arguments)
  var code = `${actionName}(${arguments ? arguments : ""});`
  return code
}

JasonGenerator['assign_variable'] = function(block){
  var variable = JasonGenerator.valueToCode(block, 'variable', JasonGenerator.NO_PRECEDENCE)
  var operation = JasonGenerator.valueToCode(block, 'operation', JasonGenerator.NO_PRECEDENCE)
  var code = `${variable} = ${operation};`
  return code
}

JasonGenerator['print_action'] = function(block){
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.println(${message});`
  return code
}

JasonGenerator['wait_action'] = function(block){
  var seconds = JasonGenerator.valueToCode(block, 'seconds', JasonGenerator.NO_PRECEDENCE)
  var milliseconds = parseFloat(seconds)*1000;
  var code = `.wait(${milliseconds});`
  return code
}




//Json Objects Manipulation
//TODO add new blocks for json outside of the autogenerated ones

//Affordances
JasonGenerator['use_affordance'] = function(block){
  var affordance = JasonGenerator.valueToCode(block, 'affordance', JasonGenerator.NO_PRECEDENCE)
  var code = `${affordance};`
  return code
}

JasonGenerator['property_affordance'] = function(block){
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

JasonGenerator['action_affordance'] = function(block){
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

//login

JasonGenerator['thing_login'] = function(block){
  var key = JasonGenerator.valueToCode(block, 'key',JasonGenerator.NO_PRECEDENCE)
  var thing = block.getFieldValue('thing')
  var keyName = block.keyName;
  var location = block.location;
  var scheme = block.scheme;
  var code = `+x_thing_login("${thing}", "${scheme}", "${location}", "${keyName}", ${key})`
  return code;
}

JasonGenerator['username_password'] = function(block){
  var username = JasonGenerator.valueToCode(block, 'username', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var password = JasonGenerator.valueToCode(block, 'password', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var credentialString = username+":"+password
  var code = `"${btoa(credentialString)}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}



//Utils
const generationUtils = {

  variableId: 0,

  getVariable: function(){
    this.variableId +=1;
    return "X_var_"+this.variableId;
  },
  
  getItems: function(block, itemName, itemCount, separator=','){
    var itemArray = []
    for (let i = 0; i < itemCount; i++) {
      var item = JasonGenerator.valueToCode(block, itemName+i, JasonGenerator.NO_PRECEDENCE)
      itemArray.push(item)
    }
    if(itemArray.length){
      return itemArray.reduce((s, t) => s+separator+t)
    } else {
      return null;
    }
  },

  getRootStatement: function(block) {
    return block.getFirstStatementConnection() ? block.getFirstStatementConnection().targetBlock(): undefined;
  },

  getStackCode: function(block, indent){
    if(!block) {
      return null
    }
    var code = JasonGenerator.blockToCode(block);
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var newCode='';
    if(nextBlock) {
      newCode = indent + this.getStackCode(nextBlock, indent)
    }
    return code + newCode;
  },

  getObjectExtractCode: function(block, indent, object){
    if(!block) {
      return null
    }
    var key = block.getFieldValue('key');
    var type = block.getFieldValue('type')
    type = type == '_' ? type : `"${type}"`
    var valueBlock = block.getInputTargetBlock('value')
    var value = ""

    if(valueBlock.type == 'create_object'){
      value = this.getVariable()
      var extractCode = generationUtils.getObjectExtractCode(generationUtils.getRootStatement(valueBlock), indent, value)
    } else {
      value = JasonGenerator.blockToCode(valueBlock)[0]
    }
    var code = `json.get(${object}, ${type}, "${key}", ${value})${extractCode ? ";\n"+indent+extractCode: ""}`
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var newCode='';
    if(nextBlock) {
      newCode = ";\n"+indent + this.getObjectExtractCode(nextBlock, indent, object)
    }
    return code + newCode;
  },


  getObjectComposeCode: function(block, indent, object, offset=0){
    if(!block) {
      return null
    }
    var newOffset = 0;
    var key = block.getFieldValue('key');
    var type = block.getFieldValue('type')
    type = type == '_' ? type : `"${type}"`
    var valueBlock = block.getInputTargetBlock('value')
    var value = ""

    if(valueBlock.type == 'create_object'){
      value = this.getVariable()
      var res = generationUtils.getObjectComposeCode(generationUtils.getRootStatement(valueBlock), indent, value)
      var composeCode = res[0]
      var composeOffset = res[1]
      composeCode = `json.create_empty_object(${value});\n${indent}${composeCode}`
      newOffset +=1;
      newOffset += composeOffset;
    } else {
      value = JasonGenerator.blockToCode(valueBlock)[0]
    }
    
    var code = `${composeCode ? composeCode+indent: ""}json.set(${object},${type}, "${key}", ${value});\n`
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var newCode='';
    if(nextBlock) {
      newCode = indent+this.getObjectComposeCode(nextBlock, indent, object, offset+newOffset)[0]
    }
    return [code + newCode, offset+newOffset];
    
  },

  getArtifactCreationPlans: function(){
    return `{include("./templates/wot.asl")}`
  }
}
