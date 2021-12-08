Blockly.Blocks['login_thing'] = {
  init: function() {
    this.jsonInit({
      "message0": "authenticates on %1 with %2",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "thing",
          "text": "thing"
        },
        {
          "type": "input_value",
          "name": "key",
          "check": [
            "variable",
            "atom",
            "username_password"
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": "body_block",
      "nextStatement": "body_block",
      "style": "body_block_style",
      "tooltip": "",
      "helpUrl": ""
    })
    this.keyName = "key"
    this.location = "header"
    this.scheme = "nosec"
  },

  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('keyname', this.keyName)
    container.setAttribute('location', this.location)
    container.setAttribute('scheme', this.scheme)
    return container;
  },

  domToMutation: function(xmlElement) {
    this.keyName = xmlElement.getAttribute('keyname')
    this.location = xmlElement.getAttribute('location')
    this.scheme = xmlElement.getAttribute('scheme')
  }
}

JasonGenerator['login_thing'] = function(block){
  var key = JasonGenerator.valueToCode(block, 'key',JasonGenerator.NO_PRECEDENCE)
  var thing = block.getFieldValue('thing')
  var keyName = block.keyName;
  var location = block.location;
  var scheme = block.scheme;
  var code = `+x_thing_login("${thing}", "${scheme}", "${location}", "${keyName}", ${key})`
  return code;
}
