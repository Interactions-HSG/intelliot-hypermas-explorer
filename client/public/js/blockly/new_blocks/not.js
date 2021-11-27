Blockly.defineBlocksWithJsonArray([{
  "type": "not",
  "message0": "not %1",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "variable",
        "atom",
        "statement"
      ]
    }],
  "output": "statement",
  "colour": 230,
  "tooltip": "Returns the logic opposite of the input value",
}]);

JasonGenerator['not'] = function(block){
  var code = "(not "+ JasonGenerator.valueToCode(block, 'value', JasonGenerator.OPERATION)+")"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
