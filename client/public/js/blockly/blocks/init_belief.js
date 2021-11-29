Blockly.defineBlocksWithJsonArray([{
  "type": "init_belief",
  "message0": "add note: %1 %2",
  "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "colour": 60,
  "tooltip": "Add a belief to the agent mind",
  "helpUrl": ""
}]);


JasonGenerator['init_belief'] = function (block) {
  var code = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE) + "."
  return code
}
