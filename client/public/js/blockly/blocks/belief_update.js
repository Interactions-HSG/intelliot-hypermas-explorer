Blockly.defineBlocksWithJsonArray([{
  "type": "belief_update",
  "message0": "aggiorna tutte le note che fanno match con %1",
  "args0": [{
    "type": "input_value",
    "name": "belief",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Aggiorna tutte le note con la stessa radice con una nuova",
  "helpUrl": ""
}]);

JasonGenerator['belief_update'] = function (block) {
  var belief = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `-+${belief};`
  return code
}
