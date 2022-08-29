Blockly.defineBlocksWithJsonArray([{
  "type": "init_rule",
  "message0": "sa che %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "rule",
      "check": "rule"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "style": "init_block_style",
  "tooltip": "Aggiunge una regola per dedurre informazioni",
  "helpUrl": ""
}]);

JasonGenerator['init_rule'] = function(block){
  var code = JasonGenerator.valueToCode(block, 'rule', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
