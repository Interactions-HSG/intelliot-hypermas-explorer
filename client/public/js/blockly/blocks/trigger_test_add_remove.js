Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_test_add_remove",
  "message0": "agent %1 %2 to check %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "wants",
          "+?"
        ],
        [
          "failed",
          "-?"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "test",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "colour": 15,
  "tooltip": "When an agent try or fail to check a condition. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['trigger_test_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
