const JASONGenerator = new Blockly.Generator('JASON');
JASONGenerator.INDENT = ""
JASONGenerator.BASIC_INDENT = "\n  "
JASONGenerator.RULE_INDENT = "   "
JASONGenerator.NO_PRECEDENCE = 0;
JASONGenerator.OPERATION = 1;


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
  console.log(predicate);
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

JASONGenerator['init_agent'] = function(block){
  var name = block.getFieldValue('name');
  var start_comment = `//This is the initial state of agent ${name}\n`
  var statements = JASONGenerator.statementToCode(block, 'config', JASONGenerator.NO_PRECEDENCE)
  console.log(statements)
  var code = `${start_comment}${statements}\n`
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
