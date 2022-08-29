Blockly.Blocks['number'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "0"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "Un numero",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      //TODO check validation for numbers
      var regex = new RegExp("^-?[0-9]+(\.[0-9])?[0-9]*$", 'g')
      if(!regex.test(newValue)){
        block.setWarningText("Not a valid number");
        return newValue;
      }
      block.setWarningText();
      return newValue;
    });
  }
}

JasonGenerator['number'] = function(block){
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
