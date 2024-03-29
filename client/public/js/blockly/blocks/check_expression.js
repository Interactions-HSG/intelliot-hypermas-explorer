Blockly.defineBlocksWithJsonArray([{
  "type": "check_expression",
  "message0": "continues if %1 otherwise fails",
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
  "tooltip": "Check a statement and continue the execution of a plan only if it is true ",
  "helpUrl": ""
}]);

JasonGenerator['check_expression'] = function(block) {
  var code = `${JasonGenerator.valueToCode(block, 'statement', JasonGenerator.NO_PRECEDENCE)};`
  return code
}
