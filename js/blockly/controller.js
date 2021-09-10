class BlocklyController {

  workspace = {}

  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyContainer = $('#blockly-container')
  initialize() {
    var options = {
      toolbox: toolbox, 
      grid: { 
        spacing: 20,
        length: 1,
        colour: '#ccc',
        snap: true
      },
      trashcan: true
    }
    this.workspace = Blockly.inject(this.$blocklyInjection[0], options);
    window.addEventListener('resize',this.onResize, false)
    this.onResize();
  }

  onResize(e) {
    // Compute the absolute coordinates and dimensions.
    var element = this.$blocklyContainer[0];
    var div = this.$blocklyInjection[0];
    var oW = element.offsetWidth;
    var oH = element.offsetHeight;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);

    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.style.width = oW + 'px';
    div.style.height = oH + 'px';
    Blockly.svgResize(this.workspace);
  };
}