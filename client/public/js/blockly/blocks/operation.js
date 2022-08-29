Blockly.defineBlocksWithJsonArray([{
  "type": "operation",
  "message0": "%1 %2 %3 %4",
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
      //do not remove
      "type": "input_dummy"
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
  "tooltip": "Ritorna il risultato dell'operazione matematica",
  "helpUrl": ""
}]);

JasonGenerator['operation'] = function(block) {
  var var1 = JasonGenerator.valueToCode(block, 'var1', JasonGenerator.NO_PRECEDENCE)
  var var2 = JasonGenerator.valueToCode(block, 'var2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${var1} ${symbol} ${var2}`
  return [code, JasonGenerator.OPERATION]
}
