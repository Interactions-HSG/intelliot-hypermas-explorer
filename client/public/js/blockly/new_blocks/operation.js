Blockly.defineBlocksWithJsonArray([{
  "type": "operation",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "var1",
      "check": [
        "variable",
        "atom",
        "operation"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "+",
          "+"
        ],
        [
          "-",
          "-"
        ],
        [
          "×",
          "*"
        ],
        [
          "÷",
          "/"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "var2",
      "check": [
        "variable",
        "atom",
        "operation"
      ]
    }
  ],
  "output": "operation",
  "colour": 200,
  "tooltip": "Returns the output of the operation",
  "helpUrl": ""
}]);

JasonGenerator['operation'] = function(block) {
  var var1 = JasonGenerator.valueToCode(block, 'var1', JasonGenerator.NO_PRECEDENCE)
  var var2 = JasonGenerator.valueToCode(block, 'var2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${var1} ${symbol} ${var2}`
  return [code, JasonGenerator.OPERATION]
}
