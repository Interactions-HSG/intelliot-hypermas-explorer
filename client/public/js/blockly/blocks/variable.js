Blockly.Blocks['variable'] = {
  init: function(){
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "Variabile"
      }],
      "output": "variable",
      "colour": 0,
      "tooltip": "Una variabile è un contenitore di valori con un nome che inizia per maiuscola",
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
          block.setWarningText("Una variabile inizia sempre con una lettera maiuscola")
          return value;
        }
        block.setWarningText();
        return value;
      } else {
        block.setWarningText("Non può essere vuoto")
        return value;
      }
    })
  }
}

JasonGenerator['variable'] = function(block) {
  var code = block.getFieldValue('value')
  return [code, JasonGenerator.NO_PRECEDENCE]
}
