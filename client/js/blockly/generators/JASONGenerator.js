const JasonGenerator = new Blockly.Generator('JASON');
JasonGenerator.INDENT = ""
JasonGenerator.BASIC_INDENT = "\n  "
JasonGenerator.THREE_INDENT = "   "
JasonGenerator.NO_PRECEDENCE = 0;
JasonGenerator.OPERATION = 1;

//Code from blockly repository
//This is the same as workspaceToCode but enforce the order of top blocks as needed
JasonGenerator.generate = function(workspace){
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
  var code = "not "+ JasonGenerator.valueToCode(block, 'value', JasonGenerator.OPERATION)
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
  var end_comment = `//Plan library:\n`
  var statements = generationUtils.getStackCode(generationUtils.getRootStatement(block), '\n');
  var code = `${start_comment}${statements}\n${end_comment}`
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
  var label = `@${block.getFieldValue('label')}`;
  var trigger = JasonGenerator.valueToCode(block, 'trigger', JasonGenerator.NO_PRECEDENCE)
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var body = generationUtils.getStackCode(generationUtils.getRootStatement(block), JasonGenerator.BASIC_INDENT+JasonGenerator.THREE_INDENT);
  if(body.slice(-1) == ';'){
    body=body.slice(0,-1);
  }
  var code = `${label}\n${trigger+JasonGenerator.BASIC_INDENT}:  ${context+JasonGenerator.BASIC_INDENT}<- ${body}.`
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

JasonGenerator['invoke_action'] = function(block){
  var actionName = block.getFieldValue('actionName');
  var arguments = generationUtils.getItems(block, 'argument', block._arguments)
  var code = `${actionName}(${arguments ? arguments : ""});`
  return code
}

JasonGenerator['use_affordance'] = function(block){
  var affordance = JasonGenerator.valueToCode(block, 'affordance', JasonGenerator.NO_PRECEDENCE)
  var code = `${affordance};`
  return code
}

JasonGenerator['assign_variable'] = function(block){
  var variable = JasonGenerator.valueToCode(block, 'variable', JasonGenerator.NO_PRECEDENCE)
  var operation = JasonGenerator.valueToCode(block, 'operation', JasonGenerator.NO_PRECEDENCE)
  var code = `${variable} = ${operation};`
  return code
}







//Utils
const generationUtils = {
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
      return "true"
    }
    var code = JasonGenerator.blockToCode(block);
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var newCode='';
    if(nextBlock) {
      newCode = indent + this.getStackCode(nextBlock, indent)
    }
    return code + newCode;
  }
}
