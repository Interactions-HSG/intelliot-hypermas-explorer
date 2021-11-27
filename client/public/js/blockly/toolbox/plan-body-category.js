const plan_body_toolbox_category =      {
  "kind": "category",
  "name": "Agent Plan Body",
  "toolboxitemid": "Agent_Plan_Body",
  "contents": [{
      "kind": "block",
      "blockxml": "<block type='belief_add'>" +
        "<value name='belief'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='belief_remove'>" +
        "<value name='belief'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='belief_update'>" +
        "<value name='belief'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='goal_add'>" +
        "<value name='goal'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='goal_add_parallel'>" +
        "<value name='goal'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='goal_add_test'>" +
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
      "blockxml": "<block type='action_print'>" +
        "<value name='message'>" +
        "<block type='string'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='action_wait'>" +
        "<value name='seconds'>" +
        "<block type='number'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "type": "action_jason_custom"
    },
  ]
}