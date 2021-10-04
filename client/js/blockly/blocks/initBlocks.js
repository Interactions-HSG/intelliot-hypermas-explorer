Blockly.defineBlocksWithJsonArray(
  [
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
            "init_block"
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
      "message0": "it's false that %1 %2",
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
      "previousStatement": "init_block",
      "nextStatement": "init_block",
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
      "previousStatement": "init_block",
      "nextStatement": "init_block",
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
      "previousStatement": "init_block",
      "nextStatement": "init_block",
      "colour": 30,
      "tooltip": "Add knowledge of a rule to the agent mind",
      "helpUrl": ""
    },
  ]
)
