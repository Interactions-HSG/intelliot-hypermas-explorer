Blockly.defineBlocksWithJsonArray([{
  "type": "context_if",
  "message0": "only if %1",
  "args0": [
    {
      "type": "input_value",
      "name": "context",
      "check": [
        "statement",
        "predicate"
      ]
    }
  ],
  "inputsInline": true,
  "output": "context",
  "colour": 15,
  "tooltip": "Express the context of when a plan is applicable.",
  "helpUrl": ""
}]);

//TODO generator for this block
JasonGenerator['context_if'] = function (block){
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var code = context; 
  return [code, JasonGenerator.NO_PRECEDENCE]
}
