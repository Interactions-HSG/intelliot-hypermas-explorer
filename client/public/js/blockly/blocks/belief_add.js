Blockly.defineBlocksWithJsonArray([{
  "type": "belief_add",
  "message0": "adds a new note: %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Add a new note.",
  "helpUrl": ""
}]);

JasonGenerator['belief_add'] = function(block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `+${belief};`
  return code
}
