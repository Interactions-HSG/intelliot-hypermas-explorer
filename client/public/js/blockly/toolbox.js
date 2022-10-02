const toolboxDefinition = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Basics",
      "toolboxitemid": "Basics",
      "contents": [{
          "kind": "block",
          "type": "atom"
        },
        {
          "kind": "block",
          "type": "string"
        },
        {
          "kind": "block",
          "type": "number"
        },
        {
          "kind": "block",
          "type": "variable"
        },
        {
          "kind": "block",
          "type": "any_variable"
        },
        {
          "kind": "block",
          "type": "predicate"
        },
        {
          "kind": "block",
          "type": "no_predicate"
        },
        {
          "kind": "block",
          "type": "opposite_predicate"
        },
        {
          "kind": "block",
          //"type": "rule",
          "blockxml": "<block type='rule'>" +
            "<value name='variable0'>" +
            "<block type='variable'></block>" +
            "</value>" +
            "<value name='rule_body'>" +
            "<block type='rule_body'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "type": "rule_body"
        },
        {
          "kind": "block",
          "type": "true"
        },
        {
          "kind": "block",
          "type": "false"
        },
        {
          "kind": "block",
          "type": "operation"
        },
        {
          "kind": "block",
          "type": "not"
        },
        {
          "kind": "block",
          "type": "statement"
        },
        {
          "kind": "block",
          "type": "and_or_statement"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Agent Initialization",
      "toolboxitemid": "Agent_Initialization",
      "contents": [{
          "kind": "block",
          //"type": "init_belief",
          "blockxml": "<block type='init_belief'>" +
            "<value name='belief'>" +
            "<block type='belief'>"+
              "<value name='atom0'>" +
                "<block type='atom'></block>" +
              "</value>" +
            "</block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "init_rule",
          "blockxml": "<block type='init_rule'>" +
            "<value name='rule'>" +
            "<block type='rule'>" +
            "<value name='variable0'>" +
            "<block type='variable'></block>" +
            "</value>" +
            "<value name='rule_body'>" +
            "<block type='rule_body'></block>" +
            "</value>" +
            "</block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "init_goal",
          "blockxml": "<block type='init_goal'>" +
            "<value name='goal'>" +
            "<block type='belief'>"+
              "<value name='atom0'>" +
                "<block type='atom'></block>" +
              "</value>" +
            "</block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "blockxml": "<block type='belief'>" +
            "<value name='atom0'>" +
            "<block type='atom'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "type": "no_init_belief"
        },
        {
          "kind": "block",
          "type": "opposite_init_belief"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Agent Plan Definition",
      "toolboxitemid": "Agent_Plan_Definition",
      "contents": [{
          "kind": "block",
          "type": "define_plan"
        },
        {
          "kind": "block",
          //"type": "belief_add_remove_trigger"
          "blockxml": "<block type='belief_add_remove_trigger'>" +
            "<value name='belief'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "goal_add_remove_trigger"
          "blockxml": "<block type='goal_add_remove_trigger'>" +
            "<value name='goal'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "test_add_remove_trigger"
          "blockxml": "<block type='test_add_remove_trigger'>" +
            "<value name='test'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "type": "predicate"
        },
        {
          "kind": "block",
          "type": "rule_body"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Agent Plan Body",
      "toolboxitemid": "Agent_Plan_Body",
      "contents": [{
          "kind": "block",
          //"type": "add_belief",
          "blockxml": "<block type='add_belief'>" +
            "<value name='belief'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "remove_belief",
          "blockxml": "<block type='remove_belief'>" +
            "<value name='belief'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "update_belief"
          "blockxml": "<block type='update_belief'>" +
            "<value name='belief'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "add_goal",
          "blockxml": "<block type='add_goal'>" +
            "<value name='goal'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "add_parallel_goal",
          "blockxml": "<block type='add_parallel_goal'>" +
            "<value name='goal'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "add_test_goal",
          "blockxml": "<block type='add_test_goal'>" +
            "<value name='goal'>" +
            "<block type='predicate'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "type": "use_affordance",
        },
        {
          "kind": "block",
          "type": "check_expression"
        },
        {
          "kind": "block",
          "type": "assign_variable"
        },
        {
          "kind": "block",
          //"type": "print_action"
          "blockxml": "<block type='print_action'>" +
            "<value name='message'>" +
            "<block type='string'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          //"type": "wait_action"
          "blockxml": "<block type='wait_action'>" +
            "<value name='seconds'>" +
            "<block type='number'></block>" +
            "</value>" +
            "</block>"
        },
        {
          "kind": "block",
          "type": "jason_statement"
        },
      ]
    },
    {
      "kind": "category",
      "name": "JSON",
      "toolboxitemid": "JSON",
      "contents": [{
          "kind": "block",
          "type": "create_object"
        },
        {
          "kind": "block",
          "type": "object_field"
        }
      ]
    },
    {
      "kind": "sep",
      "toolboxitemid": "separator"
    },
    {
      "kind": "toolboxTitle",
      "text": "Things",
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