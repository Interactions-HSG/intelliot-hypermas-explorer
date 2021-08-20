// Blockly Manager
// Interactions Research Group, University of St.Gallen
// This module handles all blockly-related functionality

var blocklyWorkspace = null;

var blocklyManager = {

  $blocklyToolboxAffordances: $('#blockly-toolbox affordances'),

  // This tracks the current affordances accessible via Blockly
  currentAffordances: [],

  init: function () {
    log.debug('Initializing Blockly');

    blocklyManager.resetAffordancesCategory();

    Blockly.Themes.Dark = Blockly.Theme.defineTheme('intelliot', {
      'base': Blockly.Themes.Classic,
      'componentStyles': {
        'workspaceBackgroundColour': '#fff',
        'toolboxBackgroundColour': '#fff',
        'toolboxForegroundColour': '#000',
        'flyoutBackgroundColour': '#252526',
        'flyoutForegroundColour': '#ccc',
        'flyoutOpacity': 1,
        'scrollbarColour': '#797979',
        'insertionMarkerColour': '#fff',
        'insertionMarkerOpacity': 0.3,
        'scrollbarOpacity': 0.4,
        'cursorColour': '#d0d0d0',
        'blackBackground': '#333'
      }
    });

    blocklyWorkspace = Blockly.inject('blockly-container', { toolbox: blocklyToolbox, theme: 'intelliot' });
    blocklyWorkspace.addChangeListener(blocklyManager.blocklyChanged);

    blocklyManager.addTestAffordance();
  },

  addTestAffordance: function () {
    // Test affordance
    Blockly.Blocks['followtestaffordance'] = {
      init: function() {
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.appendDummyInput().appendField("Follow Test Affordance");
        this.setTooltip("Follow this affordance!");
        this.setHelpUrl("");
      }
    };

    affordanceBlock = {
      "kind": "block",
      "type": "followtestaffordance"
    }

    blocklyToolbox.contents.find(function (loc) { return loc.name === 'Affordances' }).contents.push(affordanceBlock)

    Blockly.JavaScript['followtestaffordance'] = function(block) {
      var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
      return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
    };

    blocklyWorkspace.updateToolbox(blocklyToolbox)

    // blocklyWorkspace = Blockly.inject('blockly-container', { toolbox: blocklyToolbox });
    // blocklyWorkspace.addChangeListener(blocklyManager.blocklyChanged);

  },

  resetAffordancesCategory: function () {
    log.debug('Removing all affordance blocks');

    // Remove all affordances from Toolbox
    blocklyToolbox.contents.find(function (loc) { return loc.name === 'Affordances' }).contents = []

    // Remove each affordance from Blockly
    while (blocklyManager.currentAffordances.length > 0) {
      currentAffordance = blocklyManager.currentAffordances.pop()
      // Blockly.deleteBlock(blocklyManager.currentAffordances[i]);
    }

    log.debugSeparate("Blocks known to Blockly", Blockly.Blocks)
  },

  generateAndAddAffordanceBlock: function (affordanceInformation) {
    log.debugSeparate('Creating Block for Affordance', affordanceInformation);

    var affordanceName = affordanceInformation['affordanceTitle'];

    // Create Blockly block for each affordance
    Blockly.Blocks[affordanceName] = {
      init: function() {
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.appendDummyInput().appendField(affordanceName);
        this.setTooltip("Follow this affordance!");
        this.setHelpUrl("");
      }
    };

    // Add to Toolbox
    affordanceBlock = {
      "kind": "block",
      "type": affordanceName
    }

    blocklyToolbox.contents.find(function (location) { return location.name === 'Affordances' }).contents.push(affordanceBlock)
    blocklyWorkspace.updateToolbox(blocklyToolbox)

    // Bookkeeping
    blocklyManager.currentAffordances.push(affordanceName)


    /* TODO
    // PAir with generator function
    Blockly.JavaScript['text_length'] = function(block) {
    // String or array length.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
  };
  */
},

blocklyChanged: function (event) {
  log.debug('Updating!')

  var code = Blockly.JavaScript.workspaceToCode(blocklyWorkspace);
  log.debugSeparate('Code', code);
},

}


var blocklyToolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Control",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "controls_whileUntil"
        },
        {
          "kind": "block",
          "type": "controls_for"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Logic",
      "contents": [
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Literals",
      "contents": [
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "block",
          "type": "text"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Affordances"
    }
  ]
}
