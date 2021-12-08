Blockly.defineBlocksWithJsonArray([{
  "type": "send_agent_message",
  "message0": "Sends message to %1 : %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "receiver",
      "text": "agent_name"
    },
    {
      "type": "field_dropdown",
      "name": "illocutionary_force",
      "options": [
        [
          "make note",
          "tell"
        ],
        [
          "achieve",
          "achieve"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "message",
      "check": ["predicate"]
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "style": "body_block_style",
  "tooltip": "Send another agent a message, this can mean ordering the agent to achieve something or share a note with it.",
  "helpUrl": ""
}]);

JasonGenerator["send_agent_message"] = function(block) {
  var receiver = block.getFieldValue('receiver')
  var illocutionaryForce = block.getFieldValue('illocutionary_force')
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.send(${receiver}, ${illocutionaryForce}, ${message});`;
  return code
}
