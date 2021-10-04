const JASONGenerator = new Blockly.Generator('JASON');

//Basic blocks

JASONGenerator['atom'] = function(block) {
  var value = block.getFieldValue('value')
  
  return `"${block.getFieldValue('value')}"`;
}

JASONGenerator['variable'] = function(block) {
  return block.getField('value');
}

JASONGenerator['atom'] = function(block) {
  var var1 = block.getField('var1');
  var var1 = block.getField('var1');
}

