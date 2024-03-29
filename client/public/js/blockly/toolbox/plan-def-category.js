const plan_definition_toolbox_category =     
{
  "kind": "category",
  "name": "Plan definition",
  "toolboxitemid": "Agent_Plan_Definition",
  "contents": [{
      "kind": "block",
      "blockxml": "<block type='plan_define'>" +
        "<value name='trigger'>" +
        "<block type='trigger_goal_add_remove'>"+
        "<value name='goal'>" +
          "<block type='predicate'>"+
          "<field name='functor'>goal_name</field>"+
          "</block>" +
          "</value>"+
        "</block>" +
        "</value>" +
        "<value name='context'>" +
        "<block type='context_always'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_belief_add_remove'>" +
        "<field name='option'>+</field>"+
        "<value name='belief'>" +
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_belief_add_remove'>" +
        "<field name='option'>-</field>"+
        "<value name='belief'>" +
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_goal_add_remove'>" +
        "<field name='option'>+!</field>"+
        "<value name='goal'>" +
        "<block type='predicate'>"+
        "<field name='functor'>goal_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_goal_add_remove'>" +
        "<field name='option'>-!</field>"+
        "<value name='goal'>" +
        "<block type='predicate'>"+
        "<field name='functor'>goal_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_test_add_remove'>" +
        "<field name='option'>+?</field>"+
        "<value name='test'>" +
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='trigger_test_add_remove'>" +
        "<field name='option'>-?</field>"+
        "<value name='test'>" +
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='context_if'>" +
        "<value name='context'>" +
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
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