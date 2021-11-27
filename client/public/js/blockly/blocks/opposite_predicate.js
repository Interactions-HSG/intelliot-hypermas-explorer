Blockly.defineBlocksWithJsonArray([{
  "type": "opposite_predicate",
  "message0": "is false that %1",
  "args0": [
    {
      "type": "input_value",
      "name": "predicate",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "predicate",
  "colour": 285,
  "tooltip": "Strongly negate the predicate",
  "helpUrl": ""
}]);

JasonGenerator['opposite_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
