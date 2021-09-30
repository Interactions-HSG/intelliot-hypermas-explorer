Blockly.defineBlocksWithJsonArray(
  [{
      "type": "mutator_block_root",
      "message0": "block %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "inputs",
          "check": "mutator_block_input"
        }
      ],
      "colour": 210,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "mutator_block_input",
      "message0": "input",
      "previousStatement": null,
      "nextStatement": "mutator_block_input",
      "colour": 210,
      "tooltip": "",
      "helpUrl": ""
    },
  ]
)