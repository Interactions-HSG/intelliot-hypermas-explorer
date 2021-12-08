Blockly.defineBlocksWithJsonArray([{
  "type": "action_print",
  "message0": "says %1",
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
  "colour": 15,
  "tooltip": "Say some text, it can be read from the console to understand what the agent is doing.",
  "helpUrl": ""
}]);

JasonGenerator['action_print'] = function(block){
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.println(${message});`
  return code
}
