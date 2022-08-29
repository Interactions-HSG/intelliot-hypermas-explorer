Blockly.defineBlocksWithJsonArray([{
  "type": "context_always",
  "message0": "sempre",
  "output": "context",
  "style": "context_block_style",
  "tooltip": "Un contesto vuoto che determina che il piano è sempre valido",
  "helpUrl": ""
}]);

//TODO generator for this block 
JasonGenerator['context_always'] = function (block){
  code = `true`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
