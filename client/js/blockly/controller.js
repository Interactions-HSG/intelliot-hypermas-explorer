//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
//Should try to do that and maybe the library would also work on node
class BlocklyController {

  workspace = undefined
  toolbox = undefined
  affordanceCategory = []

  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyContainer = $('#blockly-container')
  initialize() {
    var options = {
      toolbox: toolboxDefinition,
      grid: { 
        spacing: 20,
        length: 1,
        colour: '#ccc',
        snap: true
      },
      trashcan: true
    }
    this.workspace = Blockly.inject(this.$blocklyInjection[0], options);
    this.toolbox = JSON.parse(JSON.stringify(toolboxDefinition)); //very ugly deep copy
    this.affordanceCategory = this.toolbox.contents.find(x => x.kind == "category" && x.name == "Affordances").contents

    window.addEventListener('resize',this.onResize, false)
    this.$blocklyContainer.hide()
  }

  onResize() {
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
    Blockly.svgResize(this.workspace);
  }


  loadArtifact(artifact) {
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
      this.affordanceCategory.push({kind: "block", type: affordance.title})
    });
    this.workspace.updateToolbox(this.toolbox)
  }
  
  clearArea() {
    this.affordanceCategory.splice(0,this.affordanceCategory.length);
  }

  showArea(){
    this.$blocklyContainer.fadeIn();
    this.onResize();
  }

  hideArea(){
    this.clearArea()
    this.$blocklyContainer.fadeOut()
  }
  
}