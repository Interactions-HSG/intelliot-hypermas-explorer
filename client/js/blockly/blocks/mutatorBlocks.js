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

const ComposerUtils = {
  addInputFields: function (block, fieldLabel, currentItems) {
    for (var i = 0; i < currentItems; i++) {
      if (!block.getInput(fieldLabel + i)) {
        var input = block.appendValueInput(fieldLabel + i)
          .setCheck('atom')
        if(i != 0) {
          input.appendField(',')
        }
      }
    }
    // Remove deleted inputs.
    while (block.getInput(fieldLabel + i)) {
      block.removeInput(fieldLabel + i);
      i++;
    }
  },

  initUIBlocks: function (workspace, currentItems) {
    var containerBlock = workspace.newBlock('mutator_block_root');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('inputs').connection;
    for (var i = 0; i < currentItems; i++) {
      var itemBlock = workspace.newBlock('mutator_block_input');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  getConnections: function (rootBlock) {
    var itemBlock = rootBlock
    var connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    return connections
  },

  disconnectChildren: function (block, connections, inputName, itemNumber) {
    for (var i = 0; i < itemNumber; i++) {
      var connection = block.getInput(inputName + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
  },

  connectChildren: function (block, connections, inputName, itemNumber) {
    for (var i = 0; i < itemNumber; i++) {
      Blockly.Mutator.reconnect(connections[i], block, inputName + i);
    }
  },

  forbidZeroItems(firstItemBlock) {
    var itemBlock = firstItemBlock;
    var movable = false;
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      itemBlock.setMovable(movable);
      movable = true;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  }
}