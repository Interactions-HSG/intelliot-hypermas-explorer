//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
//Should try to do that and maybe the library would also work on node
class BlocklyController {

  workspace = undefined
  toolbox = undefined
  propertyCategory = undefined
  actionCategory = undefined
  eventCategory = undefined
  flyout = undefined
  
  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyContainer = $('#blockly-container')


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
        controls: true, 
        wheel: true
      },
      trashcan: true
    }
    this.workspace = Blockly.inject(this.$blocklyInjection[0], options);
    this.toolbox = this.workspace.getToolbox();
    this.propertyCategory = this.toolbox.getToolboxItemById('Properties');
    this.actionCategory = this.toolbox.getToolboxItemById('Actions');
    this.eventCategory = this.toolbox.getToolboxItemById('Events');
    this.flyout = this.toolbox.getFlyout();
    window.addEventListener('resize',this._resizeHandler(this.workspace), false)
    this.$blocklyContainer.hide()
  }

  loadArtifact(artifact) {
    var propertyBlocks = this._generatePropertyBlocks(artifact.thingDescription.properties, artifact.id)
    var actionBlocks = this._generateActionBlocks(artifact.thingDescription.actions, artifact.id)
    var eventBlocks = this._generateEventBlocks(artifact.thingDescription.events, artifact.id)
    
    this.propertyCategory.updateFlyoutContents(propertyBlocks)
    this.actionCategory.updateFlyoutContents(actionBlocks)
    this.eventCategory.updateFlyoutContents(eventBlocks)
  }
  
  resize(){
    this._resizeHandler(this.workspace)();
  }

  clearWorkspace() {
    this.propertyCategory.updateFlyoutContents([])
    this.actionCategory.updateFlyoutContents([])
    this.eventCategory.updateFlyoutContents([])
  }

  showArea(){
    this.$blocklyContainer.fadeIn();
    this.resize();
  }

  hideMenu(){
    this.toolbox.setSelectedItem(null)
    this.flyout.hide()
  }

  hideArea(){
    this.hideMenu();
    this.$blocklyContainer.fadeOut()
  }

  _resizeHandler(workspace) {
    return function() {
      var blocklyArea = document.getElementById('blockly-container');
      var blocklyDiv = document.getElementById('blockly-injection');
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 20;
      do {
        x += element.offsetLeft;
        //y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
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
      toolboxUtils.definePropertyBlock(p.key, p.value, artifactId)
      blocks.push({kind: "block", type: p.key})
    });
    return blocks;
  }

  _generateActionBlocks(actions, artifactId){
    var blocks = []
    utils.toList(actions).forEach( a => {
      toolboxUtils.defineActionBlock(a.key, a.value, artifactId)
      blocks.push({kind: "block", type: a.key})
    });
    return blocks;
  }
  
  _generateEventBlocks(events, artifactId){
    //TODO implement when supporting events
    return []
  }
  
  
}