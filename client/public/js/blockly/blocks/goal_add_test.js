Blockly.defineBlocksWithJsonArray([{
  "type": "goal_add_test",
  "message0": "checks if it already know %1",
  "args0": [{
    "type": "input_value",
    "name": "goal",
    "check": "predicate"
  }],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Ask the agent to check some information, if possible within the agent notes otherwise trigger an appropriate plan to retrieve the information.",
  "helpUrl": ""
}]);

JasonGenerator['goal_add_test'] = function(block) {
  var goal = JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)
  var code = `?${goal};`
  return code
}
