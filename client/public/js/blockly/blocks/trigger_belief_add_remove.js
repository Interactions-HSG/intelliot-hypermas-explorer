Blockly.defineBlocksWithJsonArray([{
  "type": "trigger_belief_add_remove",
  "message0": "l'agente %1 %2 una nota %3",
  "args0": [{
      "type": "field_dropdown",
      "name": "option",
      "options": [
        [
          "scrive o aggiorna",
          "+"
        ],
        [
          "rimuove",
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
