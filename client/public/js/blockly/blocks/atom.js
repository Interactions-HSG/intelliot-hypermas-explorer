Blockly.Blocks['atom'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "valore"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "Un valore atomico, è un nome che inizia sempre con una lettera minuscola e non ha spazi",
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
      } else {
        block.setWarningText("Must not be empty")
      }
      var regex = new RegExp("^[a-zA-Z0-9_]*$", 'g')
      if(!regex.test(value)){
        block.setWarningText("Sono ammessi solamente valori che iniziano con una lettera minuscola e non hanno spazi nè caratteri speciali (tranne _ )");
        return value;
      }
      block.setWarningText();
      return value;
    })
  }
}

JasonGenerator['atom'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
