Blockly.defineBlocksWithJsonArray([
  {
    "type": "create_object",
    "message0": "object %1 %2",
    "args0": [
      {
        "type": "input_dummy"
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
  "message0": "%1 as %3 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "key",
      "text": "key"
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
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "string",
          "string"
        ],
        [
          "boolean",
          "boolean"
        ],
        [
          "number",
          "number"
        ],
        [
          "integer",
          "integer"
        ],
        [
          "object",
          "object"
        ],
        [
          "array",
          "array"
        ],
        [
          "_",
          "_"
        ]
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
]);