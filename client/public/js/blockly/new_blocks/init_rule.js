Blockly.defineBlocksWithJsonArray([{
  "type": "init_rule",
  "message0": "knows that %1 %2",
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
  "colour": 60,
  "tooltip": "Add knowledge of a rule to the agent mind",
  "helpUrl": ""
}]);

JasonGenerator['init_rule'] = function(block){
  var code = JasonGenerator.valueToCode(block, 'rule', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
