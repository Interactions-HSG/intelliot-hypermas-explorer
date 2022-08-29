Blockly.defineBlocksWithJsonArray([{
  "type": "check_expression",
  "message0": "continua se %1 è vero, altrimenti fallisci il piano",
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
  "tooltip": "Controlla una condizione e continua solo se è vera, altrimenti fallisce il piano",
  "helpUrl": ""
}]);

JasonGenerator['check_expression'] = function(block) {
  var code = `${JasonGenerator.valueToCode(block, 'statement', JasonGenerator.NO_PRECEDENCE)};`
  return code
}
