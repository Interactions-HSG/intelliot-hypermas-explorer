Blockly.defineBlocksWithJsonArray([{
  "type": "true_false",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "value",
      "options": [
        [
          "true",
          "true"
        ],
        [
          "false",
          "false"
        ]
      ]
    }
  ],
  "output": "atom",
  "colour": 190,
  "tooltip": "The true value, to use in conditions.",
  "helpUrl": ""
}]);

JasonGenerator['true_false'] = function(block){
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE] 
}
