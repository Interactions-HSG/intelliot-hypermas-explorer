Blockly.defineBlocksWithJsonArray([
  {
    "type": "print_action",
    "message0": "say %1",
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
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "wait_action",
    "message0": "wait %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "seconds",
        "check": "atom"
      }
    ],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "",
    "helpUrl": ""
  }
]);