Blockly.defineBlocksWithJsonArray(
  [{
      "type": "atom",
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "atom"
      }],
      "output": "atom",
      "colour": 230,
      "tooltip": "An atom is any string that starts with a lowercase letter or a number",
      "helpUrl": ""
    },
    {
      "type": "variable",
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "Variable"
      }],
      "output": "variable",
      "colour": 0,
      "tooltip": "A variable is a string that starts with an uppercase letter",
      "helpUrl": ""
    },
    {
      "type": "init_agent",
      "message0": "When agent %1 %2 %3 is born %4 it %5",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "field_input",
          "name": "agentName",
          "text": "agentName"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "config",
          "check": [
            "init_belief",
            "init_goal",
            "init_rule"
          ]
        }
      ],
      "inputsInline": true,
      "colour": 30,
      "tooltip": "Configure the initial state of an agent",
      "helpUrl": ""
    },
    {
      "type": "no_init_belief",
      "message0": "it doesn't know if %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "belief",
          "check": "belief"
        }
      ],
      "inputsInline": true,
      "output": "belief",
      "colour": 120,
      "tooltip": "Weakly negates the belief",
      "helpUrl": ""
    },
    {
      "type": "opposite_init_belief",
      "message0": "is false that %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "belief",
          "check": "belief"
        }
      ],
      "inputsInline": true,
      "output": "belief",
      "colour": 120,
      "tooltip": "Strongly negate the belief",
      "helpUrl": ""
    },
    {
      "type": "init_belief",
      "message0": "believes %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "belief",
          "check": "belief"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 30,
      "tooltip": "Add a belief to the agent mind",
      "helpUrl": ""
    },
    {
      "type": "init_goal",
      "message0": "decides its goal is to work until %1 %2",
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
      "previousStatement": null,
      "nextStatement": null,
      "colour": 30,
      "tooltip": "Add the goal for the agent",
      "helpUrl": ""
    },
    {
      "type": "init_rule",
      "message0": "knows that %1 %2",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "rule",
          "check": "rule"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 30,
      "tooltip": "Add knowledge of a rule to the agent mind",
      "helpUrl": ""
    },
    {
      "type": "rule",
      "message0": "%1 ( %2 %3 ) is true when %4 %5",
      "args0": [
        {
          "type": "field_input",
          "name": "functor",
          "text": "name"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "variable",
          "check": "variable"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "statement",
          "check": [
            "statement",
            "predicate"
          ]
        }
      ],
      "output": "rule",
      "colour": 270,
      "tooltip": "Define a rule that holds when the statement holds",
      "helpUrl": ""
    },
    {
      "type": "predicate",
      "message0": "%1 ( %2 %3 ) is true",
      "args0": [{
          "type": "field_input",
          "name": "functor",
          "text": "name"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "term",
          "check": [
            "atom",
            "variable"
          ]
        }
      ],
      "inputsInline": true,
      "output": "predicate",
      "colour": 285,
      "tooltip": "Define a predicate that can accept both variables to be grounded or atoms",
      "helpUrl": ""
    },
    {
      "type": "no_predicate",
      "message0": "agent doesn't know if %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "belief",
          "check": "predicate"
        }
      ],
      "inputsInline": true,
      "output": "predicate",
      "colour": 285,
      "tooltip": "Weakly negates the predicate",
      "helpUrl": ""
    },
    {
      "type": "opposite_predicate",
      "message0": "is false that %1 %2",
      "args0": [{
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "belief",
          "check": "predicate"
        }
      ],
      "inputsInline": true,
      "output": "predicate",
      "colour": 285,
      "tooltip": "Strongly negate the predicate",
      "helpUrl": ""
    },
    {
      "type": "statement",
      "message0": "%1 %2 %3 %4",
      "args0": [{
          "type": "input_value",
          "name": "statement1",
          "check": [
            "atom",
            "variable"
          ]
        },
        {
          "type": "field_dropdown",
          "name": "symbol",
          "options": [
            [
              "==",
              "=="
            ],
            [
              ">",
              ">"
            ],
            [
              "<",
              "<"
            ],
            [
              ">=",
              ">="
            ],
            [
              "<=",
              "<="
            ]
          ]
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "statement2",
          "check": [
            "atom",
            "variable"
          ]
        }
      ],
      "output": "statement",
      "colour": 270,
      "tooltip": "Provides conditions over variables and atoms",
      "helpUrl": ""
    },
    {
      "type": "and_or_statement",
      "message0": "%1 %2 %3 %4",
      "args0": [{
          "type": "input_value",
          "name": "statement1",
          "check": [
            "statement",
            "predicate"
          ]
        },
        {
          "type": "field_dropdown",
          "name": "symbol",
          "options": [
            [
              "and",
              "and"
            ],
            [
              "or",
              "or"
            ]
          ]
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "statement2",
          "check": [
            "statement",
            "predicate"
          ]
        }
      ],
      "output": "statement",
      "colour": 270,
      "tooltip": "Provides and/or conditions to compose statements or predicates",
      "helpUrl": ""
    }
  ]
)

const belief_block_json = {
  "inputsInline": true,
  "output": "belief",
  "colour": 120,
  "tooltip": "Define a fact which is true in the agent mind",
  "helpUrl": "",
}

Blockly.Blocks['belief'] = {
  init: function(){
    this.jsonInit(belief_block_json);
    this._atoms = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
      .appendField('(')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'atoms': this._atoms
    };
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['atoms'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('atoms', this._atoms);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._atoms = parseInt(xmlElement.getAttribute('atoms'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._atoms)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'atom', this._atoms);
    this._atoms = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'atom', this._atoms)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('atom' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    // Add new inputs.
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'atom', this._atoms)
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(') is true'), 'END');
  }
}