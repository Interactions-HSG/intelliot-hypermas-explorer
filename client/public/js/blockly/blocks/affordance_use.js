Blockly.defineBlocksWithJsonArray([{
  "type": "affordance_use",
  "message0": "interagisce con l'oggetto %1",
  "args0": [
    {
      "type": "input_value",
      "name": "affordance",
      "check": "affordance"
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Invoca una affordance",
  "helpUrl": ""
}]);

JasonGenerator['affordance_use'] = function(block){
  var affordance = JasonGenerator.valueToCode(block, 'affordance', JasonGenerator.NO_PRECEDENCE)
  var code = `${affordance};`
  return code
}
