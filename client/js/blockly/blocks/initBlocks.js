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
