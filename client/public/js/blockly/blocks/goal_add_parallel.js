Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_parallel",
  "message0": "wants to try to achieve also %1 simultaneously",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Adds a new goal that the agent will try to pursue but it won't suspend the current execution of the plan.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_parallel'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `!!${goal};`
  return code
}
