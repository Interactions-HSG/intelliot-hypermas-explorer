Blockly.defineBlocksWithJsonArray([
  {
    "type": "username_password",
    "message0": "username %1 password %2",
    "args0": [
      {
        "type": "input_value",
        "name": "username",
        "check": ["atom", "variable"]
      },
      {
        "type": "input_value",
        "name": "password",
        "check": ["atom", "variable"]
      }
    ],
    "output": "username_password",
    "colour": 195,
    "tooltip": "",
    "helpUrl": ""
  }
]);

JasonGenerator['username_password'] = function(block){
  var username = JasonGenerator.valueToCode(block, 'username', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var password = JasonGenerator.valueToCode(block, 'password', JasonGenerator.NO_PRECEDENCE).replace(/['"]+/g, '')
  var credentialString = username+":"+password
  var code = `"${btoa(credentialString)}"`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
