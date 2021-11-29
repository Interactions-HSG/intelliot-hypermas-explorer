const loginBlockUtils = {
  defineLoginBlock: function(td, artifactId){
    var blocks = []
    var security = []
    if(typeof td.security === 'string') {
      security = [td.security];
    }
    if(security.length == 0){
      return [];
    }

    for(s of security){
      var secObj = td.securityDefinitions[s]
      switch (secObj.scheme){
        case 'nosec': 
          //do nothing
          break; 
        case 'basic':
          var blockString = `
          <block type="login_thing">
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
          <block type="login_thing">
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
