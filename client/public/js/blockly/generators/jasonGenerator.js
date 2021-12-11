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
  blocks = blocks.filter(b => b.type == 'plan_define') //ignore any dangling blocks
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
