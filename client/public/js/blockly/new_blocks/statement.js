Blockly.defineBlocksWithJsonArray([{
  "type": "statement",
  "message0": "%1 %2 %3",
  "args0": [{
      "type": "input_value",
      "name": "statement1",
      "check": [
        "atom",
        "variable",
        "operation",
        "statement"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "==",
          "=="
        ],
        [
          "≠",
          "\\=="
        ],
        [
          ">",
          ">"
        ],
        [
          "<",
          "<"
        ],
        [
          "≥",
          ">="
        ],
        [
          "≤",
          "<="
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "statement2",
      "check": [
        "atom",
        "variable",
        "operation",
        "statement"
      ]
    }
  ],
  "output": "statement",
  "colour": 230,
  "tooltip": "Provides conditions over variables and atoms",
  "helpUrl": ""
}]);

JasonGenerator['statement'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}
