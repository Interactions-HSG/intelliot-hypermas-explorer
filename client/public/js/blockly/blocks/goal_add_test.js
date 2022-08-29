Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_test",
  "message0": "controlla se sa che %1 è vero",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "L'agente controlla se ha una informazione, prima tra le sue note altrimenti prova ad eseguire un piano per trovare l'informazione",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_test'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `?${goal};`
  return code
}
