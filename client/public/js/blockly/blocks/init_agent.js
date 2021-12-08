Blockly.defineBlocksWithJsonArray([{
  "type": "init_agent",
  "message0": "When %1 starts %2 it %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "name",
      "text": "new_agent"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "config",
      "check": [
        "init_block"
      ]
    }
  ],
  "inputsInline": true,
  "colour": 60,
  "tooltip": "Configure the initial mental state of an agent",
  "helpUrl": ""
}]);

JasonGenerator['init_agent'] = function(block){
  var name = block.getFieldValue('name');
  var start_comment = `//This is the initial state of agent ${name}\n`
  var end_comment = `\n//Plan library:`
  var statements = generationUtils.getStackCode(generationUtils.getRootStatement(block), '\n');
  var code = `${start_comment}${statements ? statements : ""}\n${end_comment}`
  return code;
}
