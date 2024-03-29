Blockly.Blocks['string'] = {
  init: function(){
    this.jsonInit({
      "message0": "\"%1\"",
      "args0": [{
        "type": "field_input",
        "name": "value",
        "text": "text"
      }],
      "output": "atom",
      "colour": 190,
      "tooltip": "Some text, it can contain spaces.",
      "helpUrl": ""
    });
    this.getField('value').setValidator(function(newValue){
      //TODO implement validation for strings
      return newValue;
    });
  }
}

JasonGenerator['string'] = function(block){
  var code =`"${block.getFieldValue('value')}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
