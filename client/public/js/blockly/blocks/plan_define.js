Blockly.defineBlocksWithJsonArray([{
  "type": "plan_define",
  "message0": "Ecco un piano per quando %1 Questo piano è valido %2 L'agente %3 e poi ha finito!",
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
  "tooltip": "Definisce un piano che viene azionato con l'evento corrispondente quando il contesto è vero.",
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
