Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_belief_add_remove",
  "message0": "agent %1 %2 remembering %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "starts",
          "+"
        ],
        [
          "stops",
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
  "colour": 15,
  "tooltip": "When an agent starts or stops remembering something new. Accepts a predicate as input",
  "helpUrl": ""
}]);

JasonGenerator['trigger_belief_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+belief
  return [code, JasonGenerator.NO_PRECEDENCE]
}
