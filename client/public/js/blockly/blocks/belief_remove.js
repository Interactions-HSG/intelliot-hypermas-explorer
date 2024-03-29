Blockly.defineBlocksWithJsonArray([{
  "type": "belief_remove",
  "message0": "removes note: %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Remove a matching note.",
  "helpUrl": ""
}]);

JasonGenerator['belief_remove'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-${belief};`
  return code
}
