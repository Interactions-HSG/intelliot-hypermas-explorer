Blockly.Blocks['rule'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "rule",
      "colour": 285,
      "tooltip": "Define a rule that holds when the statement holds",
      "helpUrl": ""
    });
    this._variables = 1;
    this.appendValueInput('rule_body')
      .appendField('when')
      .setCheck('rule_body')
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
    var block = this;
    this.getField('functor').setValidator(function(newValue){
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
        block.setWarningText("Name must be lowercase, no spaces and no special characters allowed (except from _ )");
        return value;
      }
      block.setWarningText();
      return value;
    })
  },
  
  saveExtraState: function() {
    return {
      'variables': this._variables
    };
  },

  loadExtraState: function(state) {
    this._variables = state['variables'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('variables', this._variables);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._variables = parseInt(xmlElement.getAttribute('variables'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._variables)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'variable', this._variables);
    this._variables = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'variable', this._variables)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('variable' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this._variables == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._variables > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'variable', this._variables, 'variable')
    var endMessage = (this._variables ? ')' : '') + ' is true'
    this.appendDummyInput('end')
      .appendField(endMessage);
    this.moveInputBefore('rule_body', null)
  }
}

JasonGenerator['rule'] = function(block){
  var functor = block.getFieldValue('functor');
  var variables = generationUtils.getItems(block, 'variable', block._variables)
  var rule_body = JasonGenerator.valueToCode(block, 'rule_body', JasonGenerator.NO_PRECEDENCE)
  var code = `${functor}(${variables})${JasonGenerator.BASIC_INDENT}:- ${rule_body}`
  return [code, JasonGenerator.NO_PRECEDENCE]
}
