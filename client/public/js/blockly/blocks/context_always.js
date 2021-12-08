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
