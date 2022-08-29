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
          "e",
          "&"
        ],
        [
          "oppure",
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
  "tooltip": "Operatori logici tra condizioni, (A e B) è vero se entrambi sono veri, (A oppure B)  è vero se almeno uno dei due è vero",
  "helpUrl": ""
}]);

JasonGenerator['statement_and_or'] = function(block) {
  var statement1 = JasonGenerator.valueToCode(block, 'statement1', JasonGenerator.NO_PRECEDENCE)
  var statment2 = JasonGenerator.valueToCode(block, 'statement2', JasonGenerator.NO_PRECEDENCE)
  var symbol = block.getFieldValue('symbol')
  var code = `${statement1} ${symbol} ${statment2}`
  return [code, JasonGenerator.OPERATION]
}
