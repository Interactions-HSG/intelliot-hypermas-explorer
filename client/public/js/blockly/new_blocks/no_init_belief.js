Blockly.defineBlocksWithJsonArray([{
  "type": "no_init_belief",
  "message0": "it doesn't know if %1 %2",
  "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "belief",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "output": "belief",
  "colour": 120,
  "tooltip": "Weakly negates the belief",
  "helpUrl": ""
}]);

JasonGenerator['no_init_belief'] = function(block){
  var predicate = JasonGenerator.valueToCode(block, 'belief', JasonGenerator.NO_PRECEDENCE)
  var code = `not ${predicate}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
