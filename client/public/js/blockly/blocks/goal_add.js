Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add",
  "message0": "decide di raggiungere l'obiettivo %1 prima di continuare",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Aggiunge un nuovo obiettivo che l'agente prova a completare prima di proseguire con il resto del piano",
  "helpUrl": ""
}]);

JasonGenerator['goal_add'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!${goal};`
  return code
}
