Blockly.defineBlocksWithJsonArray([{
  "type": "opposite_init_belief",
  "message0": "it's false that %1 %2",
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
  "output": "belief",
  "colour": 120,
  "tooltip": "Strongly negate the belief",
  "helpUrl": ""
}]);

JasonGenerator['opposite_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
