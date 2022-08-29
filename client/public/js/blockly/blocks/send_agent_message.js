Blockly.defineBlocksWithJsonArray([{
  "type": "send_agent_message",
  "message0": "Manda un messaggio ad %1 : %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "receiver",
      "text": "nome_agente"
    },
    {
      "type": "field_dropdown",
      "name": "illocutionary_force",
      "options": [
        [
          "scrivi una nota",
          "tell"
        ],
        [
          "raggiungi l'obiettivo",
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
  "tooltip": "Manda un messaggio ad un altro agente",
  "helpUrl": ""
}]);

JasonGenerator["send_agent_message"] = function(block) {
  var receiver = block.getFieldValue('receiver')
  var illocutionaryForce = block.getFieldValue('illocutionary_force')
  var message = JasonGenerator.valueToCode(block, 'message', JasonGenerator.NO_PRECEDENCE)
  var code = `.send(${receiver}, ${illocutionaryForce}, ${message});`;
  return code
}
