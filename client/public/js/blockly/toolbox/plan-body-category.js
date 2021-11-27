const plan_body_toolbox_category =      {
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
      "type": "check_expression"
    },
    {
      "kind": "block",
      "type": "assign_variable"
    },
    {
      "kind": "block",
      //"type": "action_print"
      "blockxml": "<block type='action_print'>" +
        "<value name='message'>" +
        "<block type='string'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      //"type": "action_wait"
      "blockxml": "<block type='action_wait'>" +
        "<value name='seconds'>" +
        "<block type='number'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "type": "jason_action"
    },
  ]
}