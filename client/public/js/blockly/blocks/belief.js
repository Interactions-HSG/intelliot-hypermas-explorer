Blockly.Blocks['belief'] = {
  init: function(){
    this.jsonInit({
      "inputsInline": true,
      "output": "belief",
      "style": "belief_block_style",
      "tooltip": "Define a fact which is true in the agent mind",
      "helpUrl": "",
    });
    this._atoms = 1;
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
      'atoms': this._atoms
    };
  },

  loadExtraState: function(state) {
    this._atoms = state['atoms'];
    this._updateShape();
  },

  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('atoms', this._atoms);
    return container;
  },

  domToMutation: function(xmlElement) {
    this._atoms = parseInt(xmlElement.getAttribute('atoms'), 10);
    this._updateShape();
  },

  decompose: function(workspace) {
    return ComposerUtils.initUIBlocks(workspace, this._atoms)
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var connections = ComposerUtils.getConnections(itemBlock);
    ComposerUtils.disconnectChildren(this, connections, 'atom', this._atoms);
    this._atoms = connections.length
    this._updateShape();
    ComposerUtils.connectChildren(this, connections, 'atom', this._atoms)
  },
  
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('inputs');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('atom' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  _updateShape: function(){
    if(this._atoms == 0 && this.getInput('start')) {
      this.removeInput('start')
    } else if(this._atoms > 0 && !this.getInput('start')){
      this.appendDummyInput('start')
        .appendField('(')
    }
    if(this.getInput('end')){
      this.removeInput('end')
    }
    ComposerUtils.addInputFields(this, 'atom', this._atoms, ['atom', 'belief'])
    var endMessage = (this._atoms ? ')' : '') //+' is true'
    this.appendDummyInput('end')
      .appendField(new Blockly.FieldLabelSerializable(endMessage), 'END');
  }
}

JasonGenerator['belief'] = function (block){
  var functor = block.getFieldValue('functor');
  var atomString = generationUtils.getItems(block, 'atom', block._atoms)
  var code = functor
  if(atomString) {
    code = `${functor}(${atomString})`
  }
  return [code, JasonGenerator.NO_PRECEDENCE]
}
