Blockly.defineBlocksWithJsonArray([{
  "type": "true",
  "message0": "true",
  "output": "atom",
  "colour": 190,
  "tooltip": "Make something be always true.",
  "helpUrl": ""
},
{
  "type": "false",
  "message0": "false",
  "output": "atom",
  "colour": 190,
  "tooltip": "Make something be always false.",
  "helpUrl": ""
}]);

JasonGenerator['true'] = function(_){
  var code = "true"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}

JasonGenerator['false'] = function(_){
  var code = "false"
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
