Blockly.defineBlocksWithJsonArray([{
  "type": "object_field",
  "message0": "%1 di tipo %3 %2",
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
          "testo",
          "string"
        ],
        [
          "vero/falso",
          "boolean"
        ],
        [
          "numero decimale",
          "number"
        ],
        [
          "numero intero",
          "integer"
        ],
        [
          "oggetto",
          "object"
        ],
        [
          "lista",
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
  "tooltip": "Un campo di un oggetto json",
  "helpUrl": ""
}]);

//This block will never have a code validation on it's own since it can be used only with the object_create block
