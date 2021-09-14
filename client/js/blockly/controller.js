//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
//Should try to do that and maybe the library would also work on node
class BlocklyController {

  workspace = undefined
  toolbox = undefined
  affordanceCategory = undefined
  flyout = undefined
  
  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyContainer = $('#blockly-container')


  initialize() {
    var options = {
      toolbox: toolboxDefinition,
      //theme: 'intelliot',
      grid: { 
        spacing: 20,
        length: 1,
        colour: '#ccc',
        snap: true
      },
      trashcan: true
    }
    this.workspace = Blockly.inject(this.$blocklyInjection[0], options);
    this.toolbox = this.workspace.getToolbox();
    this.affordanceCategory = this.toolbox.getToolboxItemById('Affordances');
    this.flyout = this.toolbox.getFlyout();
    window.addEventListener('resize',this.getResizeHandler(this.workspace), false)
    this.$blocklyContainer.hide()
  }

  getResizeHandler(workspace) {
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

  resize(){
    this.getResizeHandler(this.workspace)();
  }


  loadArtifact(artifact) {
    var affordancesBlocks = []
    artifact.affordances.forEach(affordance => {
      //define blocks
      Blockly.Blocks[affordance.title] = {
        init: function() {
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(300);
          this.appendDummyInput().appendField(affordance.title);
          this.setTooltip(`Use the affordance ${affordance.title}`);
        }
      };
      //generate block and add to category
      affordancesBlocks.push({kind: "block", type: affordance.title})
    });
    this.affordanceCategory.updateFlyoutContents(affordancesBlocks);
  }
  
  clearWorkspace() {
    this.workspace.clear();
    this.workspace.clearUndo();
    this.affordanceCategory.updateFlyoutContents({})
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
  
}