const plan_definition_toolbox_category =     
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
      //"type": "context_if"
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='predicate'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      //"type": "context_if"
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='statement'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      //"type": "context_if"
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='and_or_statement'></block>" +
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