Blockly.defineBlocksWithJsonArray([{
  "type": "init_goal",
  "message0": "decides to achieve %1 %2",
  "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "goal",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "colour": 60,
  "tooltip": "Add the goal for the agent",
  "helpUrl": ""
}]);

JasonGenerator['init_goal'] = function(block){
  var code = "!"+JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
