Blockly.Blocks['atom'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "value"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "An atom is any value that starts with a lowercase letter and no spaces",
      "helpUrl": ""
    });
    var block = this;
    this.getField('value').setValidator(function(newValue){
      var value = newValue.trim();
      if(value){
        value = value.replaceAll("\"", "")
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

JasonGenerator['atom'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
