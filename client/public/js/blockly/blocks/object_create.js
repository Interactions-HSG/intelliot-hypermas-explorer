Blockly.defineBlocksWithJsonArray([{
  "type": "object_create",
  "message0": "object %1 %2",
  "args0": [
    {
      //do not remove
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
}]);

//TODO This block currently cannot generate code if used outside of an affordance block
