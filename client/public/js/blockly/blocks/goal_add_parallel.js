Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_parallel",
  "message0": "decide di completare anche l'obiettivo %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Aggiunge un nuovo goal che l'agente può perseguire in parallelo a quello corrente.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_parallel'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}
