const JASONGenerator = new Blockly.Generator('JASON');
JASONGenerator.INDENT = ""
JASONGenerator.BASIC_INDENT = "\n  "
JASONGenerator.RULE_INDENT = "   "
JASONGenerator.NO_PRECEDENCE = 0;
JASONGenerator.OPERATION = 1;

//Code from blockly repository
//This is the same as workspaceToCode but enforce the order of top blocks as needed
JASONGenerator.generateJASON = function(workspace){
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


JASONGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  if (nextBlock) {
      nextCode =
          opt_thisOnly ? '' : '\n' + JASONGenerator.blockToCode(nextBlock);
  }
  return code + nextCode;
};

//Basic blocks

JASONGenerator['atom'] = function(block) {
  var value = block.getFieldValue('value')
  var code
  if(value.includes(" ")){
    code = `"${value}"`
  } else {
    code = value
  }
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['variable'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['predicate'] = function(block) {
  var functor = block.getFieldValue('functor');
  var termString = generationUtils.getItems(block, 'term', block._terms)
  var code = `${functor}(${termString})`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['no_predicate'] = function(block){
  var predicate = JASONGenerator.valueToCode(block, 'predicate', JASONGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['opposite_predicate'] = function(block){
  var predicate = JASONGenerator.valueToCode(block, 'predicate', JASONGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['rule'] = function(block){
  var functor = block.getFieldValue('functor');
  var variables = generationUtils.getItems(block, 'variable', block._variables)
  var rule_body = JASONGenerator.valueToCode(block, 'rule_body', JASONGenerator.NO_PRECEDENCE)
  var code = `${functor}(${variables})${JASONGenerator.BASIC_INDENT}:- ${rule_body}`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['rule_body'] = function(block){
  var statements = generationUtils.getItems(block, 'statement', block._statements, ` &${JASONGenerator.BASIC_INDENT}${JASONGenerator.RULE_INDENT}`)
  var code = statements;
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['always'] = function(block){
  var code = ""
  return [code, JASONGenerator.NO_PRECEDENCE] 
}

JASONGenerator['not'] = function(block){
  var code = "not "+ JASONGenerator.valueToCode(block, 'value', JASONGenerator.OPERATION)
  return [code, JASONGenerator.NO_PRECEDENCE] 
}

JASONGenerator['operation'] = function(block) {
  var var1 = JASONGenerator.valueToCode(block, 'var1', JASONGenerator.NO_PRECEDENCE)
  var var2 = JASONGenerator.valueToCode(block, 'var2', JASONGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${var1} ${symbol} ${var2}`
  return [code, JASONGenerator.OPERATION]
}

JASONGenerator['statement'] = function(block) {
  var statement1 = JASONGenerator.valueToCode(block, 'statement1', JASONGenerator.NO_PRECEDENCE)
  var statment2 = JASONGenerator.valueToCode(block, 'statement2', JASONGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JASONGenerator.OPERATION]
}

JASONGenerator['and_or_statement'] = function(block) {
  var statement1 = JASONGenerator.valueToCode(block, 'statement1', JASONGenerator.NO_PRECEDENCE)
  var statment2 = JASONGenerator.valueToCode(block, 'statement2', JASONGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JASONGenerator.OPERATION]
}

//Init Blocks

JASONGenerator['belief'] = function (block){
  var functor = block.getFieldValue('functor');
  var atomString = generationUtils.getItems(block, 'atom', block._atoms)
  var code = `${functor}(${atomString})`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['no_init_belief'] = function(block){
  var predicate = JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['opposite_init_belief'] = function(block){
  var predicate = JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JASONGenerator.NO_PRECEDENCE]
}


JASONGenerator['init_agent'] = function(block){
  var name = block.getFieldValue('name');
  var start_comment = `//This is the initial state of agent ${name}\n`
  var end_comment = `//Plan library:\n`
  var statements = JASONGenerator.statementToCode(block, 'config')
  var code = `${start_comment}${statements}\n${end_comment}`
  return code;
}

JASONGenerator['init_belief'] = function(block){
  var code = JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)+"."
  return code
}

JASONGenerator['init_goal'] = function(block){
  var code = "!"+JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)+"."
  return code
}

JASONGenerator['init_rule'] = function(block){
  var code = JASONGenerator.valueToCode(block, 'rule', JASONGenerator.NO_PRECEDENCE)+"."
  return code
}

//Agent Plan Blocks

JASONGenerator['define_plan'] = function(block) {
  var label = `@${block.getFieldValue('label')}`;
  var trigger = JASONGenerator.valueToCode(block, 'trigger', JASONGenerator.NO_PRECEDENCE)
  var context = JASONGenerator.valueToCode(block, 'context', JASONGenerator.NO_PRECEDENCE)
  var body = JASONGenerator.statementToCode(block, 'body')

  var code = `${label}\n${trigger}${JASONGenerator.BASIC_INDENT}:  ${context}${JASONGenerator.BASIC_INDENT}<- ${body}`
  return code;
}

JASONGenerator['belief_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var belief = JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = symbol+belief
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['goal_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JASONGenerator.NO_PRECEDENCE]
}

JASONGenerator['test_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal =JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JASONGenerator.NO_PRECEDENCE]
}

//plan body

JASONGenerator['add_belief'] = function(block) {
  var belief =JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = `+${belief}`
  return code
}

JASONGenerator['remove_belief'] = function(block) {
  var belief =JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = `-${belief}`
  return code
}

JASONGenerator['update_belief'] = function(block) {
  var belief =JASONGenerator.valueToCode(block, 'belief', JASONGenerator.NO_PRECEDENCE)
  var code = `-+${belief}`
  return code
}

JASONGenerator['add_goal'] = function(block) {
  var goal =JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)
  var code = `!${goal}`
  return code
}

JASONGenerator['add_parallel_goal'] = function(block) {
  var goal =JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)
  var code = `!!${goal}`
  return code
}

JASONGenerator['add_test_goal'] = function(block) {
  var goal =JASONGenerator.valueToCode(block, 'goal', JASONGenerator.NO_PRECEDENCE)
  var code = `?${goal}`
  return code
}

JASONGenerator['check_expression'] = function(block) {
  var code = "NOT_IMPLEMENTED" //TODO
  return code
}







//Utils
const generationUtils = {
  getItems: function(block, itemName, itemCount, separator=','){
    var itemArray = []
    for (let i = 0; i < itemCount; i++) {
      var item = JASONGenerator.valueToCode(block, itemName+i, JASONGenerator.NO_PRECEDENCE)
      itemArray.push(item)
    }
    return itemArray.reduce((s, t) => s+separator+t)
  }
}
