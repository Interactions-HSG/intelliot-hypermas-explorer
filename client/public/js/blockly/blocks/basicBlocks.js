Blockly.defineBlocksWithJsonArray([
  {
    "type": "any_variable",
    "message0": "any",
    "output": "variable",
    "colour": 0,
    "tooltip": "A special variable that match with everything and does not store the result"
  },
  {
    "type": "operation",
    "message0": "%1 %2 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "var1",
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
            "+",
            "+"
          ],
          [
            "-",
            "-"
          ],
          [
            "×",
            "*"
          ],
          [
            "÷",
            "/"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "var2",
        "check": [
          "variable",
          "atom",
          "operation"
        ]
      }
    ],
    "output": "operation",
    "colour": 230,
    "tooltip": "Returns the output of the operation",
    "helpUrl": ""
  },
  {
    "type": "not",
    "message0": "not %1",
    "args0": [
      {
        "type": "input_value",
        "name": "value",
        "check": [
          "variable",
          "atom",
          "statement"
        ]
      }],
    "output": "statement",
    "colour": 230,
    "tooltip": "Returns the logic opposite of the input value",
  },
  {
    "type": "no_predicate",
    "message0": "agent doesn't know if %1 %2",
    "args0": [{
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "predicate",
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
        "name": "predicate",
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
          "variable",
          "operation",
          "statement"
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
            "\\=="
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
        "name": "statement2",
        "check": [
          "atom",
          "variable",
          "operation",
          "statement"
        ]
      }
    ],
    "output": "statement",
    "colour": 230,
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
            "&"
          ],
          [
            "or",
            "|"
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
    "colour": 230,
    "tooltip": "Provides and/or conditions to compose statements or predicates",
    "helpUrl": ""
  },
  {
    "type": "true",
    "message0": "true",
    "output": "statement",
    "colour": 230,
    "tooltip": "Make something be always true.",
    "helpUrl": ""
  },
  {
    "type": "false",
    "message0": "false",
    "output": "statement",
    "colour": 230,
    "tooltip": "Make something be always false.",
    "helpUrl": ""
  },
]);


const atom_block_json = {
  "message0": "%1",
  "args0": [{
    "type": "field_input",
    "name": "value",
    "text": "value"
  }],
  "output": "atom",
  "colour": 190,
  "tooltip": "An atom is any string that starts with a lowercase letter and no spaces",
  "helpUrl": ""
}

Blockly.Blocks['atom'] = {
  init: function(){
    this.jsonInit(atom_block_json);
    var block = this;
    this.getField('value').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll(" ", "_")
        value = utils.uncapitalize(value)
        block.setWarningText();
        return value;
      } else {
        block.setWarningText("An atom must not be empty")
        return value;
      }
    })
  }
}

const string_block_json = {
  "message0": "\"%1\"",
  "args0": [{
    "type": "field_input",
    "name": "value",
    "text": "text"
  }],
  "output": "atom",
  "colour": 200,
  "tooltip": "A string",
  "helpUrl": ""
}
Blockly.Blocks['string'] = {
  init: function(){
    this.jsonInit(string_block_json);
    var block = this;
    this.getField('value').setValidator(function(newValue){
      //TODO implement validation for strings
      return newValue;
    });
  }
}


const number_block_json = {
  "message0": "%1",
  "args0": [{
    "type": "field_input",
    "name": "value",
    "text": "0"
  }],
  "output": "atom",
  "colour": 200,
  "tooltip": "A number",
  "helpUrl": ""
}
Blockly.Blocks['number'] = {
  init: function(){
    this.jsonInit(number_block_json);
    var block = this;
    this.getField('value').setValidator(function(newValue){
      //TODO check validation for numbers
      var regex = new RegExp("^[0-9]+(\.[0-9])?[0-9]*$", 'g')
      if(!regex.test(newValue)){
        block.setWarningText("Not a valid number");
        return newValue;
      }
      block.setWarningText();
      return newValue;
    });
  }
}

const variable_block_json = {
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
}

Blockly.Blocks['variable'] = {
  init: function(){
    this.jsonInit(variable_block_json);
    var block = this;
    this.getField('value').setValidator(function(newValue){
      var regex = new RegExp("[A-Z][a-zA-Z0-9]*")
      var value = newValue.trim();
      if(value){
        value = value.replaceAll(" ", "_")
        value = utils.capitalize(value)
        if(!regex.test(value)){
          block.setWarningText("A variable must not start with a number")
          return value;
        }
        block.setWarningText();
        return value;
      } else {
        block.setWarningText("A variable name must not be empty")
        return value;
      }
    })
  }
}