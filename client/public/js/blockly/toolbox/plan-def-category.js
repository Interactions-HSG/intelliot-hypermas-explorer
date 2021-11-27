const plan_definition_toolbox_category =     
{
  "kind": "category",
  "name": "Agent Plan Definition",
  "toolboxitemid": "Agent_Plan_Definition",
  "contents": [{
      "kind": "block",
      "type": "plan_define"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_belief_add_remove'>" +
        "<value name='belief'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_goal_add_remove'>" +
        "<value name='goal'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_test_add_remove'>" +
        "<value name='test'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='statement'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='statement_and_or'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "type": "context_always"
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
    }
  ]
}