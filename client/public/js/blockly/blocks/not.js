Blockly.defineBlocksWithJsonArray([{
  "type": "not",
  "message0": "%1 è falso",
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
  "tooltip": "Returns the logic opposite of the input value. If true then false and if false then true.",
}]);

JasonGenerator['not'] = function(block){
  var code = "(not "+ JasonGenerator.valueToCode(block, 'value', JasonGenerator.OPERATION)+")"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
