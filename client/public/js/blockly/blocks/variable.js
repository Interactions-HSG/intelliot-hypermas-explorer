Blockly.Blocks['variable'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "Variable_Name"
      }],
      "output": "variable",
      "colour": 0,
      "tooltip": "A variable is a named \"box\" where you can store a value.",
      "helpUrl": ""
    });
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

JasonGenerator['variable'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
