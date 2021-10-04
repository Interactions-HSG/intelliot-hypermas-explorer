Blockly.defineBlocksWithJsonArray([
  {
    "type": "define_plan",
    "message0": "Define plan %1 %2 when %3 if %4 do %5",
    "args0": [{
        "type": "field_input",
        "name": "label",
        "text": "name"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "trigger",
        "check": "trigger",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "context",
        "check": [
          "statement",
          "predicate",
          "rule_body"
        ],
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "body",
        "check": "body_block"
      }
    ],
    "inputsInline": false,
    "colour": 15,
    "tooltip": "Define an agent plan which is used when the trigger condition verifies and the context is true. Accept a statment or a predicate as context.",
    "helpUrl": ""
  },
  {
    "type": "belief_add_remove_trigger",
    "message0": "agent %1 %2 believing %3",
    "args0": [{
        "type": "field_dropdown",
        "name": "option",
        "options": [
          [
            "starts",
            "+"
          ],
          [
            "stops",
            "-"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "belief",
        "check": "predicate"
      }
    ],
    "inputsInline": true,
    "output": "trigger",
    "colour": 330,
    "tooltip": "When an agent starts or stops believing something new. Accepts a predicate as input",
    "helpUrl": ""
  },
  {
    "type": "goal_add_remove_trigger",
    "message0": "agent %1 %2 to achieve %3",
    "args0": [{
        "type": "field_dropdown",
        "name": "option",
        "options": [
          [
            "wants",
            "+!"
          ],
          [
            "failed",
            "-!"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "goal",
        "check": "predicate"
      }
    ],
    "inputsInline": true,
    "output": "trigger",
    "colour": 330,
    "tooltip": "When an agent starts or stop pursuing a goal. Accepts a predicate as input",
    "helpUrl": ""
  },
  {
    "type": "test_add_remove_trigger",
    "message0": "agent %1 %2 to check %3",
    "args0": [{
        "type": "field_dropdown",
        "name": "option",
        "options": [
          [
            "wants",
            "+?"
          ],
          [
            "failed",
            "-?"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "test",
        "check": "predicate"
      }
    ],
    "inputsInline": true,
    "output": "trigger",
    "colour": 330,
    "tooltip": "When an agent try or fail to check a condition. Accepts a predicate as input",
    "helpUrl": ""
  },
  {
    "type": "add_belief",
    "message0": "start believing %1",
    "args0": [{
      "type": "input_value",
      "name": "belief",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "update_belief",
    "message0": "update belief, now %1",
    "args0": [{
      "type": "input_value",
      "name": "belief",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "remove_belief",
    "message0": "don't believe %1 anymore",
    "args0": [{
      "type": "input_value",
      "name": "belief",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "add_goal",
    "message0": "wait and work until  %1",
    "args0": [{
      "type": "input_value",
      "name": "goal",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "Adds a new goal that the agent will try to pursue immediately only to resume the current plan when the goal is reached.",
    "helpUrl": ""
  },
  {
    "type": "add_parallel_goal",
    "message0": "work until  %1 but don't wait",
    "args0": [{
      "type": "input_value",
      "name": "goal",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "Adds a new goal that the agent will try to pursue but it won't suspend the current execution of the plan.",
    "helpUrl": ""
  },
  {
    "type": "add_test_goal",
    "message0": "check if %1",
    "args0": [{
      "type": "input_value",
      "name": "goal",
      "check": "predicate"
    }],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "Ask the agent to resolve a predicate, if possible within the agent beliefs otherwise trigger a test plan",
    "helpUrl": ""
  },
  {
    "type": "check_expression",
    "message0": "continue if %1 %2 %3 %4",
    "args0": [{
        "type": "input_value",
        "name": "term0",
        "check": [
          "variable",
          "atom",
          "operation"
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
            "≠",
            "!="
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
            "≥",
            ">="
          ],
          [
            "≤",
            "<="
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "term1",
        "check": [
          "variable",
          "atom",
          "operation"
        ]
      }
    ],
    "previousStatement": "body_block",
    "nextStatement": "body_block",
    "colour": 15,
    "tooltip": "Check an expression between variables or atoms and continue the execution of a plan only if it is true ",
    "helpUrl": ""
  }
])