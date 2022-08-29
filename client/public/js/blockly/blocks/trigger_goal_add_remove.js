Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_goal_add_remove",
  "message0": "l'agente %1 %2 raggiungere l'obiettivo %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "decide di",
          "+!"
        ],
        [
          "fallisce mentre provava a",
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
  "style": "trigger_block_style",
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['trigger_goal_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
