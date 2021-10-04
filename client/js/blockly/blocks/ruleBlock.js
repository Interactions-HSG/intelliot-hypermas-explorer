const rule_block_json = {
  "inputsInline": true,
  "output": "rule",
  "colour": 270,
  "tooltip": "Define a rule that holds when the statement holds",
  "helpUrl": ""
}

Blockly.Blocks['rule'] = {
  init: function(){
    this.jsonInit(rule_block_json);
    this._variables = 1;
    this.appendValueInput('rule_body')
      .appendField('when')
      .setCheck('rule_body')
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
      .appendField('(')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
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
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'variable', this._variables, 'variable')
    this.appendDummyInput('end')
      .appendField(') is true');
    this.moveInputBefore('rule_body', null)
  }
}

const rule_body_block_json = {
  "output": "rule_body",
  "colour": 270,
  "tooltip": "Define the body of a rule, accept statements as input",
  "helpUrl": ""
}

Blockly.Blocks['rule_body'] = {
  init: function(){
    this.jsonInit(rule_body_block_json);
    this._statements = 1;
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },

  saveExtraState: function() {
    return {
      'statements': this._statements
    };
  },

  loadExtraState: function(state) {
    this._statements = state['statements'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('statements', this._statements);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._statements = parseInt(xmlElement.getAttribute('statements'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._statements)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'statement', this._statements);
    this._statements = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'statement', this._statements)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('statement' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    ComposerUtils.addInputFields(this, 'statement', this._statements, ['statement', 'predicate'], 'and')
  }
}