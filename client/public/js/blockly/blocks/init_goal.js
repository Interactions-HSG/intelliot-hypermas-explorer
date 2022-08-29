Blockly.defineBlocksWithJsonArray([{
  "type": "init_goal",
  "message0": "decide di raggiungere l'obiettivo %1",
  "args0": [
    {
      "type": "input_value",
      "name": "goal",
      "check": "belief"
    }
  ],
  "inputsInline": true,
  "previousStatement": "init_block",
  "nextStatement": "init_block",
  "style": "init_block_style",
  "tooltip": "Aggiunge un obiettivo che l'agente prova a raggiungere appena parte",
  "helpUrl": ""
}]);

JasonGenerator['init_goal'] = function(block){
  var code = "!"+JasonGenerator.valueToCode(block, 'goal', JasonGenerator.NO_PRECEDENCE)+"."
  return code
}
