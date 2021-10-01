const predicate_block_json = {
  "inputsInline": true,
  "output": "predicate",
  "colour": 285,
  "tooltip": "Define a predicate that can accept both variables to be grounded or atoms",
  "helpUrl": ""
}

Blockly.Blocks['predicate'] = {
  init: function(){
    this.jsonInit(predicate_block_json);
    this._terms = 1;
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('name'),'functor')
      .appendField('(')
    this._updateShape();
    this.setMutator(new Blockly.Mutator(['mutator_block_input']));
  },
  
  saveExtraState: function() {
    return {
      'terms': this._terms
    };
  },

  loadExtraState: function(state) {
    this._terms = state['terms'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('terms', this._terms);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._terms = parseInt(xmlElement.getAttribute('terms'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._terms)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    ComposerUtils.forbidZeroItems(itemBlock);
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'term', this._terms);
    this._terms = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'term', this._terms)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('term' + i);
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
    ComposerUtils.addInputFields(this, 'term', this._terms, ['atom', 'variable'])
    this.appendDummyInput('end')
      .appendField(') is true');
  }
}