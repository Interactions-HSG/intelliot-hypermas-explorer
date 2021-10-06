//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
class BlocklyController {

  _workspace = undefined
  _toolbox = undefined
  _propertyCategory = undefined
  _actionCategory = undefined
  _eventCategory = undefined
  _flyout = undefined
  
  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyRelative = $('#blockly-relative')
  $blocklyContainer = $('#blockly-container')
  $tabs = $('#tabs')


  initialize() {
    var options = {
      toolbox: toolboxDefinition,
      theme: 'intelliot',
      grid: { 
        spacing: 20,
        length: 1,
        colour: '#ccc',
        snap: true
      },
      zoom: {
        startScale: 0.8,
        controls: true, 
        wheel: true
      },
      trashcan: true
    }
    this._workspace = Blockly.inject(this.$blocklyInjection[0], options);
    this._toolbox = this._workspace.getToolbox();
    this._propertyCategory = this._toolbox.getToolboxItemById('Properties');
    this._actionCategory = this._toolbox.getToolboxItemById('Actions');
    this._eventCategory = this._toolbox.getToolboxItemById('Events');
    this._flyout = this._toolbox.getFlyout();
    window.addEventListener('resize', this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0]), false)
    
    this.$blocklyContainer.hide()
    
    
    //TODO uncomment this
    //$('#export_code').click(e =>console.log(JASONGenerator.generateJASON(this._workspace)))
    $('#export-code').click(e =>console.log(JASONGenerator.workspaceToCode(this._workspace)))
    $('#debug').click(e =>console.log(Blockly.Xml.workspaceToDom(this._workspace, true)))
  }

  loadArtifact(artifact) {
    var propertyBlocks = this._generatePropertyBlocks(artifact.thingDescription.properties, artifact.id)
    var actionBlocks = this._generateActionBlocks(artifact.thingDescription.actions, artifact.id)
    var eventBlocks = this._generateEventBlocks(artifact.thingDescription.events, artifact.id)
    
    this._propertyCategory.updateFlyoutContents(propertyBlocks)
    this._actionCategory.updateFlyoutContents(actionBlocks)
    this._eventCategory.updateFlyoutContents(eventBlocks)
  }

  isEmpty() {
    return this._workspace.getAllBlocks().length == 0;
  }

  clearWorkspace() {
    this._propertyCategory.updateFlyoutContents([])
    this._actionCategory.updateFlyoutContents([])
    this._eventCategory.updateFlyoutContents([])
    this._workspace.clear()
    this._workspace.clearUndo()
    this._workspace.trashcan.emptyContents();
  }

  showArea(){
    this.$blocklyContainer.fadeIn();
    var definition = this._workspace.newBlock("init_agent")
    definition.initSvg()
    this.$tabs.find('span.nav-link.active').each(function(index){
      $(this).dblclick(function(){
        var val=this.innerHTML;
        var input=document.createElement("input");
        input.value=val;
        input.onblur=function(){
          var val=this.value;
          definition.setFieldValue(val, "name")
          this.parentNode.innerHTML=val;
        }
        this.innerHTML="";
        this.appendChild(input);
        input.focus();
      })
    })
    this.resize();
    this._workspace.scrollbar.workspace_.scroll(10,15)
    this._workspace.render();
  }

  hideMenu(){
    this._toolbox.setSelectedItem(null)
    this._flyout.hide()
  }

  hideArea(){
    this.hideMenu();
    this.$blocklyContainer.fadeOut()
  }

  resize(){
    this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0])();
  }

  _resizeHandler(workspace, blocklyArea, blocklyDiv) {
    return function() {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var x = 0;
      var y = 0;
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(workspace);
    }
  }

  _generatePropertyBlocks(properties, artifactId){
    var blocks = []
    utils.toList(properties).forEach( p => {
      var block = affordanceBlockUtils.definePropertyBlock(p.key, p.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }

  _generateActionBlocks(actions, artifactId){
    var blocks = []
    utils.toList(actions).forEach( a => {
      var block = affordanceBlockUtils.defineActionBlock(a.key, a.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }
  
  _generateEventBlocks(events, artifactId){
    //TODO implement when supporting events
    return []
  }
  
  
}