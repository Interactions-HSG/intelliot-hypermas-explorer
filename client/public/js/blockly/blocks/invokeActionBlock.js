const invoke_action_block = {
  "inputsInline":true,
  "previousStatement": "body_block",
  "nextStatement": "body_block",
  "colour": 15,
  "tooltip": "Invoke the affordance",
}

Blockly.Blocks['invoke_action'] = {
  init: function(){
    this.jsonInit(invoke_action_block);
    this._arguments = 1;
    this.appendDummyInput()
      .appendField('invoke ')
      .appendField(new Blockly.FieldTextInput('name'),'actionName')
      .appendField('(')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'arguments': this._arguments
    };
  },

  loadExtraState: function(state) {
    this._arguments = state['arguments'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('arguments', this._arguments);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._arguments = parseInt(xmlElement.getAttribute('arguments'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._arguments)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    //ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'argument', this._arguments);
    this._arguments = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'argument', this._arguments)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('argument' + i);
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
    ComposerUtils.addInputFields(this, 'argument', this._arguments, ['atom', 'variable', 'predicate'])
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(')'), 'END');
  }
}