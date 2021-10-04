const JASONGenerator = new Blockly.Generator('JASON');

//Basic blocks

JASONGenerator['atom'] = function(block) {
  var value = block.getFieldValue('value');
  if(value.includes(" ")){
    return `"${value}"`
  } else {
    return value;
  }
}

JASONGenerator['variable'] = function(block) {
  return block.getFieldValue('value');
}

JASONGenerator['operation'] = function(block) {
  var var1 = block.getFieldValue('var1');
  var var1 = block.getFieldValue('var1');
  var symbol = block.getFieldValue('symbol')
}

