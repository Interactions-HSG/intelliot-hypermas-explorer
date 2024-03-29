Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add",
  "message0": "decides to achieve %1 first then continue",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Adds a new goal that the agent will try to pursue immediately only to resume the current plan when the goal is reached.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!${goal};`
  return code
}
