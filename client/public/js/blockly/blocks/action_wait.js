Blockly.defineBlocksWithJsonArray([{
  "type": "action_wait",
  "message0": "waits %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "seconds",
      "check": ["atom", "variable"]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Wait for a number of seconds.",
  "helpUrl": ""
}]);

JasonGenerator['action_wait'] = function(block){
  var seconds = JasonGenerator.valueToCode(block, 'seconds', JasonGenerator.NO_PRECEDENCE)
  var milliseconds = seconds+"*1000";
  var code = `.wait(${milliseconds});`
  return code
}
