Blockly.defineBlocksWithJsonArray([{
  "type": "plan_define",
  "message0": "When %1 then %2 it %3 then it's done!",
  "args0": [
    {
      "type": "input_value",
      "name": "trigger",
      "check": "trigger",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "context",
      "check": "context",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "body",
      "check": "body_block"
    }
  ],
  "inputsInline": false,
  "style": "body_block_style",
  "tooltip": "Define a plan that the agent can use when the triggering condition happens, and the context is valid.",
  "helpUrl": ""
}]);

JasonGenerator['plan_define'] = function(block) {
  var trigger = JasonGenerator.valueToCode(block, 'trigger', JasonGenerator.NO_PRECEDENCE)
  var context = JasonGenerator.valueToCode(block, 'context', JasonGenerator.NO_PRECEDENCE)
  var body = generationUtils.getStackCode(generationUtils.getRootStatement(block), JasonGenerator.BASIC_INDENT+JasonGenerator.THREE_INDENT);
  body = body ? body : "true"
  if(body.slice(-1) == ';'){
    body=body.slice(0,-1);
  }
  if(body.slice(-1) == '\n'){
    body=body.slice(0,-2);
  }
  var code = `${trigger+JasonGenerator.BASIC_INDENT}:  ${context+JasonGenerator.BASIC_INDENT}<- ${body}.`
  return code;
}
