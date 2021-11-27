Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_remove_trigger",
  "message0": "agent %1 %2 to achieve %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "wants",
          "+!"
        ],
        [
          "failed",
          "-!"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "goal",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "colour": 15,
  "tooltip": "When an agent starts or stop pursuing a goal. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_remove_trigger'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
