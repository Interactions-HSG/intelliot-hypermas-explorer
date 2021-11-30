Blockly.defineBlocksWithJsonArray([{
  "type": "statement_and_or",
  "message0": "%1 %2 %3 %4",
  "args0": [{
      "type": "input_value",
      "name": "statement1",
      "check": [
        "statement",
        "predicate"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "symbol",
      "options": [
        [
          "and",
          "&"
        ],
        [
          "or",
          "|"
        ]
      ]
    },
    {
      "type": "input_dummy"
      //do not remove
    },
    {
      "type": "input_value",
      "name": "statement2",
      "check": [
        "statement",
        "predicate"
      ]
    }
  ],
  "output": "statement",
  "colour": 230,
  "tooltip": "Provides and/or conditions to compose statements or predicates",
  "helpUrl": ""
}]);

JasonGenerator['statement_and_or'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}
