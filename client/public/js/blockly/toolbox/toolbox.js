const toolboxDefinition = {
  "kind": "categoryToolbox",
  "contents": [
    basic_toolbox_category,
    operations_toolbox_category,
    initialization_toolbox_category,
    plan_definition_toolbox_category,
    plan_body_toolbox_category,
    communication_toolbox_category,
    {
      "kind": "sep",
      "toolboxitemid": "separator"
    },
    {
      "kind": "toolboxTitle",
      "text": "Oggetti",
      "toolboxitemid": "Things"
    },
  ]
}

class ToolboxTitle extends Blockly.ToolboxItem {

  title = undefined

  constructor(toolboxItemDef, parentToolbox) {
    super(toolboxItemDef, parentToolbox);
  }

  init() {
    // Create the title.
    $('#'+this.toolboxItemDef_['toolboxitemid']).remove() //ugly fix for not making it appear twice (?)
    this.title = document.createElement('div');
    // Set the name.
    var $title = $(this.title)
    $title.attr('id',  this.toolboxItemDef_['toolboxitemid'])
    $title.text(this.toolboxItemDef_['text']).addClass('toolbox-title')
  }

  getDiv() {
    return this.title;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  'toolboxTitle',
  ToolboxTitle);