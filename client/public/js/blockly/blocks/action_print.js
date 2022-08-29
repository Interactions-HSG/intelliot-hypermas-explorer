Blockly.defineBlocksWithJsonArray([{
  "type": "action_print",
  "message0": "dice %1",
  "args0": [
    {
      "type": "input_value",
      "name": "message",
      "check": [
        "variable",
        "atom"
      ]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "L'agente dice un messaggio in modo da comunicare al programmatore cosa sta facendo",
  "helpUrl": ""
}]);

JasonGenerator['action_print'] = function(block){
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.println(${message});`
  return code
}
