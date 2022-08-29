Blockly.defineBlocksWithJsonArray([{
  "type": "any_variable",
  "message0": "qualunque",
  "output": "variable",
  "colour": 0,
  "tooltip": "Una variabile che fa match con qualunque valore"
}]);

JasonGenerator['any_variable'] = function(block) {
  var code = "_"
  return [code, JasonGenerator.NO_PRECEDENCE]
}
