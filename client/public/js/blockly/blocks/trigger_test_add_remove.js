Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_test_add_remove",
  "message0": "l'agente %1 %2 %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "non sa già",
          "+?"
        ],
        [
          "non è riuscito a trovare",
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
  "style": "trigger_block_style",
  "tooltip": "",
  "helpUrl": ""
}]);

JasonGenerator['trigger_test_add_remove'] = function(block) {
  var symbol = block.getFieldValue('option')
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = symbol+goal
  return [code, JasonGenerator.NO_PRECEDENCE]
}
