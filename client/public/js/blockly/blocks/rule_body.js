Blockly.Blocks['rule_body'] = {
  init: function(){
    this.jsonInit({
      "output": "rule_body",
      "colour": 285,
      "tooltip": "il corpo di una regola",
      "helpUrl": ""
    });
    this._statements = 2;
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
    ComposerUtils.addInputFields(this, 'statement', this._statements, ['statement', 'predicate'], 'e')
  }
}

JasonGenerator['rule_body'] = function(block){
  var statements = generationUtils.getItems(block, 'statement', block._statements, ` &${JasonGenerator.BASIC_INDENT}${JasonGenerator.THREE_INDENT}`)
  var code = statements;
  return [code, JasonGenerator.NO_PRECEDENCE]
}
