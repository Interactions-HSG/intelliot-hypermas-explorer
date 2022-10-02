//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
class BlocklyController {

  _workspace = undefined
  _toolbox = undefined
  _flyout = undefined

  _tabsController = undefined;
  //_buttonsController = undefined;
  _yggdrasilController = undefined;

  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyRelative = $('#blockly-relative')
  $blocklyContainer = $('#blockly-container')

  initialize() {
    this.$blocklyContainer.hide()

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
    this._flyout = this._toolbox.getFlyout();

    this._tabsController = new FileTabsController(this._workspace)
	console.log("tabsController defined")
	console.log(this._workspace)
	console.log(this._tabsController)
    //this._buttonsController = new WorkspaceButtonsController(this._workspace, this._tabsController);
	this._yggdrasilController = new YggdrasilController(this._workspace, this._tabsController);

    window.addEventListener('resize', this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0]), false)
  }

  loadArtifact(artifact) {
    var td = artifact.thingDescription;
    /*if(td.base){
      //preparse the thing description completing forms hrefs
      for(const p in td.properties){
        td.properties[p].forms.forEach(f => f.href = td.base + f.href)
      }
      for(const a in td.actions){
        td.actions[a].forms.forEach(f => f.href = td.base + f.href)
      }
      for(const e in td.events){
        //TODO support events(?)
      }
    }*/
	console.log("td.base is not used\n")
	for(const a in td.actions){
        td.actions[a].forms.forEach(f => console.log(f.href))
      }
    var loginBlock = this._generateLoginBlock(td, artifact.id)
    var propertyBlocks = this._generatePropertyBlocks(td.properties, artifact.id)
    var actionBlocks = this._generateActionBlocks(td.actions, artifact.id)
    var eventBlocks = this._generateEventBlocks(td.events, artifact.id)

    var blocks = loginBlock.concat(propertyBlocks, actionBlocks, eventBlocks);
    var thingCategory = {
      kind: "category",
      name: artifact.id,
      contents: blocks
    }
    toolboxDefinition.contents.push(thingCategory)
    this._workspace.updateToolbox(toolboxDefinition);
    
  }

  isEmpty() {
    return this._workspace.getAllBlocks().length == 0;
  }

  clearIDE() {
    this._tabsController.clearAll();
  }

  _clearWorkspace() {
    this._tabsController.clearWorkspace();
  }

  showArea(agentName) {
    this._tabsController.addTab(agentName);
    this.$blocklyContainer.fadeIn(500);
    this.resize();
    this._workspace.scrollbar.workspace_.scroll(10, 15)
  }

  hideMenu() {
    this._toolbox.setSelectedItem(null)
    this._flyout.hide()
  }

  hideArea() {
    this.hideMenu();
    this.$blocklyContainer.fadeOut()
  }

  resize() {
    this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0])();
  }

  _resizeHandler(workspace, blocklyArea, blocklyDiv) {
    return function () {
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

  _generateLoginBlock(td, artifactId){
    var blocks = loginBlockUtils.defineLoginBlock(td, artifactId)
    return blocks;
  }
  
  _generatePropertyBlocks(properties, artifactId) {
	  console.log(properties)
	  if (properties == null || properties == undefined){
		  properties = []
	  }
	  console.log("properties\n")
	  console.log(properties)
    var blocks = []
    utils.toList(properties).forEach(p => {
      var block = affordanceBlockUtils.definePropertyBlock(p.key, p.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }

  _generateActionBlocks(actions, artifactId) {
    var blocks = []
    utils.toList(actions).forEach(a => {
      var block = affordanceBlockUtils.defineActionBlock(a.key, a.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }

  _generateEventBlocks(events, artifactId) {
    //TODO implement when supporting events
    return []
  }

}