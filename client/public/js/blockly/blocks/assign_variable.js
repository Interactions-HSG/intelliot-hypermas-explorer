Blockly.defineBlocksWithJsonArray([{
  "type": "assign_variable",
  "message0": "stores in %1 the value of %2",
  "args0": [
    {
      "type": "input_value",
      "name": "variable",
      "check": "variable"
    },
    {
      "type": "input_value",
      "name": "operation",
      "check": ["operation", "atom", "variable", "statement", "object"]
    }
  ],
  "inputsInline": true,
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Assign the result of an operation to a variable",
  "helpUrl": ""
}]);

JasonGenerator['assign_variable'] = function(block){
  var variable = JasonGenerator.valueToCode(block, 'variable', JasonGenerator.NO_PRECEDENCE)
  var operation = JasonGenerator.valueToCode(block, 'operation', JasonGenerator.NO_PRECEDENCE)
  var code = `${variable} = ${operation};`
  return code
}
