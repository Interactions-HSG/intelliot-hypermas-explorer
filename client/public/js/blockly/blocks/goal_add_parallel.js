Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_parallel",
  "message0": "decides to also achieve %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Adds a new goal that the agent will try to pursue in parallel with the current execution of the plan.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_parallel'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}
