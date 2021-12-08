Blockly.defineBlocksWithJsonArray([{
  "type": "true",
  "message0": "true",
  "output": "atom",
  "colour": 190,
  "tooltip": "The true value, to use in conditions.",
  "helpUrl": ""
},
{
  "type": "false",
  "message0": "false",
  "output": "atom",
  "colour": 190,
  "tooltip": "The false value, to use in conditions.",
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
