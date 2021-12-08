Blockly.defineBlocksWithJsonArray([{
  "type": "opposite_init_belief",
  "message0": "it's false that %1",
  "args0": [
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "output": "belief",
  "style": "belief_block_style",
  "tooltip": "Strongly negate the belief",
  "helpUrl": ""
}]);

JasonGenerator['opposite_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `~${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
