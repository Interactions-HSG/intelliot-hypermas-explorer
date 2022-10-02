
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

const login_block_json = {
  //type: thing_login
  "message0": "set login for %1 %2",
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
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
}


Blockly.Blocks['thing_login'] = {
  init: function() {
    this.jsonInit(login_block_json)
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



const loginBlockUtils = {
  defineLoginBlock: function(td, artifactId){
    var blocks = []
    if(td.security.length == 0){
      return [];
    }

    for(s of td.security){
      var secObj = td.securityDefinitions[s]
      switch (secObj.scheme){
        case 'nosec': 
          //do nothing
          break; 
        case 'basic':
          var blockString = `
          <block type="thing_login">
            <mutation keyname="${secObj.name}" location="${secObj.in}" scheme="${secObj.scheme}"></mutation>
            <field name="thing">${artifactId}</field>
            <value name="key">
              <block type="username_password">
                <value name="username">
                  <block type="string">
                    <field name="value">username</field>
                  </block>
                </value>
                <value name="password">
                  <block type="string">
                    <field name="value">password</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
          `
          blocks.push({kind: "block", blockxml:blockString})
          break;
        case 'apikey': 
          var blockString = `
          <block type="thing_login">
            <mutation keyname="${secObj.name}" location="${secObj.in}" scheme="${secObj.scheme}"></mutation>
            <field name="thing">${artifactId}</field>
            <value name="key">
              <block type="string">
                <field name="value">key</field>
              </block>
            </value>
          </block>
          `
          blocks.push({kind: "block", blockxml:blockString})
          break;
        default: 
          console.error("Unsupported security schema "+secObj.scheme)
          break;
      }
    }

    return blocks;
  }
}