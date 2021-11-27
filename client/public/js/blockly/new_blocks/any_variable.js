Blockly.defineBlocksWithJsonArray([{
  "type": "any_variable",
  "message0": "any",
  "output": "variable",
  "colour": 0,
  "tooltip": "A special variable that match with everything and does not store the result"
}]);

JasonGenerator['any_variable'] = function(block) {
  var code = "_"
  return [code, JasonGenerator.NO_PRECEDENCE]
}
