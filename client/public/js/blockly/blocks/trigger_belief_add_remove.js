Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_belief_add_remove",
  "message0": "agent %1 %2 note %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "adds",
          "+"
        ],
        [
          "removes",
          "-"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "belief",
      "check": "predicate"
    }
  ],
  "inputsInline": true,
  "output": "trigger",
  "style": "trigger_block_style",
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['trigger_belief_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+belief
  return [code, JasonGenerator.NO_PRECEDENCE]
}
