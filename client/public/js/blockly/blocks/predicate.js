Blockly.Blocks['predicate'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "predicate",
      "colour": 285,
      "tooltip": "Define a predicate that can accept both variables to be grounded or atoms",
      "helpUrl": ""
    });
    this._terms = 1;
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
        block.setWarningText("Not a valid name");
        return value;
      }
      block.setWarningText();
      return value;
    })
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
    if(this._terms == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._terms > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'term', this._terms, ['atom', 'variable', 'operation', 'predicate'])
    var endMessage = (this._terms ? ')' : '') //+ ' is true'
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(endMessage), 'END');
  }
}

JasonGenerator['predicate'] = function(block) {
  var functor = block.getFieldValue('functor');
  var termString = generationUtils.getItems(block, 'term', block._terms)
  var code = functor
  if(termString) {
    code = `${functor}(${termString})`
  }
  return [code, JasonGenerator.NO_PRECEDENCE]
}
