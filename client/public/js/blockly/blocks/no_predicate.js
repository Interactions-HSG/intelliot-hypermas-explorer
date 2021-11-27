Blockly.defineBlocksWithJsonArray([{
    "type": "no_predicate",
    "message0": "it doesn't know if %1",
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
    "tooltip": "Weakly negates the predicate",
    "helpUrl": ""
}]);

JasonGenerator['no_predicate'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'predicate', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
