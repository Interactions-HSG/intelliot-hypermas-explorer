Blockly.defineBlocksWithJsonArray([
  {
    "type": "create_object",
    "message0": "object %1 %2 %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "variable",
        "check": "variable"
      },
      {
        "type": "input_statement",
        "name": "fields",
        "check": "object_field"
      }
    ],
    "inputsInline": true,
    "output": "object",
    "colour": 165,
    "tooltip": "",
    "helpUrl": ""
  },
{
  "type": "object_field",
  "message0": "%1 → %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "key",
      "text": "key"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "atom",
        "variable",
        "operation",
        "object",
        "statement"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": "object_field",
  "nextStatement": "object_field",
  "colour": 165,
  "tooltip": "Define a field of a json object",
  "helpUrl": ""
},
{
  "type": "add_fields",
  "message0": "Add fields to %1 %2 result %3",
  "args0": [
    {
      "type": "input_value",
      "name": "object",
      "check": "variable",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "object_field"
    },
    {
      "type": "input_value",
      "name": "result",
      "check": "variable",
      "align": "RIGHT"
    }
  ],
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 165,
  "tooltip": "Take a json object as root and add the fields, then store it in the result variable.",
  "helpUrl": ""
},
{
  "type": "get_object_value",
  "message0": "From object %1 get value of %2 in %3",
  "args0": [
    {
      "type": "input_value",
      "name": "object",
      "check": "variable"
    },
    {
      "type": "field_input",
      "name": "key",
      "text": "key"
    },
    {
      "type": "input_value",
      "name": "result",
      "check": "variable"
    }
  ],
  "inputsInline": true,
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 165,
  "tooltip": "Try get the value of a key from an object and store it in a result variable ",
  "helpUrl": ""
}]);