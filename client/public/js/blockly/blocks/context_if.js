Blockly.defineBlocksWithJsonArray([{
  "type": "context_if",
  "message0": "solo se %1",
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
  "style": "context_block_style",
  "tooltip": "Esprime la condizione per cui un piano è valido",
  "helpUrl": ""
}]);

//TODO generator for this block
JasonGenerator['context_if'] = function (block){
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var code = context; 
  return [code, JasonGenerator.NO_PRECEDENCE]
}
